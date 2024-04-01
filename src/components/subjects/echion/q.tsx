import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        エキオンが狭い範囲のVFを放出して<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />
        のスキルダメージを与えます。敵にダメージを与えると、次の{Constants.Q.second}秒以内にスキルを再使用することができます。<br />
        <br />
        再使用時：広い範囲のVFを放出して<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />
        のスキルダメージを与え、対象の移動速度を{Constants.Q.slow.duration}秒間{Constants.Q.slow.effect[props.config.skillLevels.Q]}％減少させます。<br />
        <br />
        オーバーロード状態になるとVFが放出されません。<br />
        <br />
        VFゲージ増加量：{Constants.Q.vf_gauge[props.config.skillLevels.Q][0]}, {Constants.Q.vf_gauge[props.config.skillLevels.Q][1]}<br />
        使用時ダメージ増幅量：{new Decimal(props.config.gauge).times(Constants.R.damage_amp_per_vf[props.config.skillLevels.R]).toString()}％
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.Q.first_damage.base},
        {title: "2打ダメージ量", values: Constants.Q.second_damage.base},
        {title: "VFゲージ増加量", values: Constants.Q.vf_gauge.map(v => `${v[0]}, ${v[1]}`)},
        {title: "移動速度減少量(％)", values: Constants.Q.slow.effect, percent: true}
    ]
}