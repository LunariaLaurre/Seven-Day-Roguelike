import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EquipmentModel } from '../models/equipment-model';
import { StatisticsModel } from '../models/statistics-model';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { DamageRangeModel } from '../models/damage-range-model';
import { NameGeneratorService } from '../name-generator.service';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.scss']
})
export class NewEquipmentComponent implements OnInit {

  @Output() equip = new EventEmitter();
  public equipment: EquipmentModel[] = [];

  constructor(
    private nameGeneratorService: NameGeneratorService
  ) { }


  ngOnInit() {

  }

  public equipEquipment(equip: EquipmentModel)
  {
    this.equip.emit(equip);
    this.equipment = [];
  }

  public generateRandomEquipment(level: number): EquipmentModel[]
  {
    let equips = [];

    for(let i = 0; i < level; i++)
    {
      let randomStats = {
        str: Math.floor(Math.random() * 50),
        int: Math.floor(Math.random() * 50),
        def: Math.floor(Math.random() * 50),
        mnd: Math.floor(Math.random() * 50)
      } as StatisticsModel
  
      let newEquip = {
        type: Math.floor(Math.random() * 3),
        rarity: Math.floor(Math.random() * 5),
        stats: randomStats
      } as EquipmentModel
  
      if (newEquip.type == EquipmentTypeEnum.Weapon)
      {
        let randomRange = {
          min: Math.floor(Math.random() * 50),
          max: Math.floor(Math.random() * 100),
        } as DamageRangeModel
  
        newEquip.damage = randomRange;
      }

      newEquip.name = this.nameGeneratorService.generateItemName(newEquip);
  
      equips.push(newEquip);
    }
    return equips;
  }

}
