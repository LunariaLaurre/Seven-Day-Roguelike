import { CombatActionTypeEnum } from '../enums/combat-action-type-enum';

export class CombatActionModel{
    type: CombatActionTypeEnum;
    damageAmount?: number;
}