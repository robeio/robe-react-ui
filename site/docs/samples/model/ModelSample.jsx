import React from "react";
import {
    Well,
    Table
} from "react-bootstrap";
import {Application,
    ShallowComponent
} from "robe-react-commons";
import Highlight from "react-highlight";
import ex1 from "./Snippet1.txt";

export default class ModelSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <p>
                    {Application.i18n(ModelSample,"model.ModelSapmle","paragraphOne")}
                </p>
                <p >
                    {Application.i18n(ModelSample,"model.ModelSapmle","paragraphTwo")}
                </p>
                <strong>{Application.i18n(ModelSample,"model.ModelSapmle","typesStrong")}</strong>
                <p>
                    {Application.i18n(ModelSample,"model.ModelSapmle","paragraphThree")}
                </p>
                <Table responsive striped bordered condensed>
                    <thead>
                        <tr>

                            <th>{Application.i18n(ModelSample,"model.ModelSapmle","type")}</th>
                            <th>{Application.i18n(ModelSample,"model.ModelSapmle","component")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>string</td><td>TextInput</td></tr>
                        <tr><td>text</td><td>TextArea</td></tr>
                        <tr><td>number</td><td>NumericInput</td></tr>
                        <tr><td>decimal</td><td>DecimalInput</td></tr>
                        <tr><td>date</td><td>DateInput</td></tr>
                        <tr><td>password</td><td>PasswordInput</td></tr>
                        <tr><td>money</td><td>MoneyInput</td></tr>
                        <tr><td>radio</td><td>RadioInput</td></tr>
                        <tr><td>select</td><td>SelectInput</td></tr>
                        <tr><td>check</td><td>CheckInput</td></tr>
                        <tr><td>html</td><td>HtmlEditor</td></tr>
                        <tr><td>file</td><td>FileUploadInput</td></tr>
                    </tbody>
                </Table>
                <strong>{Application.i18n(ModelSample,"model.ModelSapmle","exampleOne")}</strong>
                <p>{Application.i18n(ModelSample,"model.ModelSapmle","exampleParagraph")}</p>
                <Highlight className="json">{ex1}</Highlight>
                <Well>
                    {Application.i18n(ModelSample,"model.ModelSapmle","exampleDesc")}
                </Well>
            </div>
        );
    }
}

