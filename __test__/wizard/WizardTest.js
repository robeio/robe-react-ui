import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Wizard from "wizard/Wizard";
import Step from "wizard/Step";

class StepOne extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "Step One",
        };
    }

    render() {
        return (
            <div>
                {this.state.name}
            </div>
        );
    }

    isValid() {
        let result = {
            message: "OneStep is valid.",
            status: true,
            type: "success"
        };

        return result;
    }
}

class StepTwo extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "Step Two",
            isValid: true
        };
    }

    render() {
        return (
            <div>
                {this.state.name}
            </div>
        );
    }

    isValid() {
        return this.state.isValid;
    }

    stateOfSteps(steps) {
        console.log(steps)
    }
}

class StepThree extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    render() {
        return (
            <div>
                {this.state.name}
            </div>
        );
    }

    isValid() {
        let result = {message: "Good Bye.", type: "error"};
        return result;
    }

}

export default class WizardTest extends ShallowComponent {

    constructor(props) {
        super(props);
    }

    __refs = {};

    render() {
        return (
            <Wizard onComplete={this.__onComplete}>
                <Step >
                    <StepOne/>
                </Step>
                <Step title="Two" stepKey="twoStep">
                    <StepTwo ref="two"/>
                </Step>
                <Step title="Three">
                    <StepThree ref={
                        (step) => {
                            this.__refs["Three"] = step
                        }}/>
                </Step>
            </Wizard>
        );
    }

    __onComplete(steps) {
        console.log("finish.")
    }

}
