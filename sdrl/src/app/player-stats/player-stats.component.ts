import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerModel } from '../models/player-model';
import { StatisticsModel } from '../models/statistics-model';
import { EquipmentModel } from '../models/equipment-model';
import { RarityTypeEnum } from '../enums/rarity-type-enum';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { DamageRangeModel } from '../models/damage-range-model';
import {sortBy} from 'lodash'
import { CombatLogService } from '../combat-log.service';
import { CombatActionModel } from '../models/combat-action-model';
import { CombatActionTypeEnum } from '../enums/combat-action-type-enum';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  constructor(
    private combatLogService: CombatLogService
  ) { }

  @Output() damageEnemy = new EventEmitter();

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
    this.regenerateMaxHealth(this.player);
    this.healPlayer(this.player);
    this.player.equipment = sortBy(this.player.equipment, e => e.type)
    this.combatLogService.addCombatLine(this.player, {type: CombatActionTypeEnum.Equip} as CombatActionModel, null, equip)

  }

  public healPlayer(player: PlayerModel): void
  {
    player.health = player.maxHealth;
    player.mana = player.maxMana;
  }

  public getTotalStats(player: PlayerModel): StatisticsModel
  {
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
    const stats = this.getTotalStats(player);
    return player.baseHealth + ((stats.str-100) * 5);
  }

  public getMaxMana(player: PlayerModel): number
  {
    const stats = this.getTotalStats(player);
    return player.baseMana + ((stats.int-100) * 5);
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
      stats: this.generateStatsModel(100,100,100,100),
      equipment: this.generateStartingEquipment(),
      level: 1
    } as PlayerModel

    model.health = model.maxHealth = this.getMaxHealth(model);
    model.mana = model.maxMana = this.getMaxMana(model);

    this.player = model;
  }

  public playerAttack(magic: boolean)
  {
    let damage = 50;
    this.damageEnemy.emit(damage);
  }

  public takeDamage(damage: number)
  {
    this.player.health -= damage;
  }

  // Regenerates max health value on gear change
  private regenerateMaxHealth(player: PlayerModel): void
  {
    player.maxHealth = this.getMaxHealth(player);
    player.maxMana = this.getMaxMana(player);
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
        min:10,
        max:20
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
