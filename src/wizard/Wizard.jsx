import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Col from "react-bootstrap/lib/Col";
import Pager from "react-bootstrap/lib/Pager";
import PageItem from "react-bootstrap/lib/PageItem";
import NotificationManager from "react-notifications/lib/NotificationManager";
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
        currentStep: React.PropTypes.number,
        /**
         * Text for the next button.
         */
        nextButtonText: React.PropTypes.string,
        /**
         * Text for the previous button.
         */
        preButtonText: React.PropTypes.string,
        /**
         * Text for the complete button.
         */
        completeButtonText: React.PropTypes.string
    };

    static defaultProps = {
        currentStep: 0,
        nextButtonText: "Next",
        preButtonText: "Previous",
        completeButtonText: "Finish"
    };
    __stepValidInfo = [];
    __content = undefined;


    constructor(props: Object) {
        super(props);
        this.state = {
            currentStep: this.props.currentStep,
            valid: true
        };
    }

    render(): Object {
        return (
            <div>
                <Col className="wizard">
                    <Col className="wizard-row setup-panel">
                        {this.__renderSteps()}
                    </Col>
                </Col>
                {this.__renderContent()}
                {this.__renderPager()}
            </div>
        );
    }

    __renderSteps(): Array {
        let steps = [];
        for (let i = 0; i < this.props.steps.length; i++) {
            let item = this.props.steps[i];
            let styleClass = (this.state.currentStep === i) ? "btn-primary" : "btn-default";
            let step = (
                <Col key={i} className="wizard-step">
                    <a
                        onClick={() => { this.__onClickStepButton(i); }}
                        className={`btn btn-circle ${styleClass}`}
                    >
                        {i + 1}
                    </a>
                    <p>{item.title}</p>
                </Col>);
            steps.push(step);
        }
        return steps;
    }

    __onClickStepButton(index: number) {
        if (this.state.currentStep === index) {
            return;
        }
        this.__stepValidInfo[this.state.currentStep] = this.isValid();

        let state = {};
        if (this.state.currentStep < index) {
            if (this.__areStepsValid(this.state.currentStep, index)) {
                state.currentStep = index;
                this.setState(state);
            }
        } else if (this.state.currentStep > index) {
            state.currentStep = index;
            this.setState(state);
        }
    }

    __areStepsValid(start: number, end: number): boolean {
        for (start; start < end; start++) {
            if (!this.__stepValidInfo[start]) {
                return false;
            }
        }
        return true;
    }

    __renderContent(): Object {
        this.__content = this.props.steps[this.state.currentStep].component;
        return this.__content;
    }

    __handleNextButtonClick() {
        this.__onClickStepButton(this.state.currentStep + 1);
    }

    __handlePreviousButtonClick() {
        this.__onClickStepButton(this.state.currentStep - 1);
    }

    __renderPager(): Object {
        let nextButton = undefined;
        if (this.state.currentStep === this.props.steps.length - 1) {
            nextButton = (
                <Col className="pull-right">
                    <Button
                        bsStyle="primary"
                        onClick={this.props.onCompleteClick}
                    >
                    <FaIcon
                        code="fa-check-circle"
                    />
                    {this.props.completeButtonText}
                    </Button>
                </Col>
            );
        } else {
            nextButton = (
                <PageItem
                    next
                    disabled={!this.state.valid}
                    onClick={this.__handleNextButtonClick}
                >
                    {this.props.nextButtonText} <FaIcon code="fa-arrow-right"/>
                </PageItem>
            );
        }
        return (
            <Pager>
                <PageItem
                    previous
                    disabled={this.state.currentStep === 0}
                    onClick={this.state.currentStep === 0 ? null : this.__handlePreviousButtonClick}
                >
                    <FaIcon code="fa-arrow-left"/>{this.props.preButtonText}
                </PageItem>
                {nextButton}
            </Pager>
        );
    }

    isValid(): boolean {
        if (this.__content === undefined) {
            return false;
        }
        if (!this.__content._owner) {
            return true;
        }
        
        let result = this.__content._owner._instance.refs.step.isValid(); // eslint-disable-line no-underscore-dangle
        if (!result) {
            NotificationManager.error(result.message);
            return false;
        }
        return true;
    }
}
