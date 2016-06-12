import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "form/elements/Input";

class TextInput extends ShallowComponent {
    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Input
                {...this.props}
                type="text"
                ref="innerInput"
            />);
    };

    isValid = ()=> {
        return this.refs.innerInput.isValid();
    };
}

module.exports = TextInput;