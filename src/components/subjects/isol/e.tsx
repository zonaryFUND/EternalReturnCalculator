import * as React from "react";
import Constants from "./constants.json";
import { Status } from "components/subject/use-status";
import Damage from "../damage";
import { ValuesProps } from "../values";

const e: React.FC<Status> = status => (
    <>
        アイソルが前転しながら移動します。
        移動後{Constants.E.hide_duration[status.skillLevels.E]}秒間隠密状態になります。移動以外の行動をすると隠密状態が解除されます。
        {Constants.E.attack_duration}秒間1回目の基本攻撃ダメージは
        <Damage skill="E" constants={Constants.E.damage} />のスキルダメージを追加で与えます。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "隠密時間", values: Constants.E.hide_duration},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}