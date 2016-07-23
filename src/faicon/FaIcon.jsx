import React from "react";
import { ShallowComponent } from "robe-react-commons";
import "./font-awesome/4.6.1/css/font-awesome.min.css";

/**
 * This component wraps font-awesome elements. Also it loads font-awesome.min.css. No need to load it somewhere else.
 * Please look at https://fortawesome.github.io/Font-Awesome/examples/
 */
export default class FaIcon extends ShallowComponent {

    static propTypes = {
        /**
         * Classname for use icon.
         * More information : http://fontawesome.io/icons/
         */
        code: React.PropTypes.string.isRequired,
        /**
         * Size code of the icon
         * More information : http://fontawesome.io/
         */
        size: React.PropTypes.string,
        /**
         * applies custom style to the icon.
         */
        style: React.PropTypes.object,
        /**
         * Specifies to use fa-fw class or not for fixed icon width and height.
         * More information : http://fontawesome.io/
         */
        fixed: React.PropTypes.bool
    };

    static defaultProps = {
        size: "",
        fixed: true
    };

    render(): Object {
        let fixedStr = this.props.fixed ? "fa-fw" : "";
        let propsClassName = this.props.className === undefined ? "" : this.props.className;
        let className = `fa ${fixedStr} ${this.props.code} ${this.props.size} ${propsClassName}`;
        return (
            <i className={className} style={this.props.style} {...this.props} aria-hidden="true" />
        );
    }
}
