import * as React from "react";
import Constants from "./constants.json";
import Damage, { FormulaContext } from "../damage";
import style from "./adina.module.styl";
import { Status } from "components/subject/use-status";
import { ValuesProps } from "../values";
import skillDamage from "../skill-damage";
import baseStyle from "components/tooltip/tooltip.module.styl";

const r: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext);
    const moonHeal = (() => {
        if (formula) {
            return <>(ダメージ量の{Constants.E.star}％)</>;
        } else {
            const damage = skillDamage(status, status.skillLevels.E, Constants.E.damage);
            return <>{damage.dividedBy(2).toString()}</>;
        }
    })();
    
    return (
        <>
            <span className={baseStyle.level}>使用効果</span>：
            <span className={baseStyle.emphasis}>水晶玉の予言</span><br />
            水晶玉のスロット(体力バーの下、2番目のスロット)に入った天体を保存した天体と交換し、
            予見された運命を変えます。<br />
            <br />
            <span className={baseStyle.level}>持続効果</span>：
            <span className={baseStyle.emphasis}>コンジャンクション</span>
            の2番目と3番目のスロットに同じ天体が連続して並ぶと、強力なコンジャンクションスキルが使用できます。
            コンジャンクションスキルの一部効果はこのスキルのレベルで強化されます。<br />
            <span className={style.sun}>太陽x2</span>：
            ルミナリー(Q)スキルが強化され、ダメージ量が増加します。<br />
            <span className={style.moon}>月x2</span>：
            トライン・アスペクト(W)スキルが強化され、ダメージ量が増加します。<br />
            <span className={style.star}>星x2</span>：
            ポール・ディグニティ(E)スキルが強化され、持続回復量が増加します。<br />
            <br />
            <br />
            コンジャンクションスキルは<span className={baseStyle.emphasis}>スターゲイザー(P)</span>ごとに一度だけ使用できます。
        </>
    )
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "太陽コンジャンクション - ダメージ量", values: Constants.R.sun_conjunction.base},
        {title: "月コンジャンクション - 1回あたりダメージ量", values: Constants.R.moon_conjunction.base},
        {title: "星コンジャンクション - 1秒あたりの体力回復量", values: Constants.R.star_conjunction.hp.base},
        {title: "星コンジャンクション - 1秒あたりのスタミナ回復量", values: Constants.R.star_conjunction.sp.base}
    ]
}
