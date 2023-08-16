import {TRANSLATES} from "../translates/ru";

export const translate = (category: string, message: string): string => {
    // @ts-ignore
    return TRANSLATES[category][message]
}