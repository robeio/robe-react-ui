import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import ReactQuill from "react-quill";
import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";
import ValidationComponent from "../../validation/ValidationComponent";
import "./quill.snow.css";
import "./HtmlEditor.css";
import HtmlEditorItems from "./HtmlEditorItems.json";
import Input from "../BaseInput";
import FaIcon from "../../faicon/FaIcon";


export default class HtmlEditor extends ValidationComponent {

    /**
     * PropTypes of the component
     * @static
     */
    static propTypes: Map = {
        /**
         * Style map for the component.
         */
        style: PropTypes.object,
        /**
         * Label for the form control.
         */
        label: PropTypes.string,
        /**
         * Value of the component
         */
        value: PropTypes.string,
        /**
         * handleChange event for the component
         */
        handleChange: PropTypes.func,
        /**
         * Validations for the component
         */
        validations: PropTypes.object,
        /**
         * Height of the component.
         */
        height: PropTypes.number,
        /**
         * Disable input
         */
        disabled: PropTypes.bool,
        /**
         * it specifies that an input field is read-only
         */
        readOnly: PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: PropTypes.bool,

        /**
        * it specifies that an input field height be auto resize
        */
        autoResize: PropTypes.bool,
        /**
       *Defines the display style of the Validation message.
       */
        validationDisplay: PropTypes.oneOf(["overlay", "block"]),

        /**
         *Defines the view mode of the editor.
         */
        sourceView: PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        height: 100,
        disabled: false,
        readOnly: false,
        hidden: false,
        autoResize: false,
        validationDisplay: "block",
        sourceView: false
    };

    static refName = "editor";
    static toolbarRefName = "toolbar";

    quill;
    innerComponent;

    constructor(props) {
        super(props);
        this.state = {
            sourceView: this.props.sourceView
        }
    }

    render(): Object {
        let { tooltip, inputGroupLeft, inputGroupRight, validations, validationDisplay,sourceView,autoResize, ...newProps } = this.props; // eslint-disable-line no-unused-vars

        let editor = this.state.sourceView ?
            (<div className="quill">
                <div style={{ minHeight: "41px", color: "#0063CF",}} className="quill-toolbar ql-toolbar ql-snow">
                    <span className="ql-format-button ql-source pull-right">
                    </span>
                </div>
                <FormControl
                    {...newProps}
                    ref={(component: Object) => { this.innerComponent = component } }
                    className="quill-transparent-editor"
                    label={undefined}
                    onChange={this.__onChange}
                    type="textarea"
                    style={{ height: this.props.height, minHeight: this.props.height }}
                    onKeyUp={this.props.autoResize ? this.__resize : undefined}
                    componentClass="textarea"
                    />
            </div>) :
            (<ReactQuill {...this.props} theme="snow" onChange={this.__onChange} ref={(component) => this.quill = component}>
                <ReactQuill.Toolbar
                    key="toolbar"
                    ref={HtmlEditor.toolbarRefName}
                    items={HtmlEditorItems}
                    />
                <Col
                    key="editor"
                    ref={HtmlEditor.refName}
                    onKeyUp={this.props.autoResize ? this.__resize : undefined}
                    style={{ height: this.props.height, minHeight: this.props.height }}
                    className="quill-contents"
                    />
            </ReactQuill>);
        return super.wrapComponent(
            <FormGroup hidden={this.props.hidden}>
                <ControlLabel><span>{this.props.label}</span></ControlLabel>
                {editor}
            </FormGroup>
        );
    }

    __resize() {
        let element = findDOMNode(this).children[1].children[1];
        if (element) {
            let height = element.scrollHeight;
            let propHeight = this.props.height;

            if (height > propHeight) {
                element.style.height = "auto";
            } else {
                element.style.height = `${propHeight}px`;
            }
            element.style.overflow = "hidden";
            element.style.maxHeight = `${height}px`;
        }
    }

    __onChange(value: string) {
        if (this.state.sourceView) {
            let e = value;
            let result = true;
            if (this.props.onChange) {
                result = this.props.onChange(e);
            }
            if (!result) {
                e.preventDefault();
                e.stopPropagation();
            }
            return result;
        } else {
            const e = {};
            e.target = { name: this.props.name };
            e.target.parsedValue = value;

            if (this.props.onChange) {
                this.props.onChange(e);
            }
        }
    }

    componentDidUpdate() {
        let parent = findDOMNode(this);
        let srcBtn = parent.getElementsByClassName("ql-source")[0];
        srcBtn.addEventListener("click", this.__onSourceClick);
    }

    __onSourceClick(e) {
        this.setState({
            sourceView: !this.state.sourceView,
        });
    }
}
