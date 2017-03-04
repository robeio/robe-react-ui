import React from "react";
import {Glyphicon} from "react-bootstrap";
import {ShallowComponent} from "robe-react-commons";
import ProgressBar from "../progress/ProgressBar"
import ClassName from "../util/css/ClassName";

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
        loading: undefined
    };

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        let progressBar = {className: "center-block "};

        if (this.props.className) {
            ClassName.add(progressBar, this.props.className);
        }
        if (this.props.focused) {
            ClassName.add(progressBar, "rb-focused");
        }
        if (this.props.selected) {
            ClassName.add(progressBar, "rb-selected");
        }

        let progress = this.props.loading !== undefined ? <ProgressBar loading={this.props.loading}/> : null;
        return (
            <div className={progressBar.className} style={this.props.style}>
                {progress}
                {this.props.children}
            </div>
        );
    }
}
