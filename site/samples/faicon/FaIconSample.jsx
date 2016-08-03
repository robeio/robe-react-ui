import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "faicon/FaIcon";

export default class FaIconSample extends ShallowComponent {
    /* disable-eslint no-useless-constructor */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <span>FaIcon -> fa-check-square-o state-icon</span>
                    <div>
                        <FaIcon code={"fa-check-square-o state-icon"} />
                    </div>
                </div>
                <hr />
                <div>
                    <span>FaIcon -> fa-check-square-o state-icon with custom style -> color red</span>
                    <div>
                        <FaIcon code={"fa-check-square-o state-icon"} style={{ "color": "red" }} />
                    </div>
                </div>
                <hr />
                <div>
                    <span>FaIcon fa-square-o state-icon size->fa-2x</span>
                    <div>
                        <FaIcon code={"fa-square-o state-icon"} size={"fa-2x"} />
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}