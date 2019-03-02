import { Component, OnInit } from '@angular/core';
import { EnemyModel } from '../models/enemy-model';

@Component({
  selector: 'app-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.scss']
})
export class EnemyStatsComponent implements OnInit {

  constructor() { }

  public enemy;

  ngOnInit() {

    this.enemy = this.generateNewEnemy(1);
  }

  private generateNewEnemy(level: number)
  {
    let newEnemy = {
      name: "Gremlin",
      health: 100,
      maxHealth: 100,
    } as EnemyModel

    return newEnemy;
  }

  public getPercentOfMax(val: number, maxval: number): string
  {
    return val/maxval * 100 + '%';
  }

}
