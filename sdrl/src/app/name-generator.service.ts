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
    'Cassandra\'s ',
    'Feathered ',
    'Courtney\'s ',
    'Gay ',
    'Neon Pink ',
    'Cute ',
    'Small ',
    'Furry '
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
    'Club',
    'Wand',
    'Staff',
    'Dagger',
    'Scimitar',
    'Knife',
    'Hammer'
  ]
    
  private readonly armors = [
    'Armor',
    'Hide',
    'Cuirass',
    'Plate',
    'Mail',
    'Shirt'
  ]

  private readonly accessories = [
    'Charm',
    'Ring',
    'Necklace',
    'Hat',
    'Pin',
    'Ribbon'
  ]

  private readonly classes = [
    'Small ',
    'Smol ',
    'Tiny ',
    'Blorpy ',
    'Weird ',
    'Noisy ',
    'Annoying ',
    'Rude ',
    'Tired ',
    'Sleepy ',
    'Fluffy ',
    'Brooding ',
    'Dire ',
    'Mega-',
    'Kinkster ',
    'Gamer ',
    'Lady ',
    'Boy ',
    'Boi ',
    'Slimy '
  ]

  private readonly bosses = [
    'Big Sushi',
    'Jasper the Golden',
    'The Gryphon',
    'The Furtive Midnight',
    'Lord of Squirmles',
    'Tsuchinoko the Real'
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
    let classString2 = this.classes[Math.floor(Math.random() * this.classes.length)];

    while(classString2 == classString)
    {
      classString2 = this.classes[Math.floor(Math.random() * this.classes.length)];
    }

    return classString + classString2 + "Gremlin"
  }

}
