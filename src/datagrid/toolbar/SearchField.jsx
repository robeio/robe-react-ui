import React from "react";
import PropTypes from "prop-types";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import InputGroup from "react-bootstrap/lib/InputGroup";
import TextInput from "../../inputs/TextInput";
import FaIcon from "../../faicon/FaIcon";

export default class SearchField extends ShallowComponent {


    static propTypes: Map = {
        /**
         *Value for the search
         */
        value: PropTypes.string,

        /**
         * placeholder text
         */
        placeholder: PropTypes.string,

        /**
         *Delay between last keystroke and search request.
         */
        delay: PropTypes.number

    };
    static defaultProps = {
        value: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            loading: false
        }
    }

    render(): Object {
        if (this.props.visible) {
            let icon = this.state.loading ? "fa-circle-o-notch fa-spin" : "fa-search";
            return (
                <TextInput
                    inputGroupRight={<InputGroup.Addon>  <FaIcon code={icon} size="fa-sm" /> </InputGroup.Addon>}
                    onChange={this.onChange}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    bsSize="sm"
                    />
            );
        }
        return <span />;
    }

    onChange(e) {
        clearTimeout(this.searchOnChange);
        this.setState({
            value: e.target.value,
            loading: true
        });
        let event = { target: { value: e.target.value } };
        this.searchOnChange = setTimeout(function () {
            this.props.onChange(event);
            this.setState({
                loading: false
            });
        }.bind(this), this.props.delay);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }
}
