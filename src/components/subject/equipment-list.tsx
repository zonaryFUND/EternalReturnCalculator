import * as React from "react";
import Item from "components/items/item";
import { ArmorTypeID } from "@app/entity/equipment";
import style from "./equipment-list.module.styl";
import { WeaponIDsForType, Weapons } from "@app/entity/weapon-id";
import { Arms, Chests, Heads, Legs } from "@app/entity/armor-id";
import { EquipmentID } from "@app/entity/equipment-id";
import { EquipmentContext, SubjectContext } from "./subject-context";
import { mastery } from "@app/entity/mastery";

type Props = {
    slot: "weapon" | ArmorTypeID
}

const subjectsList: React.FC<Props> = props => {
    const subjectContext = React.useContext(SubjectContext);
    const IDs = React.useMemo(() => {
        switch (props.slot) {
            case "head":    return Heads;
            case "chest":   return Chests;
            case "arm":     return Arms;
            case "leg":     return Legs;
            case "weapon":
                //if (subjectContext?.value == null) return [];
                //return mastery(subjectContext.value).map(m => m.weapon).flatMap(weaponType => WeaponIDsForType(weaponType));
                return Weapons
        }
    }, [props.slot, subjectContext?.value])

    const context = React.useContext(EquipmentContext);
    const onClick = React.useCallback((id: EquipmentID) => {
        context?.setValue(prev => ({...prev, [props.slot]: id}))
    }, [props.slot]);

    return (
        <div className={style.list}>
            <ul>
                {IDs.map(id => (
                    <li key={id} onClick={() => onClick(id)}>
                        <Item slot={props.slot} itemID={id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default subjectsList;