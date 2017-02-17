import React from "react";
import {ShallowComponent,Application,Maps} from "robe-react-commons";
import {Nav, NavItem, InputGroup, Overlay, Popover} from "react-bootstrap";
import "./SidePanel.css";

export default class SidePanel extends ShallowComponent {

    static propTypes = {
        /**
         * Is component visible or not
         */
        visible: React.PropTypes.bool,
        /**
         * Position of the component
         */
        position: React.PropTypes.oneOf(["left","right"]),
        /**
         * Styles that you want to change
         */
        style: React.PropTypes.object,
        /**
         * Width in pixels
         */
        width: React.PropTypes.number
    };

    static defaultProps = {
        visible: false,
        position: "left",
        style: {},
        width: 250
    };

    sidePanel;

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let components = React.Children.map(this.props.children, (child) => { return child; });
        return (
            <div ref={(component) => { this.sidePanel = component } }
                style={this.props.style}
                className={this.props.position == "left"?"side-panel-left":"side-panel-right"}>
                {components}
            </div>
        );
    }

    __calculatePosition(props) {
        let width = parseInt(props.width) + 10;
        this.sidePanel.style.width = (width - 10) + "px";
        if(props.position == "left") {
            this.sidePanel.style.left = props.visible?"0":"-"+width+"px";
        }
        else {
            this.sidePanel.style.right = props.visible?"0":"-"+width+"px";
        }
    }

    componentDidMount() {
        this.__calculatePosition(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.__calculatePosition(nextProps);
    }
}