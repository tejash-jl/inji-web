import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ta from '../locales/ta.json';
import hi from '../locales/hi.json';
import kn from '../locales/kn.json';
import ar from '../locales/ar.json';
import es from '../locales/es.json';
import si from '../locales/si.json';
import {storage} from "./storage";
import {DisplayArrayObject, LanguageObject} from "../types/data";

const resources = {en, ta, kn, hi, fr, ar, es,si};

export const LanguagesSupported: LanguageObject[] = [
    {label: "English", value: 'en'},
    {label: "Spanish", value: 'es'},
    {label: "Colombo", value: 'si'}
]

export const defaultLanguage = window._env_.DEFAULT_LANG;

const selected_language = storage.getItem(storage.SELECTED_LANGUAGE);
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: selected_language ? selected_language : defaultLanguage,
        fallbackLng: defaultLanguage,
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export const switchLanguage = async (language: string) => {
    storage.setItem(storage.SELECTED_LANGUAGE, language);
    await i18n.changeLanguage(language);
}
export const getObjectForCurrentLanguage = (displayArray: DisplayArrayObject[], language: string = i18n.language) => {
    let resp = displayArray.filter(displayObj => (displayObj.language === language || displayObj.locale === language))[0];
    if (!resp) {
        resp = displayArray.filter(displayObj => (displayObj.language === defaultLanguage || displayObj.locale === defaultLanguage))[0];
    }
    return resp;
}

export const getDirCurrentLanguage = (language: string) => {
    return isRTL(language) ? 'rtl' : 'ltr';
}

export const isRTL = (language:string) => {
    return language === 'ar';
}
