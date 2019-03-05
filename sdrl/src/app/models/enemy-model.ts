import { StatisticsModel } from './statistics-model';
import { AbilityModel } from './ability-model';
import { EffectModel } from './effect-model';

export class EnemyModel {
    name: string;
    health: number;
    baseHealth: number;
    maxHealth: number;
    stats: StatisticsModel;
    abilities: AbilityModel[];
    effects: EffectModel[];
    level: number;
}