import { Injectable } from '@angular/core';
import { PlayerModel } from './models/player-model';
import { EnemyModel } from './models/enemy-model';
import { RoomModel } from './models/room-model';
import { CombatPhaseEnum } from './enums/combat-phase-enum';
import { RoomTypeEnum } from './enums/room-type-enum';
import { AbilityModel } from './models/ability-model';
import { EquipmentModel } from './models/equipment-model';
import { CombatHandlerService } from './combat-handler.service';
import { CombatLogService } from './combat-log.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(
    private combatHandlerService: CombatHandlerService,
    private combatLogService: CombatLogService
  ) { }

  // Models
  private player: PlayerModel;
  private enemy: EnemyModel;
  private rooms: RoomModel[];

  // Vars
  private playerExp: number;
  private floor: number;
  private combatPhase: CombatPhaseEnum

  // Handlers
  handleEnterRoom(room: RoomTypeEnum)
  {

  }

  handleAction(ability: AbilityModel)
  {
    const result = this.combatHandlerService.handleAction(this.player, this.enemy, ability, this.combatPhase);

    this.player = result.playerStatus;
    this.enemy = result.enemyStatus;
    this.combatLogService.addLine(result.logLine);

  }

  handleAddEquipment(equip: EquipmentModel)
  {

  }

  handleAddAbility(ability: AbilityModel)
  {

  }

  // Getters
  getPlayerInfo(): PlayerModel
  {
    return this.player;
  }

  getEnemyInfo(): EnemyModel
  {
    return this.enemy;
  }

  getRooms(): RoomModel[]
  {
    return this.rooms;
  }

  getCurrentFloor(): number
  {
    return this.floor;
  }

  getCurrentCombatPhase(): CombatPhaseEnum
  {
    return this.combatPhase;
  }

}
