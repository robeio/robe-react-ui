import React from "react";
import {
    Well,
    Table
} from "react-bootstrap";
import {
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
                First of all "Why a document like this ?" because we have 3 important things to explain about <code>onChange</code>.
                <ul>
                    <li><strong>name</strong> field of the event</li>
                    <li><strong>value</strong> field of the event</li>
                    <li><strong>parsedValue</strong> field of the event</li>
                </ul>
                <p>
                    <h4>name</h4>
                    This is a field setted for performance in mind. Every input field sets <code>name</code> prop (from component props) to <code>onChange</code> events. <code>DataForm</code> does this automatically by using <code>name</code> field of the model json.
                    <p>
                        <Well>If developer wants a single change method, he/she should bind the method to all input fields in constructor/render in order to identify the source of the change event.</Well>
                        <Highlight className="javascript">{bindUsage}</Highlight>
                        <Well>As you see <code>this.onChange.bind(undefined, "TextInput1")</code> brings a runtime overhead. This could also be done at <code>constructor</code> it is better but not enough</Well>
                        <Highlight className="javascript">{constructorUsage}</Highlight>
                    </p>

                    <Well>
                        So, by assigning <code>name</code> prop we can write the best solution. All written input fields will forward this property to the event. It will be accessible via <code>e.target.name</code>.
                    </Well>
                    <Highlight className="javascript">{nameUsage}</Highlight>
                </p>
                <p>
                    <h4>value & parsedValue</h4>
                    This field always carrries the string representation of the inputs value. That's why we usually get the value by
                    <code>let value = e.target.parsedValue || e.target.value;</code>
                    For a quick example please take a look at following table.
                    <Table>
                        <thead>
                            <tr>
                                <th>Component</th>
                                <th>value</th>
                                <th>parsedValue</th>
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
