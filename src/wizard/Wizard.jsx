import React from "react";
import {ShallowComponent, Application, Arrays} from "robe-react-commons";
import Pager from "react-bootstrap/lib/Pager";
import Toast from "../toast/Toast";
import Step from "./Step";
import FaIcon from "../faicon/FaIcon";
import "./Wizard.css";

export default class Wizard extends ShallowComponent {
    /**
     * PropTypes of the component.
     *
     * @static
     */
    static propTypes = {
        /**
         * Current page index to render.
         */
        currentKey: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        /**
         * provides to wizard change own state.
         */
        changeState: React.PropTypes.bool,
        /**
         * Text for the next button.
         */
        next: React.PropTypes.string,
        /**
         * Text for the previous button.
         */
        previous: React.PropTypes.string,
        /**
         * Text for the complete button.
         */
        complete: React.PropTypes.string,
        /**
         *
         */
        onComplete: React.PropTypes.func,
        /**
         *
         */
        onChange: React.PropTypes.func

    };

    static defaultProps = {
        currentKey: undefined,
        changeState: true,
        next: Application.i18n(Wizard, "wizard.Wizard", "next"),
        previous: Application.i18n(Wizard, "wizard.Wizard", "previous"),
        complete: Application.i18n(Wizard, "wizard.Wizard", "complete")
    };
    __steps = [];
    __refs = {};

    constructor(props: Object) {
        super(props);
        this.state = {
            currentKey: props.currentKey,
            stateOfSteps: {}
        };
    }


    render(): Object {
        this.__steps = [];
        let components = React.Children.map(this.props.children,
            (child, idx) => {
                if (child.type === Step) {
                    let step = {};
                    step.title = child.props.title || "";
                    step.stepKey = child.props.stepKey || ("step" + (idx + 1));
                    step.index = idx;
                    if (this.state.currentKey === undefined) {
                        this.state.currentKey = step.stepKey;
                    }
                    this.__steps.push(step);
                    return React.cloneElement(child, {
                        title: step.title,
                        stepKey: step.stepKey,
                        index: step.index,
                        ref: (step) => {
                            if (step) {
                                this.__refs[step.props.stepKey] = step;
                            }
                        }
                    });
                }
            });

        return (
            <div id="wizard">
                {this.__renderStepLayout(this.__steps)}
                {this.__renderSteps(components)}
                {this.__renderPager()}
            </div>
        );
    }

    __renderStepLayout(steps): Array {
        let layouts = [];
        let currentStep = this.__getCurrentStep();
        if (currentStep === undefined) {
            return layouts;
        }
        steps.map((step) => {
            let className = "step btn btn-default ";
            let isPrevious = currentStep.index >= step.index;
            className += isPrevious ? "btn-primary" : "";
            layouts.push(
                <li
                    key={step.index}
                    className={isPrevious ? "step-active" : "step-passive"}>
                    <a className={className} onClick={() => this.__onChange(step)}>
                        {step.index + 1}
                    </a>
                    <div className="label">{step.title}</div>
                </li>)
        });
        return (
            <ul className="wizard">
                {layouts}
            </ul>);
    }

    __renderSteps(components): Array {
        let componentArr = [];
        if (!components) {
            return componentArr;
        }
        components.map((child) => {
            let display = this.state.currentKey === child.props.stepKey ? "inherit" : "none";
            componentArr.push(
                <div
                    key={child.props.stepKey}
                    style={{display}}>
                    {child}
                </div>)
        });
        return componentArr;
    }

    __renderPager(): Object {
        let currentStep = this.__getCurrentStep();
        if (currentStep === undefined) {
            return [];
        }
        let isComplete = currentStep.index === this.__steps.length - 1;
        let rightOnClick = isComplete ? this.__onComplete : this.__handleNextButtonClick;
        let rightIcon = isComplete ? "fa-check-circle" : "fa-arrow-right";
        let rightText = isComplete ? this.props.complete : this.props.next;
        return (
            <Pager>
                <Pager.Item
                    previous
                    style={{display: currentStep.index == 0 ? "none" : "inherit"}}
                    onClick={this.__handlePreviousButtonClick}
                >
                    <FaIcon code="fa-arrow-left"/>{this.props.previous}
                </Pager.Item>
                <Pager.Item
                    next
                    onClick={rightOnClick}
                >
                    {rightText}<FaIcon code={rightIcon}/>
                </Pager.Item>
            </Pager>
        );
    }

    __handleNextButtonClick() {
        let currentStep = this.__getCurrentStep();
        if (currentStep === undefined) {
            return;
        }
        let nextStep = this.__steps[currentStep.index + 1];
        if (nextStep === undefined) {
            return;
        }
        this.__onChange(nextStep);
    }

    __handlePreviousButtonClick() {
        let currentStep = this.__getCurrentStep();
        if (currentStep === undefined) {
            return;
        }
        let previousStep = this.__steps[currentStep.index - 1];
        if (previousStep === undefined) {
            return;
        }
        this.__onChange(previousStep);
    }

    __getCurrentStep(): Object {
        return Arrays.getValueByKey(this.__steps, "stepKey", this.state.currentKey);
    }

    __onComplete() {
        if (this.props.onComplete) {
            let currentStep = this.__getCurrentStep();
            if (currentStep === undefined) {
                return;
            }
            let currentStepRef = this.__refs[currentStep.stepKey];
            if (currentStepRef === undefined) {
                return;
            }
            let result = currentStepRef.isValid();
            if (result.message) {
                this.__showToast(result.type, result.message);
            }
            if (!result.status) {
                return;
            }

            let stateOfSteps = this.state.stateOfSteps;
            stateOfSteps[currentStep.stepKey] = currentStepRef.__getStateOfStep();
            this.props.onComplete(stateOfSteps)
        }
    }

    __onChange(step: Object) {
        let currentStep = this.__getCurrentStep();
        if (currentStep === undefined || currentStep.stepKey === step.stepKey) {
            return;
        }
        let nextStep = step.index > currentStep.index + 1 ? this.__steps[currentStep.index + 1] : step;

        let nextStepRef = this.__refs[nextStep.stepKey];
        let currentStepRef = this.__refs[currentStep.stepKey];

        if (currentStepRef === undefined || nextStepRef === undefined) {
            return;
        }

        if (step.index > currentStep.index) {
            let result = currentStepRef.isValid();
            if (result.message) {
                this.__showToast(result.type, result.message);
            }
            if (!result.status) {
                return;
            }
        }

        if (this.props.changeState) {
            let state = {currentKey: nextStep.stepKey};
            let stateOfSteps = this.state.stateOfSteps;
            stateOfSteps[currentStep.stepKey] = currentStepRef.__getStateOfStep();
            this.setState(state, () => {
                nextStepRef.__stateOfSteps(stateOfSteps)
            });
        }

        if (this.props.onChange) {
            this.props.onChange({
                target: nextStep
            });
        }
    }

    __showToast(type: String, message: String) {
        switch (type) {
            case "error":
                Toast.error(message);
                break;
            case "info":
                Toast.info(message);
                break;
            case "success":
                Toast.success(message);
                break;
            case "warning":
                Toast.warning(message);
                break;
            default:
                Toast.error(message);
                break;
        }
    }
}
