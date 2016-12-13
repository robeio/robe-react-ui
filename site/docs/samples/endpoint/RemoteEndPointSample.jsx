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
import ex8 from "./Snippet8.txt";

export default class RemoteEndPointSample extends ShallowComponent {

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        return (
            <div>
                <span>
                    All settings are optional. A default can be set to an option. The default options are as follows.
                </span>
                <Highlight className="javascript">{ex1}</Highlight>
                <span>
                    Single <code>url</code> with <code>create, read, update, delete</code>.
                </span>
                <Highlight className="javascript">{ex2}</Highlight>
                <span>
                    The <code>url</code> options can be specified for <code>create, read, update, delete</code>.
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
                <span>
                    You can inflate the following example.
                </span>
                <Highlight className="javascript">{ex8}</Highlight>

            </div>);
    }


}