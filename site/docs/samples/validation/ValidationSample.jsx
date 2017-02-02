import React from "react";
import {
    Well
} from "react-bootstrap";
import {
    ShallowComponent,Application
} from "robe-react-commons";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";
import Highlight from "react-highlight";
import ex1 from "./Snippet1.txt";
import ex2 from "./Snippet2.txt";


export default class ValidationSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            example1: ""
        };
        this.__handleChangeEx1 = this.__handleChange.bind(undefined, "example1");
    }

    render(): Object {
        return (
            <div>
                <p>
                    {Application.i18n(ValidationSample,"validation.ValidationSample","exampleOneDesc")}
                </p>
                <TextInput
                    label={Application.i18n(ValidationSample,"validation.ValidationSample","exampleOneBlock")}
                    value={this.state.example1}
                    onChange={this.__handleChangeEx1}
                    validations={{
                        required: {
                            message: Application.i18n(ValidationSample,"validation.ValidationSample","requireMessage")
                        },
                        minLength: {
                            args: [3]
                        },
                        please: {
                            func: (value: String): String => {
                                if (value.indexOf("please") === -1 && value.indexOf("Please") === -1) {
                                    return Application.i18n(ValidationSample,"validation.ValidationSample","magicMessage");
                                }
                                return undefined;
                            }
                        }
                    }}
                />
                <TextInput
                    label={Application.i18n(ValidationSample,"validation.ValidationSample","exampleTwoOverlay")}
                    value={this.state.example1}
                    onChange={this.__handleChangeEx1}
                    validationDisplay="overlay"
                    validations={{
                        required: {
                            message: Application.i18n(ValidationSample,"validation.ValidationSample","requireMessage")
                        },
                        minLength: {
                            args: [3]
                        }
                    }}
                />
                <p>
                    {Application.i18n(ValidationSample,"validation.ValidationSample","exampleWwoDesc")}
                </p>
                <Highlight className="javascript">{ex1}</Highlight>
                <Well>
                    {Application.i18n(ValidationSample,"validation.ValidationSample","descOne")}
                </Well>
                {Application.i18n(ValidationSample,"validation.ValidationSample","descTwo")}
                <Highlight className="json">{ex2}</Highlight>
            </div>
        );
    }

    __handleChange = (code: any, e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
    };
}

