import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";

class CheckboxListItem extends ShallowComponent {

    static propTypes = {
        checked: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        onCheck: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        value: React.PropTypes.string
    };

    static style = {
        wordWrap: "break-word",
        display: "inline"
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            selected: this.props.selected
        };

    };

    render() {
        let className = this.state.selected ? "list-group-item list-group-item-primary active" : "list-group-item";
        let icon = this.state.checked ? " state-icon fa fa-check-circle-o" : " state-icon fa fa-circle-o";
        return (
            <Col onClick={this.__onSelect.bind(null,this.props.value)}>
                <Col componentClass="li" className={className}>
                    <span className={icon} onClick={this.__onCheck.bind(null,this.props.value)}/>
                    <label style={CheckboxListItem.style}>{this.props.label}</label>
                </Col>
            </Col>
        );
    };

    __onCheck = (value, e)=> {
        if (this.state.selected) {
            this.setState({
                checked: !this.state.checked
            });
            this.props.onCheck(value, !this.state.checked, this);
            e.stopPropagation();
        }
    };
    __onSelect = (value, e)=> {
        this.props.onSelect(value, true, this);
        e.stopPropagation();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    };

}
module.exports = CheckboxListItem;