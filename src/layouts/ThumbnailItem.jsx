import React from "react";
import {Glyphicon} from "react-bootstrap";
import {ShallowComponent} from "robe-react-commons";
import ProgressBar from "robe-react-ui/lib/progress/ProgressBar"

export default class ThumbnailItem extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes:Map = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        focused: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        loading: React.PropTypes.bool
    };

    /**
     * Default properties of the component
     *
     * @static
     */
    static defaultProps = {
        focused: false,
        selected: false,
        loading: false
    };

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        let className = "center-block ";
        if (this.props.className) {
            className += this.props.className;
        }
        if (this.props.focused) {
            className += " rb-focused";
        }
        if (this.props.selected) {
            className += " rb-selected";
        }
        return (
            <div className={className} style={this.props.style}>
                <ProgressBar loading={this.props.loading}/>
                {this.props.children}
            </div>
        );
    }
}
