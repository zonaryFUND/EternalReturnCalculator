import * as React from "react";
import Decimal from "decimal.js";
import { baseStatus as getBaseStatus } from "@app/entity/base-status";
import { EquipmentStatus, PerLevelStatus, WeaponTypeID, equipmentStatus, weaponBaseStatus } from "@app/entity/equipment";
import { mastery } from "@app/entity/mastery";
import useSubjectConfig, { Response as ConfigResponse, SubjectConfig } from "./use-subject-config";

export type Status = SubjectConfig & {
    maxHP: Decimal
    additionalMaxHP: Decimal
    maxSP: Decimal
    hpReg: Decimal
    spReg: Decimal

    attackPower: Decimal
    additionalAttackPower: Decimal
    basicAttackAmp: Decimal
    attackSpeed: Decimal
    criticalChance: Decimal
    criticalDamage: Decimal

    skillAmp: Decimal
    cooldownReduction: Decimal

    defense: Decimal

    omnisyphon: Decimal
    lifeSteal: Decimal

    armorPenetration: Decimal
    armorPenetrationRatio: Decimal

    healPower: Decimal
    tenacity: Decimal
    
    movementSpeed: Decimal
    basicAttackRange: Decimal
    visionRange: Decimal
}

type Response = ConfigResponse & { status?: Status }

function sumDecimalEquipmentStatus(key: string, status: EquipmentStatus[]): Decimal {
    return status
        .map(s => (s as {[id: string]: any})[key])
        .filter(v => v != undefined)
        .map(v => v as Decimal)
        .reduce((prev, current) => prev.add(current), new Decimal(0))
}

function maxDecimalEquipmentStatus(key: string, status: EquipmentStatus[]): Decimal {
    return Decimal.max(
        ...status
            .map(s => (s as {[id: string]: any})[key] as Decimal)
            .filter(v => v != undefined)
            .map(v => v!), 
        0
    );
}

export default function(): Response {
    const {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels]
    } = useSubjectConfig();

    const baseStatus = React.useMemo(() => subject ? getBaseStatus(subject) : null, [subject]);

    const masteryFactor = React.useMemo(() => {
        if (!subject || equipment.weapon == null) return undefined;
        const weaponType = equipmentStatus(equipment.weapon).type;
        return mastery(subject).find(m => m.weapon == weaponType)
    }, [subject, equipment.weapon]);

    const status = React.useMemo(() => {
        if (!baseStatus) return undefined;
        const inSlot = Object.values(equipment).filter(v => v != null).map(id => equipmentStatus(id!));
        const perLevel = inSlot.map(s => (s as {[id: string]: any})["perLevelStatus"] as PerLevelStatus).filter(v => v != undefined);
        const perLevelMaxHP = perLevel.filter(s => s.type == "max_hp").reduce((prev, current) => prev.add(current.value), new Decimal(0));
        const perLevelAttack = perLevel.filter(s => s.type == "attack_power").reduce((prev, current) => prev.add(current.value), new Decimal(0));
        const perLevelAAAmp = perLevel.filter(s => s.type == "aa_amp").reduce((prev, current) => prev.add(current.value), new Decimal(0));
        const perLevelSkillAmp = perLevel.filter(s => s.type == "skill_amp").reduce((prev, current) => prev.add(current.value), new Decimal(0));

        const equipBaseAttack = sumDecimalEquipmentStatus("attackPower", inSlot).add(perLevelAttack.times(level));
        const baseAttackPower = baseStatus.attackPower.add(baseStatus.apPerLevel.times(level - 1))
            .add(equipBaseAttack)
            .add(masteryFactor?.type == "attack_power" ? masteryFactor.value.times(weaponMastery) : 0);

        const skillAmpBase = perLevelSkillAmp.times(level).add(sumDecimalEquipmentStatus("skillAmplification", inSlot));
        const skillAmpMultiplier = maxDecimalEquipmentStatus("ampRatio", inSlot)
            .add(masteryFactor?.type == "skill_amp" ? masteryFactor.value.times(weaponMastery) : 0).round();
        const baseSkillAmp = skillAmpBase.times(skillAmpMultiplier.add(100).dividedBy(100));

        const adaptiveStatus = sumDecimalEquipmentStatus("adaptiveStatus", inSlot);
        const addAdaptiveToAttackPower = baseSkillAmp.lessThan(baseAttackPower);

        const attackPower = addAdaptiveToAttackPower ? baseAttackPower.add(adaptiveStatus) : baseAttackPower;
        console.log(skillAmpBase.add(adaptiveStatus.times(2)).toNumber())
        console.log(skillAmpMultiplier.toNumber())
        const skillAmp = (addAdaptiveToAttackPower ? baseSkillAmp : skillAmpBase.add(adaptiveStatus.times(2))).times(skillAmpMultiplier.add(100).dividedBy(100));
        
        const basicAttackAmp = perLevelAAAmp.times(level).add(masteryFactor?.type == "basic_attack_amp" ? masteryFactor.value.times(weaponMastery) : 0);
        const attackSpeed = (() => {
            const weaponTypeID = equipment.weapon ? equipmentStatus(equipment.weapon).type as WeaponTypeID : null
            const base = baseStatus.attackSpeed.add(weaponTypeID ? weaponBaseStatus(weaponTypeID).attackSpeed : 0);
            const multiplier = sumDecimalEquipmentStatus("attackSpeed", inSlot).add(masteryFactor ? masteryFactor.attackSpeed.times(weaponMastery) : 0);
            return base.times(multiplier.add(100)).dividedBy(100);
        })();

        const cooldownReduction = (() => {
            const cap = maxDecimalEquipmentStatus("cdrCap", inSlot).add(30);
            const sum = sumDecimalEquipmentStatus("cooldownReduction", inSlot);
            return sum.clamp(0, cap);
        })();

        const additionalMaxHP = sumDecimalEquipmentStatus("maxHP", inSlot).add(perLevelMaxHP.times(level))
        const additionalAttackPower = addAdaptiveToAttackPower ? (equipBaseAttack.add(adaptiveStatus)) : equipBaseAttack

        return {
            maxHP: baseStatus.maxHP.add(baseStatus.maxHPperLevel.times(level - 1)).add(additionalMaxHP),
            additionalMaxHP,
            maxSP: baseStatus.maxSP.add(baseStatus.maxSPperLevel.times(level - 1)).add(sumDecimalEquipmentStatus("maxSP", inSlot)),
            hpReg: baseStatus.hpRegeneration.add(baseStatus.hpRegenPerLevel.times(level - 1)).add(sumDecimalEquipmentStatus("hpRegeneration", inSlot)),
            spReg: baseStatus.spRegeneration.add(baseStatus.spRegenPerLevel.times(level - 1)).add(sumDecimalEquipmentStatus("spRegeneration", inSlot)),
            attackPower,
            additionalAttackPower,                
            basicAttackAmp,
            attackSpeed,
            criticalChance: sumDecimalEquipmentStatus("criticalChance", inSlot).clamp(0, 100),
            criticalDamage: sumDecimalEquipmentStatus("criticalDamage", inSlot),

            skillAmp,
            cooldownReduction,

            defense: baseStatus.armor.add(baseStatus.armorPerLevel.times(level - 1)).add(sumDecimalEquipmentStatus("defense", inSlot)),

            omnisyphon: sumDecimalEquipmentStatus("omnisyphon", inSlot),
            lifeSteal: sumDecimalEquipmentStatus("lifeSteal", inSlot),
           
            armorPenetration: sumDecimalEquipmentStatus("armorPenetration", inSlot),
            armorPenetrationRatio: sumDecimalEquipmentStatus("armorPenetrationRatio", inSlot),

            healPower: sumDecimalEquipmentStatus("healingPower", inSlot),
            tenacity: maxDecimalEquipmentStatus("tenacity", inSlot),
            
            movementSpeed: baseStatus.movementSpeed.add(sumDecimalEquipmentStatus("movementSpeed", inSlot)).add(new Decimal(movementMastery).times(new Decimal(0.005))),
            basicAttackRange: maxDecimalEquipmentStatus("attackRange", inSlot),
            visionRange: sumDecimalEquipmentStatus("vision", inSlot).add(8.5)
        }
    }, [baseStatus, level, equipment, weaponMastery, movementMastery])

    return {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        status: status ? {
            ...status,
            subject,
            equipment,
            level,
            weaponMastery,
            movementMastery,
            skillLevels
        } : undefined,
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels]
    }
}