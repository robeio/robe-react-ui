import React from "react";
import {ShallowComponent, Application} from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Pager from "react-bootstrap/lib/Pager";
import Toast from "../toast/Toast";
import Step from "./Step"
import Button from "react-bootstrap/lib/Button";
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
        onCompleteClick: React.PropTypes.func,
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

    constructor(props:Object) {
        super(props);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            currentKey: this.props.currentKey,
            stateOfSteps: {}
        };
        this.__initSteps(nextProps);
    }

    render():Object {
        return (
            <div id="wizard">
                {this.__renderStepLayout()}
                {this.__renderSteps()}
                {this.__renderPager()}
            </div>
        );
    }

    __renderStepLayout() {
        let steps = [];
        let currentStep = this.__getCurrentStep();
        this.__steps.map((child, idx)=> {
            let previous = currentStep.index >= idx ? "previous-step" : "";
            steps.push(
                <div
                    key={child.props.stepKey}
                    className={`wizard-step ${previous}`}>
                    <button
                        id={(idx+1)}
                        onClick={()=>this.__onChange(child.props)}
                        className="wizard-step-button">
                    </button>
                    <br/>
                    {child.props.title}
                </div>)
        });
        return (
            <div className="wizard">
                <div className="wizard-row">
                    {steps}
                </div>
            </div>);
    }

    __renderSteps() {
        let childArr = [];
        this.__steps.map((child)=> {
            let display = this.state.currentKey === child.props.stepKey ? "inherit" : "none";
            childArr.push(
                <div
                    key={child.props.stepKey}
                    style={{ display }}>
                    {child}
                </div>)
        });
        return childArr;
    }

    __renderPager():Object {
        if (this.__steps.length <= 0) {
            return;
        }
        let currentStep = this.__getCurrentStep();
        let nextButton = null;
        if (currentStep.index === this.__steps.length - 1) {
            if (this.props.onCompleteClick) {
                nextButton = (
                    <Col className="pull-right">
                        <Button
                            bsStyle="primary"
                            onClick={this.__onCompleteClick}
                        >
                            <FaIcon code="fa-check-circle"/>
                            {this.props.complete}
                        </Button>
                    </Col>
                );
            }
        } else {
            nextButton = (
                <Pager.Item
                    next
                    onClick={this.__handleNextButtonClick}
                >
                    {this.props.next} <FaIcon code="fa-arrow-right"/>
                </Pager.Item>
            );
        }
        return (
            <Pager>
                <Pager.Item
                    previous
                    style={{display:currentStep.index==0?"none":"inherit"}}
                    onClick={this.__handlePreviousButtonClick}
                >
                    <FaIcon code="fa-arrow-left"/>{this.props.previous}
                </Pager.Item>
                {nextButton}
            </Pager>
        );
    }

    __handleNextButtonClick() {
        let currentStep = this.__getCurrentStep();
        this.__onChange(this.__steps[currentStep.index + 1].props);
    }

    __handlePreviousButtonClick() {
        let currentStep = this.__getCurrentStep();
        this.__onChange(this.__steps[currentStep.index - 1].props);
    }

    __getCurrentStep() {
        let currentStep = this.__steps[0] ? this.__steps[0].props : undefined;
        this.__steps.map((child)=> {
            if (child.props.stepKey === this.state.currentKey) {
                currentStep = child.props;
            }
        });
        return currentStep;
    }

    __initSteps(props) {
        this.__steps = React.Children.map(props.children,
            (child, idx) => {
                if (child.type === Step) {
                    return React.cloneElement(child, {
                        title: child.props.title || "",
                        stepKey: child.props.stepKey || ("step" + (idx + 1)),
                        index: idx,
                        ref: (step)=> {
                            if (step) {
                                this.__refs[step.props.stepKey] = step;
                            }
                        }
                    });
                }
            });
        this.__steps = this.__steps ? this.__steps : [];
        if (this.state.currentKey === undefined) {
            this.state.currentKey = this.__steps[0].props.stepKey;
        }
    }

    __onCompleteClick() {
        if (this.props.onCompleteClick) {
            let currentStep = this.__getCurrentStep();
            let currentStepRef = this.__refs[currentStep.stepKey];

            let result = currentStepRef.isValid();
            if (result.message) {
                this.__showToast(result.type, result.message);
            }
            if (!result.status) {
                return;
            }

            let stateOfSteps = this.state.stateOfSteps;
            stateOfSteps[currentStep.stepKey] = currentStepRef.__getStateOfStep();
            this.props.onCompleteClick(stateOfSteps)
        }
    }

    __onChange(step) {
        let currentStep = this.__getCurrentStep();
        if (currentStep.stepKey === step.stepKey) {
            return;
        }
        let isNext = step.index > currentStep.index;
        let nextStep = isNext ? this.__steps[currentStep.index + 1].props : step;

        if (isNext) {
            let result = this.__refs[currentStep.stepKey].isValid();
            if (result.message) {
                this.__showToast(result.type, result.message);
            }
            if (!result.status) {
                return;
            }
        }

        if (this.props.changeState) {
            let currentStepRef = this.__refs[currentStep.stepKey];
            let nextStepRef = this.__refs[nextStep.stepKey];

            let state = {currentKey: nextStep.stepKey};
            let stateOfSteps = this.state.stateOfSteps;
            stateOfSteps[currentStep.stepKey] = currentStepRef.__getStateOfStep();

            this.setState(state, ()=> {
                nextStepRef.__stateOfSteps(stateOfSteps)
            });
        }

        if (this.props.onChange) {
            this.props.onChange({
                target: nextStep
            });
        }
    }

    __showToast(type, message) {
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
