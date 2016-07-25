import React from "react";
import { Button, Panel, Table } from "react-bootstrap";
import { Maps } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Highlight from "react-highlight";


export default class Renderer extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Component name
         */
        header: React.PropTypes.string,
        /**
         * Component description
         */
        desc: React.PropTypes.string,
        /**
         *
         */
        alternatives: React.PropTypes.object,
        /**
         * Component Props Json
         */
        json: React.PropTypes.object,
        /**
         * Component Sample Code Object
         */
        sample: React.PropTypes.object,
        /**
         * Component Sample Code string
         */
        code: React.PropTypes.string
    };

    static defaultProps = {
        json: {}
    };
    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
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
            <div>
                <h3>{this.props.header}</h3>
                <h6><code>{`<${this.props.header}> `}</code>{this.props.desc}</h6>
                <h4>Examples</h4>
                <Panel>
                    <this.props.sample.default />
                    {highlight}
                    <Button bsStyle="link" bsSize="xsmall" className="pull-right" onClick={this.__toogleCode}>{(this.state.showCode ? "Hide" : "Show") + " Code"}</Button>
                </Panel>
                <h4>Props</h4>
                {this.__renderPropsTable(this.props.json.props)}
                <h4>Methods</h4>
                {this.__renderMethodsTable(this.props.json.methods)}
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
            if (value.name.indexOf("__") === 0) {
                continue;
            }
            rows.push(<tr>
                <td>{value.name}</td>
                <td>{value.returns ? value.returns.type.name : ""}</td>
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
