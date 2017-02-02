import React from "react";
import {
    Well,
    Table
} from "react-bootstrap";
import {
    Application,
    ShallowComponent
} from "robe-react-commons";
import Highlight from "react-highlight";
import ex1 from "./Snippet1.txt";
import ex2 from "./Snippet2.txt";
import ex3 from "./Snippet3.txt";
import ex4 from "./Snippet4.txt";

export default class AjaxRequestSample extends ShallowComponent {

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        return (
            <div>
                <span>
                    {Application.i18n(AjaxRequestSample,"ajaxrequest.AjaxRequestSample","spanOne")}
                </span>
                <Highlight className="javascript">{ex1}</Highlight>
                <span>
                    {Application.i18n(AjaxRequestSample,"ajaxrequest.AjaxRequestSample","spanTwo")}
                </span>
                <Highlight className="javascript">{ex2}</Highlight>
                <span>
                    {Application.i18n(AjaxRequestSample,"ajaxrequest.AjaxRequestSample","spanThree")}
                </span>
                <Highlight className="javascript">{ex3}</Highlight>
                <span>
                   {Application.i18n(AjaxRequestSample,"ajaxrequest.AjaxRequestSample","spanFour")}
                </span>
                <Highlight className="javascript">{ex4}</Highlight>

            </div>);
    }


}