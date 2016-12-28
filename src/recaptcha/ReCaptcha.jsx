import React, { PropTypes } from "react";
import { ShallowComponent } from "robe-react-commons";
import Recaptcha from "react-recaptcha/dist/react-recaptcha";

export default class ReCaptcha extends ShallowComponent {

    static LANGUAGE_MAP = new Map();/* make global load every language only once time */
    static URL = "https://www.google.com/recaptcha/api.js";
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        ...Recaptcha.PropTypes,
        lang: PropTypes.string,
    };

    static defaultProps = {
        ...Recaptcha.defaultProps,
        lang: "en"
    };

    render(): Object {
        let { lang, ...props } = this.props;// eslint-disable-line no-unused-vars
        return (<Recaptcha {...props} />);
    }

    componentWillMount() {
        /**
         * make this to static load only once time
         */

        let lang = this.props.lang;
        let isLoaded = ReCaptcha.LANGUAGE_MAP.get(lang);

        if (!isLoaded) {
            ReCaptcha.LANGUAGE_MAP.set(lang, true);
            const script = document.createElement("script");
            script.src = `${ReCaptcha.URL}?hl=${lang}`;
            script.async = true;
            /**
             * handle on error
             */
            /*
                script.onerror = () => {
                    let mapEntry = this.LANGUAGE_MAP.get(lang);
                    mapEntry.errored = true;
                };
                script.onload = () => {
                    let mapEntry = this.LANGUAGE_MAP.get(lang);
                    mapEntry.loaded = true;
                };
            */
            document.body.appendChild(script);
        }
    }
}
