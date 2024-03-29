import { EquipmentAbility, name } from "@app/entity/equipment-ability";
import * as React from "react";
import style from "./skill.module.styl";

import PrimodalHex from "components/item-skills/primodal-hex";
import Vigor from "components/item-skills/vigor";
import MagneticMidnight from "components/item-skills/magnetic-midnight";
import Smolder from "components/item-skills/smolder";
import LichsGrasp from "components/item-skills/lichs-grasp";
import Zephyr from "components/item-skills/zephyr";
import HealingReduction from "components/item-skills/healing-reduction";
import ChargeCarrier from "components/item-skills/charge-carrier";
import BioticInfusion from "components/item-skills/biotic-infusion";
import InFullBloom from "components/item-skills/in-full-bloom";
import SwiftStrides from "components/item-skills/swift-strides";
import DoubleTap from "components/item-skills/double-tap";
import LastWord from "components/item-skills/last-word";
import LeadShell from "components/item-skills/lead-shell";
import RudraEmbodied from "components/item-skills/rudra-embodied";
import SwiftStridesVF from "components/item-skills/swift-strides-vf";
import VFControlEnhancement from "components/item-skills/vf-control-enhancement";
import BioticInfusionVF from "components/item-skills/biotic-infusion-vf";
import Nerosis from "components/item-skills/necrosis";
import FlameBarrierVF from "components/item-skills/flame-barrier-vf";

import FlameBarrier from "components/item-skills/flame-barrier";
import Reflection from "components/item-skills/reflection";
import Vanguard from "components/item-skills/vanguard";
import Debilitation  from "components/item-skills/debilitation";
import Verdict from "components/item-skills/verdict";
import Encourage from "components/item-skills/encourage";
import Bloodpact from "components/item-skills/bloodpact";
import ElectricShock from "components/item-skills/electric-shock";
import PhotonLauncher from "components/item-skills/photon_launcher";
import Circulation from "components/item-skills/circulation";
import Streamlined from "components/item-skills/streamlined";
import Pulverization from "components/item-skills/pulverization";

const skill: React.FC<EquipmentAbility> = props => {
    const text = (() => {
        switch (props.id) {
            case "primodal_hex": 
                return <PrimodalHex values={props.values} />;
            case "vigor": 
                return <Vigor values={props.values} />;
            case "magnetic_midnight": 
                return <MagneticMidnight values={props.values} />;
            case "smolder": 
                return <Smolder values={props.values} />;
            case "lichs_grasp": 
                return <LichsGrasp values={props.values} />;
            case "zephyr": 
                return <Zephyr values={props.values} />;
            case "healing_reduction_strong":
                return <HealingReduction intensity="strong" />;
            case "healing_reduction_weak":
                return <HealingReduction intensity="weak" />;
            case "charge_carrier":
                return <ChargeCarrier />;
            case "biotic_infusion":
                return <BioticInfusion values={props.values} />;
            case "in_full_bloom":
                return <InFullBloom />;
            case "swift_strides":
                return <SwiftStrides values={props.values} />;
            case "double_tap":
                return <DoubleTap />;
            case "last_word":
                return <LastWord />;
            case "lead_shell":
                return <LeadShell />;
            case "rudra_embodied":
                return <RudraEmbodied values={props.values} />;
            case "swift_strides_vf":
                return <SwiftStridesVF values={props.values} />;
            case "vf_control_enhancement":
                return <VFControlEnhancement />;
            case "biotic_infusion_vf":
                return <BioticInfusionVF values={props.values} />;
            case "necrosis":
                return <Nerosis />;
            case "flame_barrier_vf":
                return <FlameBarrierVF values={props.values} />;
            case "flame_barrier":
                return <FlameBarrier values={props.values} />;
            case "reflection":
                return <Reflection values={props.values} />;
            case "vanguard":
                return <Vanguard />;
            case "debilitation":
                return <Debilitation />;
            case "verdict":
                return <Verdict />;
            case "encourage":
                return <Encourage />;
            case "bloodpact":
                return <Bloodpact />;
            case "electric_shock":
                return <ElectricShock values={props.values} />;
            case "photon_launcher":
                return <PhotonLauncher values={props.values} />;
            case "circulation":
                return <Circulation values={props.values} />;
            case "streamlined":
                return <Streamlined />;
            case "pulverization":
                return <Pulverization />;
            default: return null;
        }
    })();

    return (
        <div className={style.skill}>
            <header>
                <h2>固有装備効果</h2>
            </header>
            <h3>{name(props.id, "jp")}</h3>
            {text}
        </div>
    );
};

export default skill;