import { StatisticsModel } from './statistics-model';
import { EquipmentTypeEnum } from '../enums/equipement-type-enum';
import { RarityTypeEnum } from '../enums/rarity-type-enum';
import { DamageRangeModel } from './damage-range-model';
import { EffectModel } from './effect-model';

export class EquipmentModel {
    name: string;
    damage?: DamageRangeModel;
    type: EquipmentTypeEnum;
    stats: StatisticsModel;
    rarity: RarityTypeEnum;
    icon: string;
    effects: EffectModel[];
}