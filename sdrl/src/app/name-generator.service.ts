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
    'Wolf-',
    'Cassandra\'s '
  ]

  private readonly suffix = [
    ' of Maiming',
    ' of the End',
    ', Gyrls Bane',
    ' of Birds',
    ' of the Scar',
    ' of Sushi'
  ]

  private readonly weapons = [
    'Sword',
    'Blade',
    'Club'
  ]
    
  private readonly armors = [
    'Armor',
    'Hide',
    'Cuirass'
  ]

  private readonly accessories = [
    'Charm',
    'Ring',
    'Necklace'
  ]

  private readonly classes = [
    'Small',
    'Smol',
    'Tiny',
    'Diminuitive'
  ]

  private readonly bosses = [
    'Sushi the Thicc'
  ]


  generateItemName(equip: EquipmentModel): string
  {
    let typeString = '';
    switch(equip.type)
    {
      case EquipmentTypeEnum.Weapon:
        typeString = this.weapons[Math.floor(Math.random() * this.weapons.length)];
        break;
      case EquipmentTypeEnum.Armor:
        typeString = this.armors[Math.floor(Math.random() * this.armors.length)];
        break;
      case EquipmentTypeEnum.Accessory:
        typeString = this.accessories[Math.floor(Math.random() * this.accessories.length)];
        break;
      default:
        break;
    }

    const preString = this.prefix[Math.floor(Math.random() * this.prefix.length)];
    const postString = this.suffix[Math.floor(Math.random() * this.suffix.length)];

    return preString + typeString + postString;
  }

  generateEnemyName(boss: boolean)
  {
    if(boss)
    {
      return this.bosses[Math.floor(Math.random() * this.bosses.length)];
    }

    const classString = this.classes[Math.floor(Math.random() * this.classes.length)];
    return classString + " Gremlin"
  }

}
