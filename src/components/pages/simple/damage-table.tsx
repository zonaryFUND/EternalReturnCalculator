import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttack from "components/pages/simple/basic-attack";
import style from "./damage-table.module.styl";
import { SubjectDamageTable } from "components/subjects/damage-table";
import { SubjectConfig } from "components/subject/use-subject-config";
import SkillDamage from "./skill-damage";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { WeaponTypeID } from "@app/entity/equipment";

type Props = {
    status: Status
    config: SubjectConfig
    weaponType?: WeaponTypeID
}

const damageTable: React.FC<Props> = props => {
    const definition = React.useMemo(() => {
        const raw = SubjectDamageTable[props.config.subject];
        if (typeof raw === "object") {
            return raw;
        } else {
            return raw({
                status: props.status, 
                skillLevels: props.config.skillLevels, 
                weaponType: props.weaponType, 
                weapon: props.config.equipment.weapon ?? undefined,
                gauge: props.config.gauge
            });
        }
    }, [props.config.subject, props.status, props.config.skillLevels, props.weaponType]);

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack status={props.status} config={props.config} table={definition!} weaponType={props.weaponType} />
                    <tbody>
                        <tr className={table.separator}><td colSpan={3}>実験体スキル</td><td>ダメージ / 効果量</td></tr>
                        {
                            definition?.skill.map((array, index) => 
                                <React.Fragment key={index}>
                                {
                                    index == 0 ? null :
                                    <tr className={table.border}><td colSpan={4}></td></tr>
                                }
                                {
                                    array.map(s => {
                                        if (s.type == "critical") {
                                            const level = (props.config.skillLevels as any)[s.skill];
                                            const sanitizedDict = Object.fromEntries(
                                                Object.entries(s.damage).map(([key, value]) => {
                                                    return [key, Array.isArray(value) ? value[level] : value]
                                                })
                                            );
                                            const multiplier = s.multiplier ?
                                                (Array.isArray(s.multiplier) ? s.multiplier[level] : s.multiplier) :
                                                undefined
                                            return <BasicAttackDamage name={s.label} status={props.status} config={sanitizedDict} multiplier={multiplier} />;
                                        }
                                        
                                        return <SkillDamage key={s.label} status={props.status} config={props.config} {...s} />
                                    })
                                }
                                </React.Fragment>
                            )
                    }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td colSpan={3}>武器スキル</td><td>ダメージ / 効果量</td></tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default damageTable;
