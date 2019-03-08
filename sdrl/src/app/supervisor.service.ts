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
import { some } from 'lodash';
import { EffectModel } from './models/effect-model';
import { EffectTypeEnum } from './enums/effect-type-enum';
import { RoomGeneratorService } from './room-generator.service';
import { PlayerGeneratorService } from './player-generator.service';
import { EnemyGeneratorService } from './enemy-generator.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(
    private combatHandlerService: CombatHandlerService,
    private combatLogService: CombatLogService,
    private roomGeneratorService: RoomGeneratorService,
    private playerGeneratorService: PlayerGeneratorService,
    private enemyGeneratorService: EnemyGeneratorService
  ) { }

  // Models
  private player: PlayerModel;
  private enemy: EnemyModel;
  private rooms: RoomModel[];

  // Vars
  private playerExp: number;
  private floor: number;
  private combatPhase: CombatPhaseEnum
  // Combat Functions

  combatBegin()
  {
    this.combatPhase = CombatPhaseEnum.OngoingEffects;

    // If player has ongoing effects
    if(some(this.player.effects))
    {
      this.handleEffects(this.player.effects, true);
    }

    // If Equipment has ongoing effects
    for (let equip of this.player.equipment)
    {
      if(some(equip.effects))
      {
        this.handleEffects(equip.effects, true);
      }
    }

    // If enemy has ongoing effects
    if(some(this.enemy.effects))
    {
      this.handleEffects(this.enemy.effects, false);
    }

  }

  combatPlayerAction()
  {
    this.combatPhase = CombatPhaseEnum.PlayerAction;
  }

  combatEnemyAction()
  {
    this.combatPhase = CombatPhaseEnum.EnemyAction;
  }

  combatCleanup()
  {
    this.combatPhase = CombatPhaseEnum.Cleanup;

    this.floor ++;
    this.roomGeneratorService.generateRooms(this.floor);
  }


  // Handlers

  handleNewGame()
  {
    this.player = this.playerGeneratorService.generateNewPlayer("Lilth");
    this.combatPhase = null;
    this.floor = 1;
    this.roomGeneratorService.generateRooms(this.floor);
    
    this.combatLogService.addLine("You awaken in a dark corridor...");
    this.combatLogService.addLine("Venture forth into the 100 chambers of the Gremlins!");
  }

  handleEnterRoom(type: RoomTypeEnum)
  {
    this.rooms = [];


  }

  handleAction(ability: AbilityModel)
  {
    const result = this.combatHandlerService.handleAction(this.player, this.enemy, ability, this.combatPhase);

    this.player = result.playerStatus;
    this.enemy = result.enemyStatus;
    this.combatLogService.addLine(result.logLine);

  }

  handleEffects(effects: EffectModel[], targetsPlayer: boolean)
  {
    const target: PlayerModel | EnemyModel = targetsPlayer ? this.player : this.enemy;

    for(const effect of effects)
    {
      switch(effect.type)
      {
        case EffectTypeEnum.Damage:
          break;
        default: 
          break;
      }
    }
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
