import React from "react";
import { ShallowComponent, Arrays } from "robe-react-commons";
import Col from "../../../node_modules/react-bootstrap/lib/Col";
import CheckboxListItem from "./CheckboxListItem";
import "./style.css";
import is from "is-js";

export default class CheckboxList extends ShallowComponent {

    static propTypes = {
        data: React.PropTypes.array,
        value: React.PropTypes.array,
        dataTextField: React.PropTypes.string,
        dataValueField: React.PropTypes.string,
        selectable: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onValueChanged: React.PropTypes.func
    };

    static defaultProps = {
        selectable: true
    };

    constructor(props) {
        console.log("item")
        super(props);
        this.state = {
            selected: this.props.selection || "",
            checkedItems: this.props.checkedItems || []
        };
    }

    render(): string {
        let data = this.props.data;
        let listGroupItems = [];

        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let value = this.__getDataValueField(item);
            let checked = false;
            if (this.state.checkedItems.indexOf(value) !== -1) {
                checked = true;
            }
            listGroupItems.push(
                <CheckboxListItem
                    value={value}
                    key={i}
                    checked={checked}
                    label={this.__getDataTextField(item)}
                    onCheck={this.__onItemChecked}
                    onSelect={this.__onSelectionChanged}
                />
            );
        }

        return (
            <Col componentClass="ul" className="list-group checked-list-box checkboxlist-scroll" style={this.props.style}>
                {listGroupItems}
            </Col>
        );
    }

    __onItemChecked = (code, checked, item) => {
        let checkedItems = this.state.checkedItems;
        if (checked) {
            checkedItems.push(code);
            this.__onSelectionChanged(code, checked, item);
        } else {
            Arrays.remove(checkedItems, code);
        }

        this.setState({
            checkedItems: checkedItems
        });

        if (this.props.onChecked) {
            this.props.onChecked(checkedItems, code, checked);
        }

        if (this.props.onValueChanged) {
            this.props.onValueChanged(code, checked);
        }
    };
    __onSelectionChanged = (code, selected, item) => {
        if (this.props.selectable) {
            if (this.state.selection) {
                this.state.selection.setState({
                    selected: false
                });
            }
            item.setState({
                selected: true
            });
            this.setState({
                selection: item
            });

            if (this.props.onSelected) {
                this.props.onSelected(code);
            }
        }
    };


    __getDataTextField = (item) => {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || (is.object(item) ? "" : item);
        }
        return item;
    };
    __getDataValueField = (item) => {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || (is.object(item) ? "" : item);
        }
        return item;
    };
}
