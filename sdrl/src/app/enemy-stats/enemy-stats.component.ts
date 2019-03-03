import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EnemyModel } from '../models/enemy-model';
import { CombatLogService } from '../combat-log.service';
import { CombatActionModel } from '../models/combat-action-model';
import { CombatActionTypeEnum } from '../enums/combat-action-type-enum';
import { ScoreService } from '../score.service';
import { NameGeneratorService } from '../name-generator.service';

@Component({
  selector: 'app-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.scss']
})
export class EnemyStatsComponent implements OnInit {

  constructor(
    private combatLogService: CombatLogService,
    private scoreService: ScoreService,
    private nameGeneratorService: NameGeneratorService
  ) { }

  @Output() damagePlayer = new EventEmitter();
  @Output() generateLoot = new EventEmitter();
  @Output() enableAttack = new EventEmitter();
  public enemy: EnemyModel;
  public attackingNow = false;

  ngOnInit() {
  }

  private generateNewEnemy(level: number)
  {
    let health = (Math.floor(Math.random() * 20)+ 10 * level);

    let boss = level % 10 == 0;

    if(boss)
    {
      health *= 10;
      level *= 2;
    }

    let newEnemy = {
      name: this.nameGeneratorService.generateEnemyName(boss),
      health: health,
      maxHealth: health,
      level: level
    } as EnemyModel
    
    this.combatLogService.addCustomLine(newEnemy.name + " appears before you!");
    
    setTimeout(() => {
      this.enableAttack.emit(null);
    }, 700);
    this.enemy = newEnemy;
  }

  public getPercentOfMax(val: number, maxval: number): string
  {
    return val/maxval * 100 + '%';
  }

  public takeDamage(damage: number)
  {
    this.enemy.health -= damage;
    this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.EnemyDamage, damageAmount: damage} as CombatActionModel, this.enemy, null);
    
    if(this.enemy.health <= 0)
    {
      this.enemyDies();
    }
    else
    {
      this.attackingNow = true;
      setTimeout(() => {
        let returnDamage = Math.floor((Math.random() * 3 * this.enemy.level + 15));
        this.damagePlayer.emit(returnDamage);
        this.enableAttack.emit(null);
        this.attackingNow = false;
      }, 700);
    }
  }

  private enemyDies()
  {
    this.enableAttack.emit(null);
    this.combatLogService.addCombatLine(null, {type: CombatActionTypeEnum.EnemyDeath} as CombatActionModel, this.enemy, null);
    this.generateLoot.emit(this.scoreService.getCurrentProgressLevel())
    this.scoreService.levelUp();
    this.enemy = null;
  }
}
