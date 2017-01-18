import React from "react";
import ReactDOM from "react-dom";
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
        this.state = {
            upgrade: false
        };
        let language = Cookies.get("language", props.language);
        this.loadLanguage(language);
    }

    //TODO: Commondaki methodların buradan ulaşılabilmesi.

    render() {
        if (this.state.upgrade) {
            return <span />
        }
        let {language, ...newProps} = this.props;
        return (<div {...newProps}>
            {this.props.children}
        </div>);
    }


    componentWillReceiveProps(props: Object) {
        Cookies.put("language", props.language);
        this.loadLanguage(props.language);
        this.state = {
            upgrade: true
        }
    }

    componentDidUpdate() {
        if (this.state.upgrade) {
            this.setState({
                upgrade: false
            });
        }
    }

    loadLanguage(language: string) {
        if (Assertions.isString(language)) {
            try {
                CA.loadI18n(require(language));
            } catch (error) {
                console.error(error);
                CA.loadI18n(require("./assets/en_US.json"));
            }
        } else {
            CA.loadI18n(language);
        }
    }
}