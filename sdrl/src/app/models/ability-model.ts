import { EffectModel } from './effect-model';

export class AbilityModel{
    name: string;
    description: string;
    cost: number;
    cooldown: number;
    self: boolean = false;
    effects?: EffectModel[];
}