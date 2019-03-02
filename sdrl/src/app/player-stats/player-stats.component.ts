import { Component, OnInit, Input } from '@angular/core';
import { PlayerModel } from '../models/player-model';
import { StatisticsModel } from '../models/statistics-model';
import { EquipmentModel } from '../models/equipment-model';
import { RarityTypeEnum } from '../enums/rarity-type-enum';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { DamageRangeModel } from '../models/damage-range-model';
import {sortBy} from 'lodash'

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  constructor() { }

  public player: PlayerModel;
  public demoGear: EquipmentModel;

  ngOnInit() {
      this.player = this.generateNewPlayer("Lilth");
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
    return player.baseHealth + (stats.str * 5);
  }

  public getMaxMana(player: PlayerModel): number
  {
    const stats = this.getTotalStats(player);
    return player.baseMana + (stats.int * 5);
  }

  private generateNewPlayer(name: string): PlayerModel
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
      equipment: this.generateNewEquipment()

    } as PlayerModel

    model.health = model.maxHealth = this.getMaxHealth(model);
    model.mana = model.maxMana = this.getMaxMana(model);

    return model;
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

  private generateNewEquipment(): EquipmentModel[]
  {
    const weaponModel = {
      name: "Sword of Lilth",
      damage: {
        min:20,
        max:30
      } as DamageRangeModel,
      type: EquipmentTypeEnum.Weapon,
      stats: this.generateStatsModel(20, 0, 0, 0),
      rarity: RarityTypeEnum.Common
    }

    const armorModel = {
      name: "Booty Shorts",
      type: EquipmentTypeEnum.Armor,
      stats: this.generateStatsModel(0, 0, 0, 30),
      rarity: RarityTypeEnum.Magic
    }

    const accessoryModel = {
      name: "Bell Collar",
      type: EquipmentTypeEnum.Accessory,
      stats: this.generateStatsModel(0, 20, 0, 0),
      rarity: RarityTypeEnum.Legendary
    }

    return [weaponModel, armorModel, accessoryModel]; 
  }

}
