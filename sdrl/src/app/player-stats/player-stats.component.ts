import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../models/player-model';
import { SupervisorService } from '../supervisor.service';
import { PlayerGeneratorService } from '../player-generator.service';
import { StatisticsModel } from '../models/statistics-model';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  constructor(
    private supervisorService: SupervisorService,
    private playerGeneratorService: PlayerGeneratorService
  ) { }

  ngOnInit() {
  }

  public getPlayerInfo(): PlayerModel
  {
    return this.supervisorService.getPlayerInfo();
  }

  public getTotalStats(): StatisticsModel
  {
    return this.playerGeneratorService.getTotalStats(this.getPlayerInfo());
  }

  public getPercentOfMax(val: number, maxval: number): string
  {
    return val/maxval * 100 + '%';
  }

  public getClassLevelString(): string
  {
    let classString = "Acolyte";
    const stats = this.playerGeneratorService.getTotalStats(this.getPlayerInfo())

    if(stats.str > stats.def
      && stats.str > stats.int
      && stats.str > stats.mnd)
      {
        classString = "Warrior";
      }
    if(stats.int > stats.def
      && stats.int > stats.str
      && stats.int > stats.mnd)
      {
        classString = "Mage";
      }
    if(stats.def > stats.str
      && stats.def > stats.int
      && stats.def > stats.mnd)
      {
        classString = "Paladin";
      }
    if(stats.mnd > stats.def
      && stats.mnd > stats.int
      && stats.mnd > stats.str)
      {
        classString = "Monk";
      }
    return "Lv." + this.supervisorService.getCurrentFloor() + " " + classString;
  }

}
