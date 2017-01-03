import React from "react";
import {
    Well,
    InputGroup
} from "react-bootstrap";
import {
    ShallowComponent
} from "robe-react-commons";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import Highlight from "react-highlight";
import ex1 from "./Snippet1.txt";


export default class InputAddon extends ShallowComponent {

    constructor(props: Object) {
        super(props);
    }

    render(): Object {
        return (
            <div>
                <p>
                    You can use <code>addons</code> property to show additional components within your inputs.
                    All components which wraps <code>BaseInput</code> will take properties <code>inputGroupLeft</code> and <code>inputGroupRight</code> properties.
                    You can find detailed usage from <a href="https://react-bootstrap.github.io/components.html#forms-input-groups" target="_blank">react-bootstrap docs</a>.
                </p>
                <TextInput
                    label="Example 1 (Text Left)"
                    value=""
                    inputGroupLeft={<InputGroup.Addon > Text to left</InputGroup.Addon>}
                    />
                <TextInput
                    label="Example 2 (Text Right)"
                    value=""
                    inputGroupRight={<InputGroup.Addon > or to right</InputGroup.Addon>}
                    />
                <TextInput
                    label="Example 3 (Icon Left)"
                    value=""
                    inputGroupLeft={<InputGroup.Addon > <FaIcon code="fa-user-circle-o" /></InputGroup.Addon>}
                    />
                <TextInput
                    label="Example 4 (Icon Right)"
                    value=""
                    inputGroupRight={<InputGroup.Addon > <FaIcon code="fa-unlock-alt" /></InputGroup.Addon>}
                    />
                <Highlight className="javascript">{ex1}</Highlight>
                <Well>
                    You can add whatever you want by wrapping your component with <code>InputGroup.Addon</code> or with an equivalent component.
                </Well>
            </div>
        );
    }
}

