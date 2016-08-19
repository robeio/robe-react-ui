import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import InputGroup from "react-bootstrap/lib/InputGroup";
import TextInput from "../../inputs/TextInput";
import FaIcon from "../../faicon/FaIcon";

export default class SearchField extends ShallowComponent {


    render(): Object {
        if (this.props.visible) {
            return (
                <TextInput
                    inputGroupRight={<InputGroup.Addon> <FaIcon code="fa-search" size="fa-sm" /> </InputGroup.Addon>}
                    onChange={this.props.onChange}
                    value={this.props.filter}
                />
            );
        }
        return <span />;
    }
}
