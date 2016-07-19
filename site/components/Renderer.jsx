import React from "react";
import { Panel, Table } from "react-bootstrap";
import { Maps } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Highlight from "react-highlight";


export default class Renderer extends ShallowComponent {

    static style = {
        borderBottom: "1px solid lightgray",
        marginBottom: "50px"
    }

    json;

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        this.json = this.props.json === undefined ? {} : this.props.json;
        this.state = {
            showCode: false
        };
    }

    render(): Object {
        let highlight = undefined;
        if (this.state.showCode) {
            highlight = (<Highlight className="javascript">
                {this.props.code}
            </Highlight>);
        }
        return (
            <div style={Renderer.style}>
                <h3 id={this.props.header}>{this.props.header}</h3>
                <h6><code>{`<${this.props.header}> `}</code>{this.props.desc}</h6>
                <h4>Examples</h4>
                <Panel>
                    <this.props.sample.default />
                    <a className="pull-right" onClick={this.__toogleCode}>Show Code</a>
                </Panel>
                {highlight}
                <h4>Props</h4>
                {this.__renderPropsTable(this.json.props) }
                <h4>Methods</h4>
                {this.__renderMethodsTable(this.json.methods) }
            </div >);
    }

    __toogleCode = () => {
        this.setState({
            showCode: !this.state.showCode
        });
    }

    __renderPropsTable(data: Object): Array {
        let rows = [];

        Maps.forEach(data, (value: any, key: string) => {
            let type = value.type !== undefined ? value.type.name : "";
            let defaultVal = value.defaultValue !== undefined ? value.defaultValue.value : "";
            rows.push(<tr>
                <td>{key}</td>
                <td>{type}</td>
                <td>{defaultVal}</td>
                <td>{value.required ? "Yes" : "No"}</td>
                <td>{value.description}</td>
            </tr>);
        });

        return (
            <Table responsive striped bordered condensed>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Required</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
    __renderMethodsTable(data: Object): Array {
        let rows = [];

        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            rows.push(<tr>
                <td>{value.name}</td>
                <td>{value.returns.type.name}</td>
                <td>{value.description}</td>
            </tr>);
        }

        return (
            <Table responsive striped bordered condensed>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Returns</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

}
