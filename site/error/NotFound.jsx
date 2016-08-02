import React from "react";
import FaIcon from "faicon/FaIcon";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
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
            <h1>404 page not found.</h1>
        </div>);
    }

}
