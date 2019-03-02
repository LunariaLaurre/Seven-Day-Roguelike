import { Injectable } from '@angular/core';
import { EquipmentModel } from './models/equipment-model';
import { EquipmentTypeEnum } from './enums/equipement-type-enum';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  constructor() { }

  private readonly prefix = [
    'Rusted ',
    'Ancient ',
    'Gleaming ',
    'Lilth\'s ',
    'Thicc ',
    'Forgotten ',
    'Holy ',
    'Wolf-'
  ]

  private readonly suffix = [
    ' of Maiming',
    ' of the Eleventh Hour',
    ', Gyrls Bane',
    ' of Birds',
    ' of the Scar',
    ' of Sushi'
  ]

  generateItemName(equip: EquipmentModel): string
  {
    let typeString = '';
    switch(equip.type)
    {
      case EquipmentTypeEnum.Weapon:
        typeString = 'Blade'
        break;
      case EquipmentTypeEnum.Armor:
        typeString = 'Armor'
        break;
      case EquipmentTypeEnum.Accessory:
        typeString = 'Charm'
        break;
      default:
        break;
    }

    const preString = this.prefix[Math.floor(Math.random() * this.prefix.length)];
    const postString = this.suffix[Math.floor(Math.random() * this.suffix.length)];

    return preString + typeString + postString;
  }

}
