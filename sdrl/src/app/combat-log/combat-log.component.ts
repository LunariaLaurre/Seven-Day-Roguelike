import { Component, OnInit } from '@angular/core';
import { CombatLogService } from '../combat-log.service';

@Component({
  selector: 'app-combat-log',
  templateUrl: './combat-log.component.html',
  styleUrls: ['./combat-log.component.scss']
})
export class CombatLogComponent implements OnInit {

  constructor(
    private combatLogService: CombatLogService
  ) { }

  ngOnInit() {
  }

  getCombatLogLines(): string[]
  {
    return this.combatLogService.getCombatLogEntries(5);
  }

}
