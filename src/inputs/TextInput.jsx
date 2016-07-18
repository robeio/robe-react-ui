import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

/**
 * TextInput is a component
 * 
 * @export
 * @class TextInput
 * @extends {ShallowComponent}
 */
export default class TextInput extends ShallowComponent {
    /**
     * 
     * 
     * @static
     */
    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    }

    /* eslint no-useless-constructor: 0*/
    /**
     * Creates an instance of TextInput.
     * 
     * @param {any} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * 
     * 
     * @returns
     */
    render() {
        return (
            <Input
                {...this.props}
                type="text"
                ref="innerInput"
            />);
    }

    /**
     * 
     */
    isValid = () => {
        return this.refs.innerInput.isValid();
    };
}
