import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンが指定した位置に吸霊符を召喚します。吸霊符の範囲内の敵は移動速度が{Constants.W.slow}％減少します。吸霊符は
            {Constants.W.launch}秒後に発動され、敵に<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えて中央に引き寄せます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
