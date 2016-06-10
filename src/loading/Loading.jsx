import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import "libs/view/loading/style.css";

class Loading extends BaseComponent {
    static style = {
        position: "inherit",
    verticalAlign: "middle",
    width: "100%",
    fontSize: "xx-large",
    textAlign: "center",
    paddingTop: "35%"
        
    }

    render() {
        return (
            <div style={Loading.style}>
                <span
                    className={"glyphicon glyphicon-refresh spinning "+(this.props.className==undefined?"":this.props.className)}/>
            </div>
        );
    };
}
module.exports = Loading;