import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DataForm from "form/DataForm";
import InputValidations from "validation/InputValidations";

const fields = [
    {
        label: "String Input",
        code: "string",
        type: "string"
    },
    {
        label: "Numeric Input",
        code: "number",
        type: "number"
    },
    {
        label: "Decimal Input",
        code: "decimal",
        type: "decimal"
    },
    {
        label: "Date Input",
        code: "date",
        type: "date"
    },
    {
        label: "Password Input",
        code: "password",
        type: "password"
    },
    {
        label: "Money Input",
        code: "money",
        type: "money"
    },
    {
        label: "Select Input",
        code: "select",
        type: "select",
        value: "en"
    },
    {
        label: "Check Input",
        code: "check",
        type: "check"
    },
    {
        label: "Radio Input",
        code: "radio",
        type: "radio"
    },
    {
        label: "CheckList Input",
        code: "checkList",
        type: "checkList",
        value: "tr"
    },
    {
        label: "Html Editor",
        code: "htmlEditor",
        type: "editor"
    }
]

const items = [
    {
        value: "en",
        text: "English"
    },
    {
        value: "tr",
        text: "Turkish"
    },
    {
        value: "kurdish",
        text: "Kurdish"
    }
];

const config = {
    string: {
        validations: { required: InputValidations.required }
    },
    number: {

    },
    decimal: {},
    date: {},
    password: {

    },
    money: {},
    select: {
        items
    },
    check: {
        items
    },
    radio: {
       items
    },
    checkList: {
        items
    },
    htmlEditor: {}
};

const item = {
    select: "en",
    check: "en,tr",
    radio: "en",
    checkList: "en,tr"
};


export default class DataFormSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    constructor(props:Object) {
        super(props);
    }

    render() {
        return (
            <div>
                <DataForm label="Example Data Form Label" fields={fields} config={config} item={item} />
            </div>
        );
    }

}