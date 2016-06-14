import React from "react";
import { Maps, ShallowComponent } from "robe-react-commons";
import Form from "react-bootstrap/lib/FormGroup";
import Input from "inputs/BaseInput";
import NumericInput from "inputs/NumericInput";
import DateInput from "inputs/DateInput";
import CheckInput from "inputs/CheckInput";
import SelectInput from "inputs/SelectInput";
import HtmlEditor from "inputs/htmleditor/HtmlEditor";
import DropzoneUpload from "upload/DropzoneUpload";


export default class DataForm extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = this.props.data;
    }

    _cascadedList = [];

    render() {
        return (
            <Form>
                {this.__createForm(this.props.model, this.state)}
            </Form>
        );
    }

    isValid = () => {
        for (let key in this.refs) {
            if (this.refs.hasOwnProperty(key)) {
                let child = this.refs[key];
                if (child.isValid) {
                    if (!child.isValid()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    __createForm = (model, data) => {
        let elements = [];
        let i = 0;
        // Maps.forEach(model, (value, key) => {
        Maps.forEach(model, (value) => {
            if (value.visible !== false) {
                elements.push(this.__decideElement(value, data, i++ === 0));
            }
        });
        return elements;
    };


    __filterUndefined = (value) => {
        if (value === 0) {
            return 0;
        } else if (value) {
            return value;
        }
        return "";
    };


    __decideElement = (model, data, focus) => {
        if (!data) {
            data = {};
        }
        let value = this.__filterUndefined(data[model.code]);

        let validations = model.validations;
        let required = undefined;
        let min = undefined;
        let max = undefined;
        let regex = undefined;

        if (validations) {
            required = validations.required;
            min = validations.min;
            max = validations.max;
            regex = validations.regex;
        }

        let disabled = model.editable !== undefined ? !model.editable : false;
        switch (model.type) {
            case "number": {
                return (
                    <NumericInput
                        type="text"
                        label={model.title}
                        floatingLabel={true}
                        key={model.code}
                        ref={model.code}
                        required={required}
                        min={min}
                        max={max}
                        focus={focus}
                        disabled={disabled}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                    />
                );
            }
            case "string": {
                return (
                    <Input
                        type="text"
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        required={required}
                        min={min}
                        max={max}
                        disabled={disabled}
                        focus={focus}
                        regex={regex}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                    />
                );
            }
            case "textarea": {
                return (
                    <Input
                        type="textarea"
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        required={required}
                        min={min}
                        max={max}
                        focus={focus}
                        disabled={disabled}
                        regex={regex}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                    />
                );
            }
            case "password": {
                return (
                    <Input
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        required={required}
                        min={min}
                        max={max}
                        focus={focus}
                        disabled={disabled}
                        type={"password"}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                    />
                );
            }
            case "date": {
                // TODO format={model.format}
                return (
                    <DateInput
                        label={model.title}
                        key={model.code}
                        disabled={disabled}
                        ref={model.code}
                        focus={focus}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                    />
                );
            }
            case "list" : {
                let dataTextField = model.dataTextField || "name";
                let dataValueField = model.dataValueField || "oid";
                let optionLabel = model.optionLabel || "<Lütfen Seçiniz>";

                if (model.cascade) {
                    model.value = value;
                    this._cascadedList.push(model);
                }
                return (
                    <SelectInput
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                        disabled={disabled}
                        dataTextField={dataTextField}
                        dataValueField={dataValueField}
                        optionLabel={optionLabel}
                        required={required}
                        focus={focus}
                        data={this.props.resources[model.code]}
                    />
                );
            }
            case "bool": {
                if (!value) {
                    value = false;
                }
                return (
                    <CheckInput
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        focus={focus}
                        disabled={disabled}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value}
                    />
                );
            }
            case "editor": {
                return (
                    <HtmlEditor
                        label={model.title}
                        key={model.code}
                        ref={model.code}
                        disabled={disabled}
                        onChange={this.__handleChange(model.code, model.cascade, undefined)}
                        value={value} required={required}
                        min={min}
                        max={max}
                        focus={focus}
                    />);
            }
            case "upload": {
                return (
                    <DropzoneUpload
                        key={model.code}
                        postUrl={`${window.backendRootPath}assets`}
                        files={value || []}
                        onChange={this.__handleChange(model.code, model.cascade, model.deleted)}
                    />
                );
            }
            default :
                throw new Error("Unknown Component ! ");

        }
    };

    __handleChange = (code, cascade, deleted, e) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        if (deleted) {
            // that mean this upload. i need set the deleted item
            state[deleted] = e.target.deleted ? e.target.deleted : [];
        }

        if (cascade) {
            for (let cCode in cascade) {
                if (cascade.hasOwnProperty(cCode)) {
                    let filter = {};
                    filter.code = cascade[cCode];
                    filter.value = value;

                    if (e.target.default !== true) {
                        state[cCode] = undefined;
                    }
                    this.refs[cCode].setState({
                        filter: filter
                    });
                }
            }
        }
        this.setState(state);
    }

    componentDidMount = () => {
        for (let i = 0; i < this._cascadedList.length; i++) {
            let obj = this._cascadedList[i];
            let e = {};
            e.target = {};
            e.target.parsedValue = obj.value;
            e.target.default = true;

            this.__handleChange(obj.code, obj.cascade, undefined, e);
        }
    }
}
