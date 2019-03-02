import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../models/player-model';
import { StatisticsModel } from '../models/statistics-model';
import { EquipmentModel } from '../models/equipment-model';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { RarityTypeEnum } from '../enums/rarity-type-enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  

}
