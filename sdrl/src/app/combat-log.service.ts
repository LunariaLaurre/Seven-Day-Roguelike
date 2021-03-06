import { Injectable } from '@angular/core';
import { PlayerModel } from './models/player-model';
import { EnemyModel } from './models/enemy-model';
import { CombatActionModel } from './models/combat-action-model';
import { takeRight } from 'lodash'
import { CombatActionTypeEnum } from './enums/combat-action-type-enum';
import { EquipmentModel } from './models/equipment-model';
@Injectable({
  providedIn: 'root'
})
export class CombatLogService {

  private lines: string[] = [];

  constructor() { }


  addCombatLine(player: PlayerModel, action: CombatActionModel, enemy?: EnemyModel, equip?: EquipmentModel): void
  {
    switch(action.type)
    {
      case CombatActionTypeEnum.PlayerDamage:
        this.lines.push(player.name + " took " + action.damageAmount + " damage from the enemy attack!");
        break;
      case CombatActionTypeEnum.EnemyDamage:
        this.lines.push(enemy.name + " took " + action.damageAmount + " damage from your attack!");
        break;
      case CombatActionTypeEnum.EnemyDeath:
        this.lines.push(enemy.name + " has been slain! You gain a level!");
        break;
      case CombatActionTypeEnum.Equip:
        this.lines.push(player.name + " has been equipped with " + equip.name);
        break;
    }
  }

  addCustomLine(line: string): void
  {
    this.lines.push(line);
  }

  getCombatLogEntries(entries: number): string[]
  {
    return takeRight(this.lines, entries)
  }


}
