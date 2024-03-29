import * as React from "react";
import Constants from "./constants.json";
import Damage, { FormulaContext } from "../damage";
import style from "./adina.module.styl";
import { Status } from "components/subject/use-status";
import { ValuesProps } from "../values";
import skillDamage from "../skill-damage";
import baseStyle from "components/tooltip/tooltip.module.styl";

const e: React.FC<Status> = status => {
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
            敵または味方に天体をつけ、敵には<Damage skill="E" constants={Constants.E.damage} />
            のスキルダメージを与えます。天体はしばらくして落下し、円形範囲の敵に
            <Damage skill="E" constants={Constants.E.drop_damage} />のスキルダメージを与えます。<br />
            <br />
            <span className={baseStyle.emphasis}>天体追加効果</span><br />
            <span className={style.sun}>太陽</span>：それぞれのダメージ量が<Damage skill="E" constants={Constants.E.sun} />
            増加します。<br />
            <span className={style.moon}>月</span>：範囲内の敵を{Constants.E.moon}秒間気絶させます。<br />
            <span className={style.star}>星</span>：素早く落下し、味方にはダメージの代わりに体力を
            <span className={baseStyle.emphasis}>{moonHeal}</span>回復させます。<br />
            <br />
            <span className={style.star}>星コンジャンクション効果</span>：
            星が連続になると、落下した星が{Constants.E.conjunction}秒間星雲を残し、
            毎秒味方の体力を<Damage skill="R" constants={Constants.R.star_conjunction.hp} />、
            スタミナを<Damage skill="R" constants={Constants.R.star_conjunction.sp} />ずつ回復させます。
        </>
    )
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.E.damage.base},
        {title: "落下ダメージ量", values: Constants.E.drop_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
