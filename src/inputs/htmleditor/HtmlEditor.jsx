import React from "react";
import ValidationComponent from "../../validation/ValidationComponent";
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
        height: React.PropTypes.number,
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,
        /**
         * it specifies that an input field is read-only
         */
        readOnly: React.PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        height: 100,
        disabled: false,
        readOnly: false,
        hidden: false
    };
    /**
     * Creates an instance of TextInput.
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        this.__onChange = this.__onChange.bind(this);
    }

    render(): Object {
        return (
            <Col className="form-group" hidden={this.props.hidden}>
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
