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
import ex5 from "./Snippet5.txt";
import ex6 from "./Snippet6.txt";
import ex7 from "./Snippet7.txt";

export default class StoreSample extends ShallowComponent {

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        return (
            <div>
                <span>
                    PropTypes
                </span>
                <Highlight className="javascript">{ex1}</Highlight>
                <span>
                    Default props.
                </span>
                <Highlight className="javascript">{ex2}</Highlight>
                <span>
                    You can perform with same settings for <code>create, read, update, delete</code>.
                </span>
                <Highlight className="javascript">{ex3}</Highlight>
                <span>
                    The <code>create</code> method must be called to perform a the create request.
                </span>
                <Highlight className="javascript">{ex4}</Highlight>
                <span>
                    The <code>read</code> method must be called to perform a the read request.
                </span>
                <Highlight className="javascript">{ex5}</Highlight>
                <span>
                    The <code>update</code> method must be called to perform a the update request.
                </span>
                <Highlight className="javascript">{ex6}</Highlight>
                <span>
                    The <code>delete</code> method must be called to perform a the delete request.
                </span>
                <Highlight className="javascript">{ex7}</Highlight>
            </div>);
    }


}