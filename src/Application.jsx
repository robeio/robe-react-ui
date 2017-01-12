import React from "react";
import { render } from "react-dom";
import {
    ShallowComponent,
    Assertions,
    Cookies
} from "robe-react-commons";

import CA from "robe-react-commons/lib/application/Application";

export default class Application extends ShallowComponent {

    /**
     * PropTypes of the component
     * @static
     */
    static propTypes: Map = {
        language: React.PropTypes.string
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        language: "./assets/en_US.json"
    };


    constructor(props: Object) {
        super(props);
        let language = Cookies.get("language", "./assets/en_US.json");
        if (Assertions.isString(language)) {
            CA.loadI18n(require(language));
        } else {
            CA.loadI18n(language);
        }

    }
    render() {
        let {language, ...newProps} = this.props;
        return (<div {...newProps}>
            {this.props.children}
        </div>);
    }


    componentWillReceiveProps(props: Object) {
        Cookies.put("language", props.language);
        window.location.reload();
    }
}