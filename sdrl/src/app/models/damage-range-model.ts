import { ProcModel } from './proc-model';
import { ElementTypeEnum } from '../enums/element-type-enum';

export class DamageRangeModel{
    min: number;
    max: number;
    element?: ElementTypeEnum;
    procs?: ProcModel[];
}