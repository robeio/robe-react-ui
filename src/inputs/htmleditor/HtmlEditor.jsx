import React from "react";
import ValidationComponent from "validation/ValidationComponent";
import ReactQuill from "react-quill";
import Col from "react-bootstrap/lib/Col";
import "./quill.snow.css";
import "./HtmlEditor.css";
import HtmlEditorItems from "./HtmlEditorItems.json";

export default class HtmlEditor extends ValidationComponent {

    /**
    * PropTypes of the component
    * @static
    */
    static propTypes: Map = {
        /**
         * Style map for the component.
         */
        style: React.PropTypes.object,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.string,
        /**
         * handleChange event for the component
         */
        handleChange: React.PropTypes.func,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,
        /**
         * Height of the component.
         */
        height: React.PropTypes.number
    };

    static defaultProps = {
        height: 100
    };

    render(): Object {
        return (
            <Col className="form-group">
                <Col componentClass="label" className="control-label"><span>{this.props.label}</span></Col>
                <ReactQuill {...this.props} theme="snow" onChange={this.__onChange}>
                    <ReactQuill.Toolbar
                        key="toolbar"
                        ref="toolbar"
                        items={HtmlEditorItems}
                    />
                    <Col
                        key="editor"
                        ref="editor"
                        style={{ height: this.props.height }}
                        className="quill-contents"
                    />
                </ReactQuill>
                {super.validationResult()}

            </Col>
        );
    }

    __onChange = (value: string) => {
        const e = {};
        e.target = {};
        e.target.parsedValue = value;

        if (this.props.handleChange) {
            this.props.handleChange(e);
        }
    };
}
