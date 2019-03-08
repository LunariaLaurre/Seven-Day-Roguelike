import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private supervisorService: SupervisorService
  ) { }

  ngOnInit() {
    this.supervisorService.handleNewGame();
  }
}
