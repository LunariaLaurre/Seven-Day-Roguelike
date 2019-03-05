import { Injectable } from '@angular/core';
import { CombatLogService } from './combat-log.service';
import { PlayerModel } from './models/player-model';
import { EnemyModel } from './models/enemy-model';
import { AbilityModel } from './models/ability-model';
import { CombatPhaseEnum } from './enums/combat-phase-enum';
import { CombatResultModel } from './models/combat-result-model';

@Injectable({
  providedIn: 'root'
})
export class CombatHandlerService {

  constructor(
    private combatLogService: CombatLogService
  ) { }

  handleAction(player: PlayerModel, enemy: EnemyModel, action: AbilityModel, phase: CombatPhaseEnum): CombatResultModel
  {
    return new CombatResultModel;
  }

}
