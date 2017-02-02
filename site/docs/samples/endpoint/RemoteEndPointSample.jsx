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
import ex5 from "./Snippet5.txt";
import ex6 from "./Snippet6.txt";
import ex7 from "./Snippet7.txt";

export default class RemoteEndpointSample extends ShallowComponent {

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        return (
            <div>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanOne")}
                </span>
                <Highlight className="javascript">{ex1}</Highlight>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanTwo")}
                </span>
                <Highlight className="javascript">{ex2}</Highlight>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanThree")}
                </span>
                <Highlight className="javascript">{ex3}</Highlight>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanFour")}
                </span>
                <Highlight className="javascript">{ex4}</Highlight>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanFive")}
                </span>
                <Highlight className="javascript">{ex5}</Highlight>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanSix")}
                </span>
                <Highlight className="javascript">{ex6}</Highlight>
                <span>
                    {Application.i18n(RemoteEndpointSample,"endpoint.RemoteEndPointSample","spanSeven")}
                </span>
                <Highlight className="javascript">{ex7}</Highlight>
            </div>);
    }


}