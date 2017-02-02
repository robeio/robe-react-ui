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

export default class ModelSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <p>
                    You can use models both for representing your data via <code>DataGrid</code> or <code>DataForm</code>. This page will define the usage of the component.
                </p>
                <p >
                    Model is a <code>json</code> representation of our datum. Types, props column names all details will be defined inside of the json.
                    It will need some reserved fields to identify your datum, all remaining fields will be forwarded to your selected component as props.
                    If you look at our examples you can see that models defined as a json file and loaded via <code>import</code>'s.
                </p>
                <strong>Types</strong>
                <p>
                    Model supports various of types which are listed at the table below.
                </p>
                <Table responsive striped bordered condensed>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Component</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>string</td><td>TextInput</td></tr>
                        <tr><td>text</td><td>TextArea</td></tr>
                        <tr><td>number</td><td>NumericInput</td></tr>
                        <tr><td>decimal</td><td>DecimalInput</td></tr>
                        <tr><td>date</td><td>DateInput</td></tr>
                        <tr><td>time</td><td>TimeInput</td></tr>
                        <tr><td>password</td><td>PasswordInput</td></tr>
                        <tr><td>money</td><td>MoneyInput</td></tr>
                        <tr><td>radio</td><td>RadioInput</td></tr>
                        <tr><td>select</td><td>SelectInput</td></tr>
                        <tr><td>check</td><td>CheckInput</td></tr>
                        <tr><td>html</td><td>HtmlEditor</td></tr>
                        <tr><td>file</td><td>FileUploadInput</td></tr>
                    </tbody>
                </Table>
                <strong>Example 1</strong>
                <p>Here you can find an example model below.</p>
                <Highlight className="json">{ex1}</Highlight>
                <Well>
                    It is basicly an array of the fields that you want to see. <code>type</code> is essential to define which component to use.
                    Other fields as <code>name, label, validations...</code> are input component <code>props</code>.
                </Well>
            </div>
        );
    }
}

