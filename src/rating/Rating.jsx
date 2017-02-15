import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {ControlLabel} from "react-bootstrap";
import "./Rating.css";

export default class Rating extends ShallowComponent {

    static propTypes:Map = {
        /**
         * Style of Rating icons
         */
        style: React.PropTypes.object,
        /**
         * Size of Rating icons
         */
        size: React.PropTypes.oneOf([
            0, 1, 2, 3, 4
        ]),
        /**
         * Direct selected value
         */
        currentValue: React.PropTypes.number,
        /**
         * Count of icons
         */
        iconCount: React.PropTypes.number,
        /**
         * Initial icon type (Works with font-awesome icons like "fa-star-o")
         */
        initialIcon: React.PropTypes.string,
        /**
         * Selected icon type (Works with font-awesome icons like "fa-star")
         */
        selectedIcon: React.PropTypes.string,
        /**
         * Disable icons
         */
        disabled: React.PropTypes.bool,
        /**
         * Change event for the component (Returns (clickedKey))
         */
        onChange: React.PropTypes.func,
        /**
         * MouseOver event for the component (Returns (hoveredKey))
         */
        onMouseOver: React.PropTypes.func

    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        size: 0,
        iconCount: 10,
        initialIcon: "fa-star-o",
        selectedIcon: "fa-star",
        disabled: false
    };

    constructor(props:Object) {
        super(props);
        this.state = {
            selectedKey: this.props.currentValue || "",
            hoveredKey: this.props.currentValue || ""
        };
    }

    render():Object {
        return (<span>
            {this.props.label ? <span><ControlLabel>{this.props.label}</ControlLabel><br/></span> : null}
            {this.__renderStars()}
        </span>);
    }

    __renderStars() {
        let starArr = [];

        for (let i = 1; i < this.props.iconCount + 1; i++) {
            let className = this.__convertClickedIconToText(i);
            let style = this.props.selectedIcon === "fa-star" ? " selectedStar" : "";
            let iconWidth = this.props.disabled ? "iconWidthDisabled" : "iconWidth";
            starArr.push(<span key={i} className={iconWidth + style} style={this.props.style}><i className={"fa " + className}
                                                                                         onMouseOver={!this.props.disabled ? this.__onMouseOver : null}
                                                                                         onMouseLeave={!this.props.disabled ? this.__onMouseLeave : null}
                                                                                         aria-hidden="true" data={i}
                                                                                         onClick={!this.props.disabled ? this.__handleClick : null}/></span>);
        }

        return starArr;
    };

    __onMouseOver(e) {
        let key = e.target.getAttribute("data");
        this.setState({hoveredKey: key});
        if (this.props.onMouseOver)
            this.props.onMouseOver(key);
    };

    __onMouseLeave() {
        if (this.state.selectedKey === "")
            this.setState({hoveredKey: ""});
        else
            this.setState({hoveredKey: this.state.selectedKey});
    };

    __handleClick(e) {
        let key = e.target.getAttribute("data");
        this.setState({selectedKey: key, hoveredKey: key});

        if (this.props.onChange)
            this.props.onChange(key);
    };

    __convertClickedIconToText(i:number):string {
        let key = this.state.hoveredKey;
        let initialIcon = this.props.initialIcon;
        let selectedIcon = this.props.selectedIcon;
        let sizeText = this.__convertSizeToText();

        if (key === "")
            return initialIcon + sizeText;
        else {
            if (key < i)
                return initialIcon + sizeText;
            else
                return selectedIcon + sizeText;
        }
    };

    __convertSizeToText() {
        let size = this.props.size;
        switch (size) {
            case 0:
                return " fa-lg";
            case 1:
                return " fa-2x";
            case 2:
                return " fa-3x";
            case 3:
                return " fa-4x";
            case 4:
                return " fa-5x";
            default:
                return " fa-lg";
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            size: nextProps.size,
            currentValue: nextProps.currentValue,
            iconCount: nextProps.iconCount,
            disabled: nextProps.disabled
        });
    };
}
