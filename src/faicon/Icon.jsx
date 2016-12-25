import React from "react";
import { ShallowComponent } from "robe-react-commons";
import { Glyphicon, Image } from "react-bootstrap";
import FaIcon from "./FaIcon";

export default class Icon extends ShallowComponent {
    static propTypes: Map = {
        type: React.PropTypes.oneOf(["glyph", "fai", "mimeType", "custom", "none"]),
        icon: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        size: React.PropTypes.object,
        renderer: React.PropTypes.func,
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };
    static defaultProps: Map = {
        type: "glyph"
    };
    static FILE_CONS_PATH = "./images/file-icons/";

    renderer;

    constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);

    }
    componentWillReceiveProps(nextProps){
        this.renderer = Icon.findRenderer(nextProps);
    }

    render() {
        let icon = null;
        if(this.renderer) {
            icon = this.renderer(this.props);
        }
        if(icon === false && this.props.type !== "custom" && this.props.renderer) {
            icon = this.props.renderer(this.props);
        }
        return icon;
    }

    static findRenderer(props: Map){
        switch (props.type) {
            case "glyph":
                return Icon.getGlpyIcon;
                break;
            case "fai":
                return Icon.getFaIcon;
                break;
            case "mimeType":
                return Icon.getFileTypeIcon;
                break;
            case "custom":
                return props.renderer;
                break;
            default:
                return undefined;
        }
    }

    static getFaIcon(props){
        return <FaIcon code={props.icon} size={"fa-"+ props.size} className={props.className} style={props.style} />;
    }
    static getGlpyIcon(props){
        return <Glyphicon glyph={props.icon} className={props.className} style={props.style} />;
    }
    static getFileTypeIcon(props){
        return <Image src={`${Icon.FILE_CONS_PATH}${props.size}px/${props.icon}.png`} className={props.className} style={props.style} responsive thumbnail />;
    }
}
