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
import bindUsage from "./Snippet_bind.txt";
import constructorUsage from "./Snippet_constructor.txt";
import nameUsage from "./Snippet_nameProps.txt";


export default class InputSample extends ShallowComponent {
    render(): Object {
        return (
            <div>
                {Application.i18n(InputSample,"inputs.InputSample","descOne")}
                <ul>
                    <li>{Application.i18n(InputSample,"inputs.InputSample","listItemOne")}</li>
                    <li>{Application.i18n(InputSample,"inputs.InputSample","listItemTwo")}</li>
                    <li>{Application.i18n(InputSample,"inputs.InputSample","listItemThree")}</li>
                </ul>
                <p>
                    <h4>name</h4>
                    {Application.i18n(InputSample,"inputs.InputSample","descTwo")}
                    <p>
                        <Well>{Application.i18n(InputSample,"inputs.InputSample","descSubOne")}</Well>
                        <Highlight className="javascript">{bindUsage}</Highlight>
                        <Well>{Application.i18n(InputSample,"inputs.InputSample","descSubTwo")}</Well>
                        <Highlight className="javascript">{constructorUsage}</Highlight>
                    </p>

                    <Well>
                        {Application.i18n(InputSample,"inputs.InputSample","descSubThree")}
                    </Well>
                    <Highlight className="javascript">{nameUsage}</Highlight>
                </p>
                <p>
                    <h4>value & parsedValue</h4>
                    {Application.i18n(InputSample,"inputs.InputSample","descThree")}
                    <p><code>let value = e.target.parsedValue || e.target.value;</code></p>
                    {Application.i18n(InputSample,"inputs.InputSample","tableTitle")}
                    <Table>
                        <thead>
                            <tr>
                                <th>{Application.i18n(InputSample,"inputs.InputSample","tableHeaderOne")}</th>
                                <th>{Application.i18n(InputSample,"inputs.InputSample","tableHeaderTwo")}</th>
                                <th>{Application.i18n(InputSample,"inputs.InputSample","tableHeaderThree")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>TextInput</td><td>"Name"</td><td>"Name"</td></tr>
                            <tr><td>DecimalInput</td><td>"42.01"</td><td>42.01</td></tr>
                            <tr><td>NumberInput</td><td>"42"</td><td>42</td></tr>
                            <tr><td>MoneyInput</td><td>"123,4756,789.12"</td><td>"1,234,756,789.12"</td></tr>
                            <tr><td>DateInput</td><td>"24/12/1985"</td><td>502232400</td></tr>
                        </tbody>
                    </Table>

                </p>
            </div>
        );
    }
}
