import React from "react";
import { ShallowComponent } from "robe-react-commons";
import CheckBoxTree from "checkboxtreelist/CheckBoxTree";
import "checkboxtreelist/style.css";

class CheckboxTreeView extends ShallowComponent {

    static propTypes = {
        dataTextField: React.PropTypes.string.isRequired,
        dataValueField: React.PropTypes.string.isRequired,
        data: React.PropTypes.array.isRequired,
        childrenKey: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        value: React.PropTypes.array,
        selected: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: this.props.value || [],
            selected: this.props.selected || []
        };
    };

    render() {

        let items = [];

        var data = this.props.data;

        for (let i = 0; i < data.length; i++) {
            var item = data[i];
            let checked = false;
            let value = this.__getDataValueField(item);
            if (this.state.checkedItems.indexOf(value) !== -1) {
                checked = true;
            }
            items.push(<CheckBoxTree
                key={i}
                checked={checked}
                checkedItems = {this.state.checkedItems}
                selected={this.state.selected}
                dataTextField={this.props.dataTextField}
                dataValueField={this.props.dataValueField}
                value={this.props.value}
                childrenKey={this.props.childrenKey}
                data={item}
                onChange={this.__onChange}/>);
        }
        return (
            <div className="checkboxtree-scroll" style={this.props.style} >
                <ul>
                    {items}
                </ul>
            </div>
        );
    };

    __onChange = (value, status)=> {

        if (this.props.onChange) {
            this.props.onChange(value, status);
        }
    };

    __getDataTextField = (item)=> {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || (is.object(item) ? "" : item);
        }
        return item;
    };
    __getDataValueField = (item)=> {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || (is.object(item) ? "" : item);
        }
        return item;
    };
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    };
}

module.exports = CheckboxTreeView;