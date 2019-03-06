import { EffectModel } from './effect-model';

export class AbilityModel{
    name: string;
    description: string;
    cost: number;
    cooldown: number;
    cooling: number;
    icon: string;
    sound: string;
    self: boolean = false;
    effects?: EffectModel[];
}