import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EquipmentModel } from '../models/equipment-model';
import { StatisticsModel } from '../models/statistics-model';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { DamageRangeModel } from '../models/damage-range-model';
import { NameGeneratorService } from '../name-generator.service';
import { RarityTypeEnum } from '../enums/rarity-type-enum';

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

  public declineEquips()
  {
    this.equipment = [];
  }

  public equipEquipment(equip: EquipmentModel)
  {
    this.equip.emit(equip);
    this.equipment = [];
  }

  public generateRandomEquipment(level: number): void
  {
    let equips = [];

    for(let i = 0; i < (2 + Math.floor(Math.random() * 3)); i++)
    {

      let raritySeed = Math.floor(Math.random() * 70) + level;
      let rarity = RarityTypeEnum.Common;
      let randomStats;
      let randomRange;

      let newEquip = {
        type: Math.floor(Math.random() * 3)
      } as EquipmentModel

      if(raritySeed < 40)
      {
        rarity = RarityTypeEnum.Common;

        randomStats = {
          str: Math.floor(Math.random() * level),
          int: Math.floor(Math.random() * level),
          def: Math.floor(Math.random() * level),
          mnd: Math.floor(Math.random() * level)
        } as StatisticsModel
        
        if (newEquip.type == EquipmentTypeEnum.Weapon)
        {
          randomRange = {
          min: Math.floor(Math.random() * level + 1),
          max: Math.floor(Math.random() * level + 5),
          } as DamageRangeModel
        }
      }
      else if(raritySeed < 65)
      {
        rarity = RarityTypeEnum.Magic;

        randomStats = {
          str: Math.floor(Math.random() * 2 * level + 5),
          int: Math.floor(Math.random() * 2 * level + 5),
          def: Math.floor(Math.random() * 2 * level + 5),
          mnd: Math.floor(Math.random() * 2 * level + 5)
        } as StatisticsModel

        if (newEquip.type == EquipmentTypeEnum.Weapon)
        {
          randomRange = {
          min: Math.floor(Math.random() * 2 * level + 10),
          max: Math.floor(Math.random() * 2 * level + 15),
          } as DamageRangeModel
        }
      }
      else if(raritySeed < 85)
      {
        rarity = RarityTypeEnum.Rare;

        randomStats = {
          str: Math.floor(Math.random() * 3 * level + 15),
          int: Math.floor(Math.random() * 3 * level + 15),
          def: Math.floor(Math.random() * 3 * level + 15),
          mnd: Math.floor(Math.random() * 3 * level + 15)
        } as StatisticsModel

        if (newEquip.type == EquipmentTypeEnum.Weapon)
        {
          randomRange = {
          min: Math.floor(Math.random() * 3 * level + 15),
          max: Math.floor(Math.random() * 3 * level + 20),
          } as DamageRangeModel
        }
      }
      else if(raritySeed < 95)
      {
        rarity = RarityTypeEnum.Epic;

        randomStats = {
          str: Math.floor(Math.random() * 4 * level + 20),
          int: Math.floor(Math.random() * 4 * level + 20),
          def: Math.floor(Math.random() * 4 * level + 20),
          mnd: Math.floor(Math.random() * 4 * level + 20)
        } as StatisticsModel

        if (newEquip.type == EquipmentTypeEnum.Weapon)
        {
          randomRange = {
          min: Math.floor(Math.random() * 4 * level + 20),
          max: Math.floor(Math.random() * 4 * level + 30),
          } as DamageRangeModel
        }
      }
      else {
        rarity = RarityTypeEnum.Legendary;

        randomStats = {
          str: Math.floor(Math.random() * 5 * level + 50),
          int: Math.floor(Math.random() * 5 * level + 50),
          def: Math.floor(Math.random() * 5 * level + 50),
          mnd: Math.floor(Math.random() * 5 * level + 50)
        } as StatisticsModel

        if (newEquip.type == EquipmentTypeEnum.Weapon)
        {
          randomRange = {
          min: Math.floor(Math.random() * 5 * level + 40),
          max: Math.floor(Math.random() * 5 * level + 50),
          } as DamageRangeModel
    
        }
      }

      newEquip.rarity = rarity;
      newEquip.stats = randomStats;
      newEquip.damage = randomRange;
      newEquip.name = this.nameGeneratorService.generateItemName(newEquip);
  
      equips.push(newEquip);
    }
    this.equipment =  equips;
  }

}
