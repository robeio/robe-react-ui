import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";

class RadioInput extends ShallowComponent {
    static propTypes = {
        data: React.PropTypes.array,
        dataTextField: React.PropTypes.string,
        dataValueField: React.PropTypes.string,
        label: React.PropTypes.string,
        value: React.PropTypes.any,
    };


    static defaultProps = {
        disabled: false
    };

    valid = false;
    selectedItem = undefined;

    constructor(props) {
        super(props);
    };


    render() {

        if (this.props.label)
            return (<Col className="form-group">
                <label className="control-label">{this.props.label}</label>
                {this.__createRadios(this.props.data)}
            </Col>);

        else
            return (<div>{this.__createRadios(this.props.data)}</div>);
    };

    isValid = ()=> {
        return this.valid;
    };

    getSelected = ()=> {
        return this.selectedItem;
    };

    __parse = (e)=> {
        if (this.props.onChange) {
            e.target.parsedValue = e.target.getAttribute("data");
            this.props.onChange(e);
            this.valid = true;
            this.selectedItem = e.target.getAttribute("data");
        }
    };

    __createRadios = (list)=> {

        var options = [];

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            let value = this.__getDataValueField(item);
            let icon = this.props.value === value ? " state-icon fa fa-dot-circle-o" : " state-icon fa fa-circle-o";
            if (this.props.value === value) {
                this.valid = true;
                this.selectedItem = value;
            }
            options.push(
                <Col className="checkbox" onClick={this.__parse.bind(this)} data={value} key={value}>
                    <label style={{paddingLeft:"2px"}} data={value}>
                        <span className={icon} style={{marginRight:"10px"}} data={value}/>
                        <span data={value}>{this.__getDataTextField(item)}</span></label>
                </Col>)
        }
        return options;
    };

    __getDataTextField = (item)=> {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || item;
        }
        return item;

    };

    __getDataValueField = (item)=> {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || item;
        }
        return item;
    };

    // isValid = ()=> {
    //     return this.refs.innerInput.isValid();
    // };

}

module.exports = RadioInput;