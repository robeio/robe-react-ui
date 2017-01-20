import React from "react";
import { ShallowComponent } from "robe-react-commons";
import "font-awesome/css/font-awesome.min.css";

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
         * Size code of the icon. Use fa-sm, fa-lg (33% increase), fa-2x, fa-3x, fa-4x, or fa-5x classes.
         * More information : http://fontawesome.io/examples/#larger
         */
        size: React.PropTypes.oneOf(["fa-sm", "fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"]),
        /**
         * applies custom style to the icon.
         */
        style: React.PropTypes.object,
        /**
         * Specifies to use fa-fw class or not for fixed icon width and height.
         * More information : http://fontawesome.io/examples/#fixed-width
         */
        fixed: React.PropTypes.bool
    };

    static defaultProps = {
        size: "fa-sm",
        fixed: true
    };

    render(): Object {
        let fixedStr = this.props.fixed ? "fa-fw" : "";
        let propsClassName = this.props.className === undefined ? "" : this.props.className;
        let className = `fa ${fixedStr} ${this.props.code} ${this.props.size} ${propsClassName}`;

        const { fixed, code, size, ...props } = this.props; // eslint-disable-line no-unused-vars

        return (
            <i {...props} className={className} style={this.props.style} aria-hidden="true" />
        );
    }
}
