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

    render() {

        let highlight = undefined;
        if (this.state.showCode) {
            highlight = (<Highlight className="javascript">
                {this.props.code}
            </Highlight>);
        };
        return (
            <div style={Renderer.style}>
                <h3 id={this.props.header}>{this.props.header}</h3>
                <h6><code>{`<${this.props.header}> `}</code>{this.props.desc}</h6>
                <h5>Examples</h5>
                <Panel>
                    <this.props.sample.default/>
                    <a className="pull-right" onClick={this.__toogleCode}>Show Code</a>
                </Panel>
                {highlight}
                <h5>Props</h5>
                {this.__renderTable(this.json.props) }
            </div >);
    }

    __toogleCode = () => {
        console.log(this.state.showCode);
        this.setState({
            showCode: !this.state.showCode
        });
    }

    __renderTable(data: Object): Array {
        let rows = [];

        Maps.forEach(data, (value: any, key: string) => {
            let type = value.type !== undefined ? value.type.name : "";
            rows.push(<tr>
                <td>{key}</td>
                <td>{type}</td>
                <td>{value.description}</td>
                <td>{value.required ? "Yes" : "No"}</td>
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
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

}
