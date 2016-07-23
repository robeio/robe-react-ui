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
                    <span>fa-check-square-o state-icon</span>
                    <div>
                        <FaIcon code={"fa-check-square-o state-icon"} size={"10px"} />
                    </div>
                </div>
                <hr />
                <div>
                    <span>FaIcon -> fa-square-o state-icon</span>
                    <div>
                        <FaIcon code={"fa-square-o state-icon"} size={"10px"} />
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}