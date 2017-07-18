import React from "react";
import PropTypes from "prop-types";
import {ShallowComponent} from "robe-react-commons";
import {Col, Collapse} from "react-bootstrap";
import "./Card.css";

export default class Card extends ShallowComponent {

    static propTypes = {
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number,
        style: PropTypes.object,
        border: PropTypes.bool,
        margin: PropTypes.bool,
        show: PropTypes.bool,
        className: PropTypes.string
    };

    static defaultProps = {
        xs: 12,
        sm: undefined,
        md: undefined,
        lg: undefined,
        border: true,
        margin: true,
        show: true
    };

    constructor(props) {
        super(props);
    }

    render() {
        let className = "rb-card";
        if (!this.props.border) {
            className += " rb-no-border";
        }
        if (!this.props.margin) {
            className += " rb-no-margin";
        }

        return (
            <Collapse in={this.props.show}>
                <div>
                    <Col
                        xs={this.props.xs}
                        sm={this.props.sm}
                        md={this.props.md}
                        lg={this.props.lg}
                        className={this.props.className}
                        style={{padding: 0}}>
                        <div
                            className={className}
                            style={this.props.style}>
                            {this.__renderHeader()}
                            {this.props.children}
                        </div>
                    </Col>
                </div>
            </Collapse>
        );
    }

    __renderHeader() {
        if (!this.props.header) {
            return;
        }
        return (<h4>{this.props.header}</h4>)
    }
}
