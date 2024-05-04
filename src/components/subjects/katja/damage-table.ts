import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q(最小)", skill: "Q", damage: Constants.Q.min_damage},
            {label: "Q(最大)", skill: "Q", damage: Constants.Q.max_damage}
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R(1発目)", skill: "R", damage: Constants.R.first_damage},
            {label: "R(2発目)", skill: "R", damage: Constants.R.second_damage},
            {label: "R(3発目)", skill: "R", damage: Constants.R.third_damage}
        ]
    ]
}

export default table;