import React from "react";
import {
    Well
} from "react-bootstrap";
import {
    ShallowComponent
} from "robe-react-commons";
import Highlight from "react-highlight";
import ex1 from "./Snippet1.txt";
import jsonI18n from "./Snippet_i18n.txt";


export default class I18n extends ShallowComponent {

    render(): Object {
        let parameter = "${minValue}"; //eslint-disable-line
        return (
            <div>
                <p>
                    Robe projects supports <code>i18n</code> by a simple api. This page will describe how to use it and give a simple sample.
                    You can translate default texts from the library or define your own texts.
                    First of all create an i18n file. An <code>i18n</code> file is a basic <code>json</code> file with the correct keys.
                    These keys will override the default texts or create a new entry.
                </p>
                <Highlight className="javascript">{jsonI18n}</Highlight>
                <p>So after loading our i18n file to the <code>Application</code> it will be usable.
                From now on you can acces all your texts with <code>Application.i18n(&lt;code&gt;)</code>.
                This will give you a json object which is the same with the provided. </p>
                <Highlight className="javascript">{ex1}</Highlight>
                <p>To use parameterized texts you can define your texts like <code>{parameter}</code> and then it will be replacable by
                 <code>es6-template-strings</code> library.
                </p>
                <Well>
                    <p>As you can see from the code it will first print <code>This field is required.</code></p>
                    <p>Than it will print <code>Value must be greater or equal to 3</code></p>
                </Well>
            </div>
        );
    }
}

