import React from "react";
import {Button, ButtonGroup, Panel, Table, Collapse} from "react-bootstrap";
import { Maps,Application } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Highlight from "react-highlight";
import Progress from "progress/Progress";
import FaIcon from "faicon/FaIcon";
import Toast from "toast/Toast";



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

    static clipboardStyle = {
        position: "absolute",
        display: "inline-table",
        marginTop: 5,
        opacity: 0.6,
        right: 36
    };

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        this.state = {
            showCode: false
        };
    }

    render():Object {
        let highlight = (
            <Collapse in={this.state.showCode}>
                <div>
                    <div className="pull-right">
                        <ButtonGroup
                            style={Renderer.clipboardStyle}>
                            <Button
                                bsSize="xsmall"
                                onClick={this.__copyToClipboard}>
                                <FaIcon code="fa-clipboard"/>
                            </Button>
                            <Button
                                bsSize="xsmall"
                                onClick={this.__copyToClipboard}>
                                <FaIcon code="fa-file-text-o"/>
                            </Button>
                            <Button
                                bsSize="xsmall"
                                onClick={this.__copyToClipboard}>
                                <FaIcon code="fa-download"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <Highlight className="javascript">
                        {this.props.code}
                    </Highlight>
                </div>
            </Collapse>
        );

        let codeSection = this.props.code ?
            (<div>
                {highlight}
                <Button bsStyle="link" bsSize="xsmall" className="pull-right"
                        onClick={this.__toogleCode}>{(this.state.showCode ? "Hide" : "Show") + " Code"}</Button>
            </div>) : undefined;
        return (
            <div>
                <h3>{this.props.header}</h3>
                <h5><code>{`<${this.props.header}>`}</code> {this.props.desc}</h5>
                <h4>{Application.i18n(Renderer, "components.Renderer", "example")}</h4>
                <Panel>
                    <this.props.sample.default />
                    {codeSection}
                </Panel>
                <h4>{this.props.json.props ? Application.i18n(Renderer, "components.Renderer", "propsBlockHeader") : ""}</h4>
                {this.__renderPropsTable(this.props.json.props)}
                <h4>{this.props.json.methods ? Application.i18n(Renderer, "components.Renderer", "methodBlockHeader") : ""}</h4>
                {this.__renderPropsTable(this.props.json.props)}
            </div >);
    }

    __toogleCode() {
        this.setState({
            showCode: !this.state.showCode
        });
    }

    __copyToClipboard() {
        let textField = document.createElement('textarea');
        textField.innerHTML = this.props.code;

        document.body.appendChild(textField);

        let range = document.createRange();
        range.selectNode(textField);
        textField.select();

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        try {
            document.execCommand('copy');
            Toast.success("Copy successful.")
        } catch (err) {
            console.log("Oops, unable to copy");
        }
        document.body.removeChild(textField);
    }

    __renderPropsTable(data:Object):Array {
        if (data === undefined) {
            return undefined;
        }

        let rows = [];

        Maps.forEach(data, (value:any, key:string) => {
            let type = value.type !== undefined ? value.type.name : "";
            let defaultVal = value.defaultValue !== undefined ? value.defaultValue.value : "";
            rows.push(<tr key={key}>
                <td>{key}</td>
                <td>{type}</td>
                <td>{defaultVal}</td>
                <td>{value.required ? "Yes" : "No"}</td>
                <td>{value.description}</td>
            </tr>);
        });


        if (rows.length <= 0) {
            return undefined;
        }

        return (
            <div>
                <h4>{this.props.json.props ? "Props" : ""}</h4>
                <Table responsive striped bordered condensed>
                    <thead>
                    <tr>
                        <th>{Application.i18n(Renderer, "components.Renderer", "propsTableFieldOne")}</th>
                        <th>{Application.i18n(Renderer, "components.Renderer", "propsTableFieldTwo")}</th>
                        <th>{Application.i18n(Renderer, "components.Renderer", "propsTableFieldThree")}</th>
                        <th>{Application.i18n(Renderer, "components.Renderer", "propsTableFieldFour")}</th>
                        <th>{Application.i18n(Renderer, "components.Renderer", "propsTableFieldFive")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            </div>
        );
    }

    __renderMethodsTable(data:Object):Array {
        if (data === undefined) {
            return undefined;
        }
        let rows = [];

        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            if (value.name.indexOf("__") === 0) {
                continue;
            }
            rows.push(<tr key={value.name}>
                <td>{value.name}</td>
                <td>{value.returns ? value.returns.type.name : ""}</td>
                <td>{value.description}</td>
            </tr>);
        }

        if (rows.length <= 0) {
            return undefined;
        }

        return (
            <div>
                <h4>{this.props.json.methods ? "Methods" : ""}</h4>
                <Table responsive striped bordered condensed>
                    <thead>
                    <tr>
                        <th>{Application.i18n(Renderer, "components.Renderer", "methodsTableFieldOne")}</th>
                        <th>{Application.i18n(Renderer, "components.Renderer", "methodsTableFieldTwo")}</th>
                        <th>{Application.i18n(Renderer, "components.Renderer", "methodsTableFieldThree")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            </div>
        );
    }

    componentDidUpdate() {
        Progress.done();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({showCode: false})
    }
}
