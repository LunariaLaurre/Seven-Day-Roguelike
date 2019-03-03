import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoomModel } from '../models/room-model';
import { RoomTypeEnum } from '../enums/room-type-enum';
import { CombatLogService } from '../combat-log.service';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.scss']
})
export class RoomSelectComponent implements OnInit {


  @Output() startBattle = new EventEmitter();
  @Output() getEquipment = new EventEmitter();
  @Output() healPlayer = new EventEmitter();

  public selectingRoom = false;
  public rooms;

  constructor(
    private combatLogService: CombatLogService,
    private scoreService: ScoreService
  ) { }

  ngOnInit() {

  }

  public setSelectingRoom()
  {
    this.selectingRoom = true;
    this.generateNewRooms();
  }

  public selectRoom(room: RoomModel)
  {
    if(room.type == RoomTypeEnum.Battle)
    {
      this.combatLogService.addCustomLine('You charge forth into battle!');
      this.startBattle.emit(this.scoreService.getCurrentProgressLevel());
      this.selectingRoom = false;
    }

    if(room.type == RoomTypeEnum.Equipment)
    {
      this.combatLogService.addCustomLine('You open the chest, and before you is...');
      this.getEquipment.emit(this.scoreService.getCurrentProgressLevel())
      this.scoreService.levelUp();
      this.setSelectingRoom();
    }

    if(room.type == RoomTypeEnum.Heal)
    {
      this.combatLogService.addCustomLine('You drink deeply from the water and feel refreshed.');
      this.healPlayer.emit(null);
      this.scoreService.levelUp();
      this.setSelectingRoom();
    }

    if(room.type == RoomTypeEnum.Boss)
    {
      this.combatLogService.addCustomLine('You steel yourself!');
      this.startBattle.emit(this.scoreService.getCurrentProgressLevel());
      this.selectingRoom = false;
    }
  }

  public getCurrentFloor()
  {
    return this.scoreService.getCurrentProgressLevel();
  }

  private generateNewRooms()
  {
    let rooms = [];

    // If we are on a boss floor, dont gen any non-battle rooms
    if(this.scoreService.getCurrentProgressLevel() % 10 == 0)
    {
      rooms.push(this.generateRoom(RoomTypeEnum.Boss));
      this.rooms = rooms;
      return;
    }

    for(let i = 0; i < 3; i++)
    {
      let roomSeed = Math.floor(Math.random() * 10);

      if(roomSeed < 3)
      {
        rooms.push(this.generateRoom(RoomTypeEnum.Heal));
      }
      else if(roomSeed < 6)
      {
        rooms.push(this.generateRoom(RoomTypeEnum.Equipment));
      }
      else
      {
        rooms.push(this.generateRoom(RoomTypeEnum.Battle));
      }
    }
    // Always have a battle room
    rooms.push(this.generateRoom(RoomTypeEnum.Battle));

    this.rooms = rooms;
  }

  private generateRoom(type: RoomTypeEnum): RoomModel
  {
    switch(type)
    {
      case RoomTypeEnum.Heal:
        return {
          name: 'Healing Spring',
          description: 'Restores 20% of your health!',
          type: type
        } as RoomModel
      case RoomTypeEnum.Equipment:
        return {
          name: 'A Treasure Chest',
          description: 'What coule be inside...',
          type: type
        } as RoomModel
      case RoomTypeEnum.Battle:
        return {
          name: 'A Looming Foe',
          description: 'The Gremlins Await',
          type: type
        } as RoomModel
      case RoomTypeEnum.Boss:
        return {
          name: 'A Fearsome Presence',
          description: 'Tread Carefully...',
          type: type
        } as RoomModel
    }
  }
}
