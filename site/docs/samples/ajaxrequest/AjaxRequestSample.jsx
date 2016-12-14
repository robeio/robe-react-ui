import React from "react";
import {
    Well,
    Table
} from "react-bootstrap";
import {
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
                    You can define <code>Ajax Request</code> as follows.
                </span>
                <Highlight className="javascript">{ex1}</Highlight>
                <span>
                    All settings are optional. A default can be set to an option. The default options are as follows.
                </span>
                <Highlight className="javascript">{ex2}</Highlight>
                <span>
                    The <code>call</code> method must be called to perform a request.
                </span>
                <Highlight className="javascript">{ex3}</Highlight>
                <span>
                    You can inflate the following <code>example</code>.
                </span>
                <Highlight className="javascript">{ex4}</Highlight>

            </div>);
    }


}