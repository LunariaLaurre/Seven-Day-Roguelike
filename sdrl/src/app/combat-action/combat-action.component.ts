import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-combat-action',
  templateUrl: './combat-action.component.html',
  styleUrls: ['./combat-action.component.scss']
})
export class CombatActionComponent implements OnInit {

@Output() attack = new EventEmitter();
@Output() cast = new EventEmitter();

private attackEnabled = true;

  constructor() { }

  ngOnInit() {
  }

  playerAttacks()
  {
    this.attack.emit(null);
    this.attackEnabled = false;
  }

  playerCasts()
  {
    this.cast.emit(null);
    this.attackEnabled = false;
  }

  reEnableAttack()
  {
    this.attackEnabled = true;
  }

}
