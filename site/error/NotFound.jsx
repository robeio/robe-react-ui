import React from "react";
import FaIcon from "faicon/FaIcon";
import { Application,ShallowComponent } from "robe-react-commons";
import { Image } from "react-bootstrap";

export default class NotFound extends ShallowComponent {
    static style = {
        verticalAlign: "middle",
        textAlign: "center",
        paddingTop: 150
    };

    render() {
        return (<div style={NotFound.style}>
            <Image src="./notfound.gif" rounded />
            <h1>{Application.i18n(NotFound,"error.NotFound","message")}</h1>
        </div>);
    }

}
