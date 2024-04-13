import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フェリックスが槍で強く突いて直線範囲に<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えます。3回目の連携で使用する時には他の効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>3回目の連携</span>：<Damage skill="W" constants={Constants.W.enhanced_damage} {...props} />のスキルダメージを与え、近くの対象を
            {Constants.W.bind}秒間束縛させた後、突進します。また、消耗した<span className={style.emphasis}>連携攻撃</span>の1スタックごとに束縛時間が{Constants.W.stack_bind_extend}％増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "3回目の連携ダメージ量", values: Constants.W.enhanced_damage.base}
    ]
}
