import React from "react";
import {
    Well,
    InputGroup
} from "react-bootstrap";
import {
    Application,
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
                    {Application.i18n(InputAddon,"addon.InputAddon","paragraphOne")} <a href="https://react-bootstrap.github.io/components.html#forms-input-groups" target="_blank">react-bootstrap docs</a>.
                </p>
                <TextInput
                    label={Application.i18n(InputAddon,"addon.InputAddon","textOne")}
                    value=""
                    inputGroupLeft={<InputGroup.Addon >{Application.i18n(InputAddon,"addon.InputAddon","textOneSub")}</InputGroup.Addon>}
                    />
                <TextInput
                    label={Application.i18n(InputAddon,"addon.InputAddon","textTwo")}
                    value=""
                    inputGroupRight={<InputGroup.Addon >{Application.i18n(InputAddon,"addon.InputAddon","textTwoSub")}</InputGroup.Addon>}
                    />
                <TextInput
                    label={Application.i18n(InputAddon,"addon.InputAddon","textThree")}
                    value=""
                    inputGroupLeft={<InputGroup.Addon > <FaIcon code="fa-user-circle-o" /></InputGroup.Addon>}
                    />
                <TextInput
                    label={Application.i18n(InputAddon,"addon.InputAddon","textFour")}
                    value=""
                    inputGroupRight={<InputGroup.Addon > <FaIcon code="fa-unlock-alt" /></InputGroup.Addon>}
                    />
                <Highlight className="javascript">{ex1}</Highlight>
                <Well>
                    {Application.i18n(InputAddon,"addon.InputAddon","desc")}
                </Well>
            </div>
        );
    }
}

