import React from "react";
import {ShallowComponent} from "robe-react-commons";
import "./ProgressBar.css"

export default class ProgressBar extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes:Map = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        loading: React.PropTypes.bool
    };

    /**
     * Default properties of the component
     *
     * @static
     */
    static defaultProps = {
        show: true
    };

    constructor(props:Object) {
        super(props);
    }

    render():Object {

        let progress = "rb-progress";
        let bar = "rb-progress-bar";

        if (this.props.loading) {
            bar += " rb-progress-bar-start";
        }
        else {
            bar += " rb-progress-bar-finish";
            progress += " rb-progress-finish"
        }


        return (
            <div className={this.props.className} style={this.props.style}>
                <div className={progress}>
                    <div className="rb-progress-content">
                        <div className={bar}></div>
                    </div>
                </div>
            </div>
        );
    }
}
