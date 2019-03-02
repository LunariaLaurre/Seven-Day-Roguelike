import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EnemyModel } from '../models/enemy-model';
import { CombatLogService } from '../combat-log.service';
import { CombatActionModel } from '../models/combat-action-model';
import { CombatActionTypeEnum } from '../enums/combat-action-type-enum';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.scss']
})
export class EnemyStatsComponent implements OnInit {

  constructor(
    private combatLogService: CombatLogService,
    private scoreService: ScoreService
  ) { }

  @Output() damagePlayer = new EventEmitter();
  @Output() generateLoot = new EventEmitter();
  @Output() enableAttack = new EventEmitter();
  public enemy: EnemyModel;

  ngOnInit() {
    this.generateNewEnemy(1);
  }

  private generateNewEnemy(level: number)
  {
    let health = (Math.floor(Math.random() * 50)+100)*level;

    let newEnemy = {
      name: "Gremlin",
      health: health,
      maxHealth: health,
      exp: (Math.floor(Math.random() * 50)+20)*level,
      level: level
    } as EnemyModel

    this.enemy = newEnemy;
  }

  public getPercentOfMax(val: number, maxval: number): string
  {
    return val/maxval * 100 + '%';
  }

  public takeDamage(damage: number)
  {
    this.enemy.health -= damage;

    if(this.enemy.health <= 0)
    {
      this.enemyDies();
      setTimeout(() => {
        this.enableAttack.emit(null);
      }, 700);
    }
    else
    {
      this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.EnemyDamage, damageAmount: damage} as CombatActionModel, this.enemy, null);
      setTimeout(() => {
        let returnDamage = 50;
        this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.PlayerDamage, damageAmount: damage} as CombatActionModel, this.enemy, null);
        this.damagePlayer.emit(returnDamage);
        this.enableAttack.emit(null);
      }, 700);
    }
  }

  private enemyDies()
  {
    this.enableAttack.emit(null);
    this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.EnemyDeath} as CombatActionModel, this.enemy, null);
    this.generateLoot.emit(this.scoreService.getCurrentProgressLevel())
    this.scoreService.levelUp();
    this.generateNewEnemy(this.scoreService.getCurrentProgressLevel());
  }

}
