import { Injectable } from '@angular/core';
import { PlayerModel } from './models/player-model';
import { EquipmentTypeEnum } from './enums/equipement-type-enum';
import { RarityTypeEnum } from './enums/rarity-type-enum';
import { StatisticsModel } from './models/statistics-model';
import { DamageRangeModel } from './models/damage-range-model';
import { EquipmentModel } from './models/equipment-model';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Injectable({
  providedIn: 'root'
})
export class PlayerGeneratorService {

  constructor() { }

  public generateNewPlayer(playerName: string): PlayerModel
  {
    const playerModel = {
      name: playerName,
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

    playerModel.health = playerModel.maxHealth = this.getMaxHealth(playerModel);
    playerModel.mana = playerModel.maxMana = this.getMaxMana(playerModel);

    return playerModel;
  }

  getTotalStats(playerModel: PlayerModel): StatisticsModel
  {
      let stats = {
      str: playerModel.stats.str,
      int: playerModel.stats.int,
      def: playerModel.stats.def,
      mnd: playerModel.stats.mnd
      } as StatisticsModel

      for(const equip of playerModel.equipment)
      {
      stats.str += equip.stats.str;
      stats.int += equip.stats.int;
      stats.def += equip.stats.def;
      stats.mnd += equip.stats.mnd;
      }
      return stats;
  }

    
  getMaxHealth(playerModel: PlayerModel): number
  {
      const stats = this.getTotalStats(playerModel);
      return playerModel.baseHealth + ((stats.str) * 5);
  }

  getMaxMana(playerModel: PlayerModel): number
  {
    const stats = this.getTotalStats(playerModel);
    return playerModel.baseMana + ((stats.int) * 5);
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
    } as EquipmentModel

    const armorModel = {
      name: "Battered Leather Cuirass",
      type: EquipmentTypeEnum.Armor,
      stats: this.generateStatsModel(0, 0, 5, 0),
      rarity: RarityTypeEnum.Common
    } as EquipmentModel

    return [weaponModel, armorModel]; 
  }

  

}
