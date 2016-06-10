import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";

// Please look at https://fortawesome.github.io/Font-Awesome/examples/
class FaIcon extends BaseComponent {

    static propTypes = {
        code: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired
    };

    render() {

        return (
            <i className={
            "fa" + " " +
            this.props.code + " " +
            this.props.size  + " " + (this.props.className==undefined?"":this.props.className)
            }/>
        );
    };
}
module.exports = FaIcon;
