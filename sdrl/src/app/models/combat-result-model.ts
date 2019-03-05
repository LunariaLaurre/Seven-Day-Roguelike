import { PlayerModel } from './player-model';
import { EnemyModel } from './enemy-model';

export class CombatResultModel {
    playerStatus: PlayerModel;
    enemyStatus: EnemyModel;
    logLine: string;
}