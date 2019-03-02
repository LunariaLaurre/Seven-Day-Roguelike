import { StatisticsModel } from './statistics-model';

export class EnemyModel {
    name: string;
    health: number;
    maxHealth: number;
    stats: StatisticsModel;
    exp: number;
    level: number;
}