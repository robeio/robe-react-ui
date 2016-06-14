import React from "react";
import { ShallowComponent } from "robe-react-commons";
import ReactQuill from "react-quill";
import Col from "react-bootstrap/lib/Col";
import "./quill.snow.css";
import "./style.css";
import Alert from "react-bootstrap/lib/Alert";
import is from "is-js";

export default class HtmlEditor extends ShallowComponent {

    static propTypes = {
        value: React.PropTypes.string,
        min: React.PropTypes.array,
        max: React.PropTypes.array,
        required: React.PropTypes.array,
        height: React.PropTypes.number,
    };


    static defaultProps = {
        height: 100
    };

    valid = false;

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    defaultColors = [
        "rgb(  0,   0,   0)", "rgb(230,   0,   0)", "rgb(255, 153,   0)",
        "rgb(255, 255,   0)", "rgb(  0, 138,   0)", "rgb(  0, 102, 204)",
        "rgb(153,  51, 255)", "rgb(255, 255, 255)", "rgb(250, 204, 204)",
        "rgb(255, 235, 204)", "rgb(255, 255, 204)", "rgb(204, 232, 204)",
        "rgb(204, 224, 245)", "rgb(235, 214, 255)", "rgb(187, 187, 187)",
        "rgb(240, 102, 102)", "rgb(255, 194, 102)", "rgb(255, 255, 102)",
        "rgb(102, 185, 102)", "rgb(102, 163, 224)", "rgb(194, 133, 255)",
        "rgb(136, 136, 136)", "rgb(161,   0,   0)", "rgb(178, 107,   0)",
        "rgb(178, 178,   0)", "rgb(  0,  97,   0)", "rgb(  0,  71, 178)",
        "rgb(107,  36, 178)", "rgb( 68,  68,  68)", "rgb( 92,   0,   0)",
        "rgb(102,  61,   0)", "rgb(102, 102,   0)", "rgb(  0,  55,   0)",
        "rgb(  0,  41, 102)", "rgb( 61,  20,  10)"
    ].map((color) => {
        return { value: color };
    });

    defaultItems = [
        {
            label: "Formats", type: "group",
            items: [
                {
                    label: "Font", type: "font",
                    items: [
                        { label: "Sans Serif", value: "sans-serif", selected: true },
                        { label: "Serif", value: "serif" },
                        { label: "Monospace", value: "monospace" }
                    ]
                },
                { type: "separator" },
                { label: "Size", type: "size",
                    items: [
                        { label: "Small", value: "10px" },
                        { label: "Normal", value: "13px", selected: true },
                        { label: "Large", value: "18px" },
                        { label: "Huge", value: "32px" }
                    ]
                },
                { type: "separator" },
                { label: "Alignment", type: "align",
                    items: [
                        { label: "", value: "left", selected: true },
                        { label: "", value: "center" },
                        { label: "", value: "right" },
                        { label: "", value: "justify" }
                    ]
            }
            ]
        },
        {
            label: "Text", type: "group",
            items: [
                { type: "bold", label: "Bold" },
                { type: "italic", label: "Italic" },
                { type: "strike", label: "Strike" },
                { type: "underline", label: "Underline" },
                { type: "separator" },
                { type: "color", label: "Color", items: this.defaultColors },
                { type: "background", label: "Background color", items: this.defaultColors },
                { type: "separator" },
                { type: "link", label: "Link" }
            ]
        },

        {
            label: "Blocks", type: "group",
            items: [
                { type: "bullet", label: "Bullet" },
                { type: "separator" },
                { type: "list", label: "List" }
            ]
        }
    ];
    render() {
        let quill = (
            <ReactQuill {...this.props} theme="snow" onChange={this.__onChange}>
                <ReactQuill.Toolbar
                    key="toolbar"
                    ref="toolbar"
                    items={this.defaultItems}
                />
                <Col
                    key="editor"
                    ref="editor"
                    style={{ height: this.props.height }}
                    className="quill-contents"
                />
            </ReactQuill>);


        let errors = this.__validate(this.props);
        this.valid = (errors.length === 0);
        if (this.valid) {
            return (
                <Col className="form-group">
                    <Col componentClass="label" className="control-label"><span>{this.props.label}</span></Col>
                    {quill}
                </Col>);
        }
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }

        return (
            <Col className="form-group has-error">
                <Col componentClass="label" className="control-label"><span>{this.props.label}</span></Col>
                {quill}
                <Alert className="input-alert" bsStyle="danger" style={{ marginTop: "5px" }}>{messages}</Alert>
            </Col>
        );
    }

    __onChange = (value) => {
        const e = {};
        e.target = {};
        e.target.parsedValue = value;

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };


    isValid = () => {
        return this.valid;
    };

    __validate = () => {
        const messages = [];
        if (this.props.required) {
            if (!this.props.value || String(this.props.value).length === 0 || String(this.props.value) === "<div><br></div>") {
                messages.push(this.props.required[1]);
            }
        }

        if (this.props.min) {
            if (String(this.props.value).length < this.props.min[0]) {
                messages.push(this.props.min[1]);
            }
        }

        if (this.props.max) {
            if (String(this.props.value).length > this.props.max[0]) {
                messages.push(this.props.max[1]);
            }
        }
        if (this.props.regex) {
            if (String(this.props.value).length > 0) {
                let regex = new RegExp(this.props.regex[0]);
                if (!regex.test(this.props.value)) {
                    messages.push(this.props.regex[1]);
                }
            }
        }
        return messages;
    };

    __propsChecker = (prop) => {
        if (prop && (prop.length !== 2 || !(is.string(prop[0]) || is.number(prop[0]) || is.bool(prop[0]) || is.date(prop[0])) && is.string(prop[1]))) {
            throw new Error("Validation property must be an array of 2 and contain value with message.");
        }
    }
}
