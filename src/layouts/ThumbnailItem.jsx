import React from "react";
import { Glyphicon } from "react-bootstrap";
import { ShallowComponent } from "robe-react-commons";

export default class ThumbnailItem extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        onClose: React.PropTypes.func,
        style: React.PropTypes.object
    };

    constructor(props: Object) {
        super(props);
    }

    render(): Object {
        let closeButton = null;
        if(this.props.onClose) {
            closeButton = <Glyphicon glyph="remove" className="rb-close" onClick={this.props.onClose} />
        }
        return (
            <div className="center-block rb-unspaced"style={this.props.style} >
                {closeButton}
                {this.props.children}
            </div>
        );
    }
}
