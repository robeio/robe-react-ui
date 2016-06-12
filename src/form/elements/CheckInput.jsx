import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import "form/elements/style.css";

class CheckInput extends ShallowComponent {
    static propTypes = {
        label: React.PropTypes.string,
        textValue: React.PropTypes.string,
        value: React.PropTypes.bool.isRequired,
        onChange: React.PropTypes.func
    };


    static defaultProps = {
        disabled: false
    };

    checked = this.props.value;

    constructor(props) {
        super(props);
    };


    render() {
        let icon = this.props.value === true ? " state-icon fa fa-check-circle-o" : " state-icon fa fa-circle-o";
        let disabled = this.props.disabled ? "checkbox disabled-check-input" : "checkbox ";

        return (
            <Col className={disabled} onClick={this.__parse.bind(this)}>
                <label style={{paddingLeft:"2px"}}>
                    <span className={icon} style={{marginRight:"10px"}}/>
                    {this.props.label}</label>
            </Col>
        );

    };

    isChecked = ()=> {
        return this.checked;
    };


    __parse = (e)=> {
        if (this.props.onChange) {
            e.target.parsedValue = !this.props.value;
            e.target.value = this.props.textValue;
            this.props.onChange(e);
            this.checked = !this.checked;
        }
    };

}

module.exports = CheckInput;