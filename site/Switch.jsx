import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {render} from "react-dom";
import Main from "./Main";
import MyApplication from "robe-react-ui/lib/Application";


export default class Switch extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {
            language: undefined
        };
    }

    render(): Object {
        return (<MyApplication language={this.state.language}><Main changeLanguage={this.__changeLanguage}/></MyApplication>);
    }

    __changeLanguage(language){
        this.setState({language:language});
    }

}




