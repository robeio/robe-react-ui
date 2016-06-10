import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import Input from "libs/view/form/elements/Input";

class PasswordInput extends BaseComponent {
    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    };


    render() {
        return (
            <Input
                {...this.props}
                type="password"
                ref="innerInput"
            />);
    };

    isValid = ()=> {
        return this.refs.innerInput.isValid();
    };
}

module.exports = PasswordInput;