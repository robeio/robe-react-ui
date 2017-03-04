import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";

export default class FaIconSample extends ShallowComponent {

    static blStyle = { color: "#337ab7" };

    render(): Object {
        return (
            <div>
                <FaIcon code="fa-thumbs-o-up" size="fa-5x" />
                <FaIcon code="fa-thumbs-o-up" size="fa-4x" />
                <FaIcon code="fa-thumbs-o-up" size="fa-3x" />
                <FaIcon code="fa-thumbs-o-up" size="fa-2x" />
                <FaIcon code="fa-thumbs-o-up" />
                <hr />
                <FaIcon code="fa-thumbs-up" size="fa-5x" style={FaIconSample.blStyle} />
                <FaIcon code="fa-thumbs-up" size="fa-4x" style={FaIconSample.blStyle} />
                <FaIcon code="fa-thumbs-up" size="fa-3x" style={FaIconSample.blStyle} />
                <FaIcon code="fa-thumbs-up" size="fa-2x" style={FaIconSample.blStyle} />
                <FaIcon code="fa-thumbs-up" style={FaIconSample.blStyle} />
                <hr />
                <p>
                    Please visit <a
                        href="http://fontawesome.io/icons/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        fontawesome.io</a> for more.
                </p>

            </div>
        );
    }
}
