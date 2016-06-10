import React from "react";
import BaseInput from "inputs/BaseInput";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class Showcase extends ShallowComponent {
    render() {
        return (
            <BaseInput type="text" />
        );
    }
}
