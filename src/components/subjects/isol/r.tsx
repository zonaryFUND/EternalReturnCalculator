import * as React from "react";
import Constants from "./constants.json";
import { Status } from "components/subject/use-status";
import Damage from "../damage";
import { ValuesProps } from "../values";

const r: React.FC<Status> = status => (
    <>
        アイソルがMok製爆弾を設置します。Mok製爆弾は{Constants.R.lifetime}秒間敵を感知でき、
        範囲内に敵が入ると爆発して<Damage skill="R" constants={Constants.R.damage} />のスキルダメージを与えます。<br />
        <br />
        最大{Constants.R.charge.max}個まで保有でき、{Constants.R.max_place}個まで設置することができます。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは「アイソルが設置したトラップ」判定が適用されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "チャージ時間", values: Constants.R.charge.time},
    ]
}