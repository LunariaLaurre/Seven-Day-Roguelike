import { Injectable } from '@angular/core';
import { RoomTypeEnum } from './enums/room-type-enum';
import { RoomModel } from './models/room-model';

@Injectable({
  providedIn: 'root'
})
export class RoomGeneratorService {

  constructor() { }

  public generateRooms(level: number): RoomModel[]
  {
    let rooms = [];

    // If the next floor is a boss floor, dont gen any non-battle rooms
    if(level % 10 == 0)
    {
      rooms.push(this.getRoomByType(RoomTypeEnum.Boss));
      return rooms;
    }

    for(let i = 0; i < 3; i++)
    {
      let roomSeed = Math.floor(Math.random() * 10);

      if(roomSeed < 1)
      {
        rooms.push(this.getRoomByType(RoomTypeEnum.Equipment));
      }
      else if(roomSeed < 3)
      {
        rooms.push(this.getRoomByType(RoomTypeEnum.Heal));
      }
      else
      {
        rooms.push(this.getRoomByType(RoomTypeEnum.Battle));
      }
    }
    // Always have a battle room
    rooms.push(this.getRoomByType(RoomTypeEnum.Battle));

    return rooms;
  }

  private getRoomByType(type: RoomTypeEnum): RoomModel
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
