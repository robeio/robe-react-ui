import React from "react";
import {
    Well
} from "react-bootstrap";
import {
    ShallowComponent
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
                <span>
                    You can use <code>validation</code> property to give your validation functions.
                    All components which extends <code>ValidationComponent</code> will automatically take and execute on each run.
                    Either our pre-defined validations at <code>InputValidations</code> or your brand new validation functions can be used.

                </span>
                <TextInput
                    label="Example 1"
                    value={this.state.example1}
                    onChange={this.__handleChangeEx1}
                    validations={{
                        required: {
                            message: "This a custom required message."
                        },
                        minLength: {
                            args: [3]
                        },
                        please: {
                            func: (value: String): String => {
                                if (value.indexOf("please") === -1 && value.indexOf("Please") === -1) {
                                    return "\"Please\" use the magic word.";
                                }
                                return undefined;
                            }
                        }
                    }}
                />
                <Highlight className="javascript">{ex1}</Highlight>
                <Well>
                    As you can see from the source code validation property takes a map of validations.
                    It also supports parametric validation functions with custom message templates.
                    For ex.<code>minLength</code> is an object with pre-defined function (<code>InputValidations</code>).
                    We used <code>minLength.args</code> for passing desired parameters which is the minimum length at this case.
                    Also you can define custom message templates with <code>minLength.message</code>.
                    You can give your validation function directly via <code>minLength.func</code> parameter, for an example take a look at <code>please</code> please :).
                </Well>
                <code>InputValidations</code> is a singleton class which holds pre-defined validations and a registery for new functions.
                Registering a validation is essential for reusing functions and makes it accessible from everywhere.
                Also you should know that <code>DataForm</code> uses these <code>InputValidations</code> to lookup validation names from the given <code>DataModel</code> json.
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

