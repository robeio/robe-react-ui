import React from "react";
import { Panel, Table } from "react-bootstrap";
import { Maps } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class Renderer extends ShallowComponent {

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        return (<Panel header={this.props.header} id={this.props.header}>
            <h5>Samples</h5>
            {this.__renderAlternatives(this.props.alternatives) }
            <h5>Code</h5>
            <Panel>Code Area (Will be hidden) </Panel>
            <h5>Props</h5>
            {this.__renderTable(this.props.alternatives[0].component) }
            <h5>State</h5>
            {this.__renderTable(this.props.alternatives[0].component) }

        </Panel>);
    }

    __renderAlternatives(alternatives: Array) {
        let divs = [];
        for (let i = 0; i < alternatives.length; i++) {
            divs.push(alternatives[i].component);
        }
        return divs;
    }

    __renderTable(data: Object) {
        let rows = [];
        Maps.forEach(data.type, (value: any, key: string) => {
            console.log(key, value);
        });
        Maps.forEach(data.type.propTypes, (value: any, key: string) => {
            rows.push(<tr>
                <td>{key}</td>
                <td>-not ready-</td>
                <td>-not ready-</td>
                <td>{value.isRequired === undefined ? "Yes" : "No"}</td>
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
