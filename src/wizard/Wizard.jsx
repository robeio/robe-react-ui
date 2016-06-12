import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Pager from "react-bootstrap/lib/Pager";
import PageItem from "react-bootstrap/lib/PageItem";
import NotificationManager from "react-notifications/lib/NotificationManager";
import Button from "react-bootstrap/lib/Button";
import FaIcon from "faicon/FaIcon";
import "wizard/style.css";


export default class Wizard extends ShallowComponent {

    stepValidInfo = [];
    content = undefined;


    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0
        };
    }
    render() {
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

    __renderSteps = () => {
        let steps = [];
        for (let i = 0; i < this.props.steps.length; i++) {
            let item = this.props.steps[i];
            let styleClass = (this.state.currentStep === i) ? "btn-primary" : "btn-default";
            let step = (
                <Col key={i} className="wizard-step">
                    <Col
                        componentClass="a" type="button"
                        onClick={this.__onClickStepButton(i)}
                        className={`btn btn-circle ${styleClass}`}
                    >
                        {i + 1}
                    </Col>
                    <p>{item.title}</p>
                </Col>);
            steps.push(step);
        }
        return steps;
    };

    __onClickStepButton = (index) => {
        if (this.state.currentStep === index) {
            return;
        }
        this.stepValidInfo[this.state.currentStep] = this.isValid();

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
    };
    __areStepsValid = (start, end) => {
        for (start; start < end; start++) {
            if (!this.stepValidInfo[start]) {
                return false;
            }
        }
        return true;
    };

    __renderContent = () => {
        this.content = this.props.steps[this.state.currentStep].component;
        return this.content;
    };

    __handleNextButtonClick = () => {
        this.__onClickStepButton(this.state.currentStep + 1);
    };

    __handlePreviousButtonClick = () => {
        this.__onClickStepButton(this.state.currentStep - 1);
    };

    __renderPager = () => {
        let nextButton = undefined;
        if (this.state.currentStep === this.props.steps.length - 1) {
            nextButton = (
                <Col className="pull-right">
                    <Button
                        bsStyle="primary"
                        onClick={this.props.onCompleteClick}
                    >
                        <FaIcon
                        size="fa-lg"
                        code="fa-check-circle"
                        />
                        Onaya Gönder
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
                    Sonraki Adım &rarr;
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
                    &larr;Önceki Adım
                </PageItem>
                {nextButton}
            </Pager>
        );
    };
    isValid = () => {
        let result = this.content._owner._instance.refs.step.isValid();
        if (!result.status) {
            NotificationManager.error(result.message);
            return false;
        }

        return true;
    };
}
