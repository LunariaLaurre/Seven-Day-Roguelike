import { Component, OnInit, Input } from '@angular/core';
import { DamageRangeModel } from '../models/damage-range-model';
import { ElementTypeEnum } from '../enums/element-type-enum';
import { EquipmentModel } from '../models/equipment-model';
import { RarityTypeEnum } from '../enums/rarity-type-enum';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';

@Component({
  selector: 'app-equipment-display',
  templateUrl: './equipment-display.component.html',
  styleUrls: ['./equipment-display.component.scss']
})
export class EquipmentDisplayComponent implements OnInit {

  @Input() equip;

  constructor() { }

  ngOnInit() {
  }

  public getEquipDamageString(damage: DamageRangeModel): string
  {
    switch(damage.element)
    {
      case ElementTypeEnum.Fire:
        return 'Fire Damage'
      case ElementTypeEnum.Ice:
        return 'Ice Damage'
      case ElementTypeEnum.Lightning:
        return 'Lightning Damage'
      default:
        return 'Damage'
    }
  }

  public getColorForRarity(equip: EquipmentModel): string
  {
    switch(equip.rarity)
    {
      case RarityTypeEnum.Common:
        return '#eee';
      case RarityTypeEnum.Magic:
        return '#73db59';
      case RarityTypeEnum.Rare:
        return '#2a8eb2';
      case RarityTypeEnum.Epic:
        return '#9a45cc';
      case RarityTypeEnum.Legendary:
        return '#e58f20';
      default:
        break;
    }
  }

  public getEquipmentIcon(equip: EquipmentModel): string
  {
    switch(equip.type)
    {
      case EquipmentTypeEnum.Weapon:
        return 'pan_tool'
      case EquipmentTypeEnum.Armor:
        return 'favorite'
      case EquipmentTypeEnum.Accessory:
        return 'face'
      default:
        break;
    }
  }

}
