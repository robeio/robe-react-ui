import React from "react";
import { ShallowComponent } from "robe-react-commons";
import "./style.css";

export default class Loading extends ShallowComponent {
    static style = {
        position: "inherit",
        verticalAlign: "middle",
        width: "100%",
        fontSize: "xx-large",
        textAlign: "center",
        paddingTop: "35%"
    };
    render(): Object {
        let styleClass = this.props.className === undefined ? "" : this.props.className;
        return (
            <div style={Loading.style}>
                <span
                    className={
                    `glyphicon glyphicon-refresh spinning ${styleClass}`
                    }
                />
            </div>
        );
    }
}
