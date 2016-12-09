import React from "react";
import { findDOMNode } from "react-dom";
import ReactQuill from "react-quill";
import { FormGroup, ControlLabel, Col } from "react-bootstrap";
import ValidationComponent from "../../validation/ValidationComponent";
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
        hidden: React.PropTypes.bool,

        /**
        * it specifies that an input field height be auto resize
        */
        autoResize: React.PropTypes.bool,
        /**
       *Defines the display style of the Validation message.
       */
        validationDisplay: React.PropTypes.oneOf(['overlay', 'block'])
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
        validationDisplay: "block"
    };

    static refName = "editor";
    static toolbarRefName = "toolbar";


    render(): Object {
        return super.wrapComponent(
            <FormGroup hidden={this.props.hidden}>
                <ControlLabel><span>{this.props.label}</span></ControlLabel>
                <ReactQuill {...this.props} theme="snow" onChange={this.__onChange}>
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
                </ReactQuill>
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
        const e = {};
        e.target = { name: this.props.name };
        e.target.parsedValue = value;

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
}
