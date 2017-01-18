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
import ex2 from "./Snippet2.txt";


export default class I18n extends ShallowComponent {

    render(): Object {
        let parameter = "${minValue}"; //eslint-disable-line
        return (
            <div>
                <p>
                    Robe projects supports <code>i18n</code> by a simple api. This page will describe how to use it and give a simple sample.
                    You can translate default texts from the library or define your own texts.
                    First of all create an i18n file. An <code>i18n</code> file is a basic <code>json</code> file with the correct keys.
                    These keys will override the default texts or create a new entry. There are <strong>2</strong> types of usage.
                </p>

                <Highlight className="javascript">{jsonI18n}</Highlight>

                <h4>1. <code>robe-react-commons/lib/application/Application</code></h4>
                <p>This is the core usage of the api. So after loading our i18n file to the <code>Application</code> it will be usable.
                From now on you can acces all your texts with <code>Application.i18n(&lt;Class&gt;,&lt;code&gt;...)</code>.
                This will give you a string.
                If you are using i18n at the defaultProps of a class you should always give <code>Class</code> and <code>codes</code> must have same structure and naming with the defaultProps</p>
                <Highlight className="javascript">{ex1}</Highlight>
                <p>To use parameterized texts you can define your texts like <code>{parameter}</code> and then it will be replacable by
                 <code>es6-template-strings</code> library.
                </p>
                <Well>
                    <p>As you can see from the code it will first print <code>This field is required.</code></p>
                    <p>Than it will print <code>Value must be greater or equal to 3</code></p>
                </Well>

                <h4>2. <code>robe-react-ui/lib/Application</code></h4>
                <p>This is the easy way to use the api.
                If you wrap your Outermost component with <code>&lt;Application language=...&gt;</code> language will be available via <code>language</code> prop.
                This props will be stored at the cookies in case of page refresh.
                When you change the prop it will cause a series of operations.</p>
                <ol>
                    <li>It will accept both JSON or path.</li>
                    <li>It will load the data and set it to the Application from commons.</li>
                    <li>All defaultProps of the components will be scanned and replaced.</li>
                    <li><code>Application</code> will remount itself to make changes visible.</li>
                </ol>
                <p>From now on you can acces all your texts with <code>Application.i18n(&lt;Class&gt;,&lt;code&gt;...)</code>.
                This will give you a string.</p>
                <Highlight className="javascript">{ex2}</Highlight>
            </div >
        );
    }
}

