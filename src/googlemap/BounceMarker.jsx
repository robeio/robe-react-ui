import React from "react";
import PropTypes from "prop-types";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Popover from "react-bootstrap/lib/Popover";
import TextArea from "robe-react-ui/lib/inputs/TextArea";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import "./GoogleMap.css";

export default class BounceMarker extends ShallowComponent {

    static propTypes = {
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        description: PropTypes.string,
        inputType: PropTypes.oneOf(["textInput", "textArea", "none"]),
        inputStyle: PropTypes.object,
        overlay: PropTypes.bool,
        overlayPlacement: PropTypes.oneOf(["top", "right", "left", "bottom"]),
        overlayStyle: PropTypes.object
    };

    static defaultProps = {
        overlay: true,
        overlayPlacement: "top",
        inputType: "none"
    };

    trigger;

    constructor(props): Object {
        super(props);
        this.state = {
            description: props.description || ""
        }
    }

    render(): Object {
        return (<span>
            {this.__renderMarker()}
        </span>
        );
    }

    __renderMarker() {
        if (this.props.overlay)
            return (<span><OverlayTrigger
                ref={(component: Object) => { this.trigger = component } }
                trigger="click" rootClose
                placement={this.props.overlayPlacement}
                overlay={<Popover id="popover-trigger-click-root-close" className="googleMapPopover"
                    style={this.props.overlayStyle}>
                    {this.props.inputType == "textArea" ? <TextArea style={this.props.inputStyle}
                        name="description"
                        value={this.state.description}
                        onChange={this.__handleChange}
                        /> : this.props.inputType == "textInput" ? <TextInput style={this.props.inputStyle}
                            name="description"
                            value={this.state.description}
                            onChange={this.__handleChange}
                            /> : this.state.description}

                </Popover>}>
                <div className="pin bounce"></div>
            </OverlayTrigger>
                <div className="pulse"></div></span>);
        else
            return (<span>
                <div className="pin bounce"></div>
                <div className="pulse"></div>
            </span>);
    };

    __handleChange(e: Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);

        if (this.props.onChange)
            this.props.onChange(state);
    };
}
