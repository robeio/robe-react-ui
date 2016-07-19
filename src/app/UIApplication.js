import Application from "robe-react-commons/lib/application/Application";
import messages from "./messages";

class UIApplication {
    constructor() {
        this.loadI18n(messages);
    }
    /**
     * Sets base url path to the application properties.
     * @param {string} url to set.
     */
    setBaseUrlPath = (value: string) => {
        Application.setBaseUrlPath(value);
    }
    /**
     * Returns base url from the application properties.
     * @return {string} base url
     */
    getBaseUrlPath = (): string => {
        return Application.getBaseUrlPath();
    }
    /**
     * Concats the given path with the base url. Handles all slash characters.
     * @param {string} url to concat.
     * @return {string} final url. Returns the given input if it is a url.
     */
    loadI18n = (messagesMap: Map) => {
        Application.loadI18n(messagesMap);
    }
    setI18n = (code: string, value: string) => {
        Application.setI18n(code, value);
    }
    i18n = (code: string): any => {
        return Application.i18n(code);
    }
}

export default new UIApplication();
