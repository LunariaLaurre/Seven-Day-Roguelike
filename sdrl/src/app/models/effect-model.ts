import { StatisticsModel } from './statistics-model';
import { EffectTypeEnum } from '../enums/effect-type-enum';

export class EffectModel {
    value: number;
    modifier: StatisticsModel;
    duration: number;
    icon: string;
    chance: number;
    type: EffectTypeEnum;
}