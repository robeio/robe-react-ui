import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import InputGroup from "react-bootstrap/lib/InputGroup";
import TextInput from "../../inputs/TextInput";
import FaIcon from "../../faicon/FaIcon";

export default class SearchField extends ShallowComponent {


    static propTypes: Map = {
        value: React.PropTypes.string,
        placeholder: React.PropTypes.string

    };
    static defaultProps = {
        value: ""
    };

    render(): Object {
        if (this.props.visible) {
            return (
                <TextInput
                    inputGroupRight={<InputGroup.Addon> <FaIcon code="fa-search" size="fa-sm" /> </InputGroup.Addon>}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    bsSize="sm"
                />
            );
        }
        return <span />;
    }
}
