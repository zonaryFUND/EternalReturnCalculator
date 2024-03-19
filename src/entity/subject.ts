export const Subjects = [
    "jackie", "aya", "hyunwoo" , "magnus" , "fiora" , "nadine" , "zahir" , "hart" , "isol" , "li_dailin" , 
    "yuki" , "hyejin" , "xiukai" , "sissela" , "chiara" , "adriana" , "silvia" , "shoichi" , "emma" , "lenox" ,
    "rozzi" , "luke" , "cathy" , "adela" , "bernice" , "barbara" , "alex" , "sua" , "leon" , "eleven" ,
    "rio" , "william" , "nicky" , "nathapon" , "jan" , "eva" , "daniel" , "jenny" , "camilo" , "chloe" ,
    "johann" , "bianca" , "celine" , "echion" , "mai" , "aiden" , "laura" , "tia" , "felix" , "elena" ,
    "priya" , "adina" , "markus" , "karla" , "estelle" , "piolo" , "martina" , "haze" , "isaac" , "tazia" ,
    "irem" , "theodore" , "ly_anh" , "vanya" , "debi_marlene" , "arda" , "abigail" , "alonso" , "leni" , "tsubame" ,
    "kenneth" , "katja"
];

export type SubjectID = typeof Subjects[number];

import Name from "dict/subject-name.json";

type Language = "jp"

type NameType = {
    jp: string
}

export function name(id: SubjectID, language: Language): string {
    return (Name as {[index: string]: NameType})[id][language]
}