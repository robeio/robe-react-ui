import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class JSDocs extends React.Component {

    static style = {
        minHeight: "100%",
        width: "100%",
        position: "fixed",
        border: "none"
    };

    render():Object {
        return (
            <iframe
                style={JSDocs.style}
                src="https://doc.esdoc.org/github.com/robeio/robe-react-ui/"
            >
            </iframe>
        );
    }
}
