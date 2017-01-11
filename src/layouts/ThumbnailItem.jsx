import React from "react";
import {Glyphicon} from "react-bootstrap";
import {ShallowComponent} from "robe-react-commons";

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
        progress: React.PropTypes.bool
    };

    /**
     * Default properties of the component
     *
     * @static
     */
    static defaultProps = {
        focused: false,
        selected: false,
        progress: false
    };

    constructor(props:Object) {
        super(props);

        this.state = {
            progress: true
        }
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

        let progress = "rb-progress-bar";
        if (this.state.progress)
            progress += " rb-progress-bar-start";
        else
            progress += " rb-progress-bar-finish";
        return (
            <div className={className} style={this.props.style}>
                <div className="rb-progress" style={{display:this.props.progress?"inherit":"none"}}>
                    <button onClick={()=>this.setState({progress:!this.state.progress})}>{this.state.progress}</button>
                    <div className="rb-progress-content">
                        <div className={progress}></div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
