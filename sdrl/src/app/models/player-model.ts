import { StatisticsModel } from './statistics-model';
import { EquipmentModel } from './equipment-model';
import { AbilityModel } from './ability-model';

export class PlayerModel {
    name: string;
    health: number;
    maxHealth: number;
    baseHealth: number;
    mana: number;
    maxMana: number;
    baseMana: number;
    stats: StatisticsModel;
    equipment: EquipmentModel[];
    abilities: AbilityModel[];
    level: number;
}