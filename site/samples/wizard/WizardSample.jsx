import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Wizard from "robe-react-ui/lib/wizard/Wizard";
import TextInput from "inputs/TextInput";

export default class WizardSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            TextInputNormal1: "1st Value",
            TextInputNormal2: "2nd Value"
        };
    }

    render() {
        return (
            <Wizard ref="wizard" steps={[
                {
                    title: "Step 1",
                    component:
                    <TextInput
                        label="TextInput 1"
                        ref="step"
                        value={this.state.TextInputNormal1}
                        onChange={this.__handleChange.bind(undefined, "TextInputNormal1")}
                    />
                      
                },
                {
                    title: "Step 2",
                    component:
                        <TextInput
                            ref="step"
                            label="TextInput 2"
                            value={this.state.TextInputNormal2}
                            onChange={this.__handleChange.bind(undefined, "TextInputNormal2")}
                        />
                }
            ]}
                onCompleteClick={this.__onSaveButtonClick}
            />
        
        );
    }
    __handleChange = (code: any, data: Object) => {
        let state = {};
        state[code] = data.target.value;
        this.setState(state);
        return true;
    };
}
