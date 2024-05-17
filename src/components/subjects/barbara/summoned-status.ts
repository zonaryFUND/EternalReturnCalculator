import { Status, StatusProps, SummonedStatus } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { Language } from "app-types/language";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export default function(barbaraStatus: Status, config: SubjectConfig): SummonedStatus {
    return {
        maxHP: new Decimal(Constants.Q.hp.base[config.skillLevels.Q] + config.level * Constants.Q.hp.level),
        attackPower: new Decimal(Constants.sentry_gun.base_attack).add(barbaraStatus.skillAmp.percent(Constants.T.attack_amp).times(config.level)),
        defense: new Decimal(Constants.sentry_gun.base_defense).add(barbaraStatus.skillAmp.percent(Constants.T.defense_amp).times(config.level)),
        attackSpeed: new Decimal(Constants.sentry_gun.attack_speed),
        criticalChance: new Decimal(0),
        skillAmp: new Decimal(0),
        armorPenetration: new Decimal(0),
        armorPenetrationRatio: new Decimal(0)
    }
}

export function name(language: Language): string {
    switch (language) {
        case "jp":
            return "セントリーガン";
    }
}