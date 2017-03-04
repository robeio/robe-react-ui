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

export default class StoreSample extends ShallowComponent {

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        return (
            <div>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanOne")}
                </span>
                <Highlight className="javascript">{ex1}</Highlight>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanTwo")}
                </span>
                <Highlight className="javascript">{ex2}</Highlight>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanThree")}
                </span>
                <Highlight className="javascript">{ex3}</Highlight>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanFour")}
                </span>
                <Highlight className="javascript">{ex4}</Highlight>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanFive")}
                </span>
                <Highlight className="javascript">{ex5}</Highlight>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanSix")}
                </span>
                <Highlight className="javascript">{ex6}</Highlight>
                <span>
                    {Application.i18n(StoreSample,"store.StoreSample","spanSeven")}
                </span>
                <Highlight className="javascript">{ex7}</Highlight>
            </div>);
    }


}