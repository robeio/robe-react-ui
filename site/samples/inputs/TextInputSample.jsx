import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";


export default class TextInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            TextInputNormal: "Some Text"
        };
    }

    render() {
        return (
            <div>
                <TextInput
                    label="TextInput"
                    value={this.state.TextInputNormal}
                    onChange={this.__handleChange.bind(undefined, "TextInputNormal")}
                />
                <TextInput
                    label="With Validations"
                    value={this.state.TextInputValidations}
                    onChange={this.__handleChange.bind(undefined, "TextInputValidations")}
                    validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
                    }}
                />
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
