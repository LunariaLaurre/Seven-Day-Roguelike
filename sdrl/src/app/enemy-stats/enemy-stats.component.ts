import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EnemyModel } from '../models/enemy-model';
import { CombatLogService } from '../combat-log.service';
import { CombatActionModel } from '../models/combat-action-model';
import { CombatActionTypeEnum } from '../enums/combat-action-type-enum';

@Component({
  selector: 'app-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.scss']
})
export class EnemyStatsComponent implements OnInit {

  constructor(
    private combatLogService: CombatLogService
  ) { }

  @Output() damagePlayer = new EventEmitter()

  public enemy: EnemyModel;

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

  public takeDamage(damage: number)
  {
    this.enemy.health -= damage;

    this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.EnemyDamage, damageAmount: damage} as CombatActionModel, this.enemy, null);

    setTimeout(() => {
      let returnDamage = 50;
      this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.PlayerDamage, damageAmount: damage} as CombatActionModel, this.enemy, null);
      this.damagePlayer.emit(returnDamage);
    }, 700);
  }

}
