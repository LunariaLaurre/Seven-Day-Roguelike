import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../models/room-model';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.scss']
})
export class RoomSelectComponent implements OnInit {

  constructor(
    private supervisorService: SupervisorService
  ) { }

  ngOnInit() {

  }

  public getCurrentFloor(): number
  {
    return this.supervisorService.getCurrentFloor();
  }

  public getRooms(): RoomModel[]
  {
    return this.supervisorService.getRooms();
  }

  public selectRoom(room: RoomModel)
  {
    this.supervisorService.handleEnterRoom(room.type);
  }
}
