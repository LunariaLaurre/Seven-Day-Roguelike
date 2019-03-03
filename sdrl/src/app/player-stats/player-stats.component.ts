import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerModel } from '../models/player-model';
import { StatisticsModel } from '../models/statistics-model';
import { EquipmentModel } from '../models/equipment-model';
import { RarityTypeEnum } from '../enums/rarity-type-enum';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { DamageRangeModel } from '../models/damage-range-model';
import {sortBy, find} from 'lodash'
import { CombatLogService } from '../combat-log.service';
import { CombatActionModel } from '../models/combat-action-model';
import { CombatActionTypeEnum } from '../enums/combat-action-type-enum';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  constructor(
    private combatLogService: CombatLogService,
    private scoreService: ScoreService
  ) { }

  @Output() damageEnemy = new EventEmitter();
  @Output() playerDies = new EventEmitter();

  public player: PlayerModel;
  public demoGear: EquipmentModel;

  ngOnInit() {
  }

  public equipToPlayer(equip: EquipmentModel): void
  {
    let existingSlot =  this.player.equipment.find(e => e.type == equip.type)

    if(existingSlot)
    {
     this.player.equipment = this.player.equipment.filter(e => e.type !== equip.type);
    }

    this.player.equipment.push(equip);
    this.regenerateMaxHealth();
    this.player.equipment = sortBy(this.player.equipment, e => e.type)
    this.combatLogService.addCombatLine(this.player, {type: CombatActionTypeEnum.Equip} as CombatActionModel, null, equip)

  }

  public healPlayer(): void
  {
    if(this.player)
    {
      this.player.health += this.player.maxHealth/5;
      this.player.mana += this.player.maxMana/5;

      if(this.player.health > this.player.maxHealth)
      {
        this.player.health = this.player.maxHealth;
      }
      if(this.player.mana > this.player.maxMana)
      {
        this.player.mana = this.player.maxMana;
      } 
    }
  }

  public getTotalStats(player?: PlayerModel): StatisticsModel
  {
    if(!player)
    {
      player = this.player;
    }

    let stats = {
      str: player.stats.str,
      int: player.stats.int,
      def: player.stats.def,
      mnd: player.stats.mnd
      } as StatisticsModel

    for(const equip of player.equipment)
    {
      stats.str += equip.stats.str;
      stats.int += equip.stats.int;
      stats.def += equip.stats.def;
      stats.mnd += equip.stats.mnd;
    }
    return stats;
   
  }

  public getPercentOfMax(val: number, maxval: number): string
  {
    return val/maxval * 100 + '%';
  }

  public getMaxHealth(player: PlayerModel): number
  {
    if(player)
    {
      const stats = this.getTotalStats(player);
      return player.baseHealth + ((stats.str) * 5);
    }
  }

  public getMaxMana(player: PlayerModel): number
  {
    if(player)
    {
      const stats = this.getTotalStats(player);
      return player.baseMana + ((stats.int) * 5);
    }
  }

  public generateNewPlayer(name: string): void
  {
    const model = {
      name: name,
      health: 100,
      maxHealth: 100,
      baseHealth: 100,
      mana: 100,
      maxMana: 100,
      baseMana: 100,
      stats: this.generateStatsModel(10,10,10,10),
      equipment: this.generateStartingEquipment(),
      level: 1
    } as PlayerModel

    model.health = model.maxHealth = this.getMaxHealth(model);
    model.mana = model.maxMana = this.getMaxMana(model);

    this.player = model;
  }

  public playerAttack(magic: boolean)
  {
    let damage = 0;
    let weaponRange = find(this.player.equipment, e => e.type == EquipmentTypeEnum.Weapon).damage;
    if(weaponRange && !magic)
    {
      damage = this.getTotalStats().str + Math.floor(Math.random() * ((weaponRange.max - weaponRange.min) + weaponRange.min));
    }
    else if(magic && this.player.mana > 20)
    {
      this.player.mana -= 20;
      damage = this.getTotalStats().int * 2 + Math.floor(Math.random() * this.getTotalStats().int * 2);
    }
    
    this.damageEnemy.emit(damage);
  }

  public takeDamage(damage: number)
  {
    let takenDamage = damage - this.getTotalStats().def;
    if (takenDamage < damage * 0.2)
    {
      takenDamage = Math.floor(damage * 0.2);
    }

    this.combatLogService.addCombatLine(this.player, {type: CombatActionTypeEnum.PlayerDamage, damageAmount: takenDamage} as CombatActionModel);
    this.player.health -= takenDamage;
    if(this.player.health <= 0)
    {
      this.playerDies.emit(this.player.name);
    }
  }

  public getClassLevelString(): string
  {
    let classString = "Acolyte";
    const stats = this.getTotalStats();

    if(stats.str > stats.def
      && stats.str > stats.int
      && stats.str > stats.mnd)
      {
        classString = "Warrior";
      }
    if(stats.int > stats.def
      && stats.int > stats.str
      && stats.int > stats.mnd)
      {
        classString = "Mage";
      }
    if(stats.def > stats.str
      && stats.def > stats.int
      && stats.def > stats.mnd)
      {
        classString = "Paladin";
      }
    if(stats.mnd > stats.def
      && stats.mnd > stats.int
      && stats.mnd > stats.str)
      {
        classString = "Monk";
      }
    return "Lv." + this.scoreService.getCurrentProgressLevel() + " " + classString;
  }

  // Regenerates max health value on gear change
  private regenerateMaxHealth(): void
  {
    if(this.player)
    {
      this.player.maxHealth = this.getMaxHealth(this.player);
      this.player.maxMana = this.getMaxMana(this.player);
    }
  }

  private generateStatsModel(str: number, int: number, def: number, mnd: number): StatisticsModel
  {
    const model = {
      str: str,
      int: int,
      def: def,
      mnd: mnd
    } as StatisticsModel;

    return model;
  }

  private generateStartingEquipment(): EquipmentModel[]
  {
    const weaponModel = {
      name: "Rusted Blade",
      damage: {
        min:1,
        max:5
      } as DamageRangeModel,
      type: EquipmentTypeEnum.Weapon,
      stats: this.generateStatsModel(0, 0, 0, 0),
      rarity: RarityTypeEnum.Common
    }

    const armorModel = {
      name: "Battered Leather Cuirass",
      type: EquipmentTypeEnum.Armor,
      stats: this.generateStatsModel(0, 0, 5, 0),
      rarity: RarityTypeEnum.Common
    }

    return [weaponModel, armorModel]; 
  }

}
