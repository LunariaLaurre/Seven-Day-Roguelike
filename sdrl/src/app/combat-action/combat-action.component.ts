import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-combat-action',
  templateUrl: './combat-action.component.html',
  styleUrls: ['./combat-action.component.scss']
})
export class CombatActionComponent implements OnInit {

@Output() attack = new EventEmitter();
@Output() cast = new EventEmitter();

public attackEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  playerAttacks()
  {
    if(this.attackEnabled)
    {
      this.attack.emit(null);
      this.attackEnabled = false;
    }
  }

  playerCasts()
  {
    if(this.attackEnabled)
    {
      this.cast.emit(null);
      this.attackEnabled = false;
    }
  }

  reEnableAttack()
  {
    this.attackEnabled = true;
  }

}
