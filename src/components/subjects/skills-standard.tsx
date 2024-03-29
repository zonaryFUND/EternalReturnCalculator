import * as React from "react";
import style from "./skills-standard.modue.styl";
import { SubjectID } from "@app/entity/subject";
import Images from "@app/resources/image";

export type SkillImage = (skillID: string) => string | undefined;

type Props = {
    id: SubjectID
    skillImage?: SkillImage 
}

const Skill: React.FC<{id: SubjectID, skill: "Q" | "W" | "E" | "R" | "T", skillImage?: SkillImage}> = props => {
    const src = (() => {
        const standard = Images.skill[props.id][props.skill];
        return props.skillImage ? (props.skillImage(props.skill) || standard) : standard 
    })();

    return (
        <li
            data-tooltip-id="subject-skill" 
            data-tooltip-content={`${props.id}-${props.skill}`}
        >
            <img src={src} />
        </li>
    );
}

const skillsStandard: React.FC<Props> = props => {
    return (
        <ul className={style.skills}>
            <Skill id={props.id} skill="Q" skillImage={props.skillImage} />
            <Skill id={props.id} skill="W" skillImage={props.skillImage} />
            <Skill id={props.id} skill="E" skillImage={props.skillImage} />
            <Skill id={props.id} skill="R" skillImage={props.skillImage} />
            <Skill id={props.id} skill="T" skillImage={props.skillImage} />
        </ul>
    )
}

export default skillsStandard;
