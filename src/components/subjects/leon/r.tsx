import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レオンが阻止不可状態になってダイビングし、指定した水溜りから飛び出ます。水溜りから飛び出る時、周りの敵に<Damage skill="E" constants={Constants.E.damage} {...props} />
            のスキルダメージを与えて敵を{Constants.E.airborne}秒間空中に浮かせます。レオンは水溜りの中に潜り込んでいる時には対象指定不可状態になり、ダイビングする時、両方に水溜りが生成されます。

            レオンが波を召喚します。レオンは波に乗って一緒に前進し、経路上の敵に<Damage skill="R" constants={Constants.R.damage} {...props} />
            のスキルダメージを与え、敵は波が消える瞬間まで押し出されます。波に押し出された敵が壁にぶつかると敵に<Damage skill="R" constants={Constants.R.wall_damage} {...props} />
            のスキルダメージを与えて{Constants.R.airborne}秒間空中に浮かせます。波が消える時、その場に水溜りが生成されます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "衝突ダメージ量", values: Constants.R.wall_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
