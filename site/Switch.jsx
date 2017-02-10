import React from "react";
import { render } from "react-dom";
import Main from "./Main";
import MyApplication from "robe-react-ui/lib/Application";
import Module from "./Module";
import {
    ShallowComponent,
    Cookies
} from "robe-react-commons";


export default class Switch extends ShallowComponent {

    constructor(props) {
        super(props);
        let lang = Cookies.get("language") || "en_US.json";
        this.state = {};
        this.__changeLanguage(lang);
    }

    render(): Object {
        return (<MyApplication language={this.state.language}><Main changeLanguage={this.__changeLanguage} /></MyApplication>);
    }

    __changeLanguage(lang) {
        Module(lang)
            .then(
            (language) => {
                this.setState({ language });
                Cookies.put("language", lang);
            });
    }
}




