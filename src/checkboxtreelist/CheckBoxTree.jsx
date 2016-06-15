import React from "react";
import { ShallowComponent } from "robe-react-commons";

class CheckBoxTree extends ShallowComponent {

    static propTypes = {
        data: React.PropTypes.object,
        dataTextField: React.PropTypes.string.isRequired,
        dataValueField: React.PropTypes.string.isRequired,
        childrenKey: React.PropTypes.string.isRequired,
        value: React.PropTypes.array,
        selected: React.PropTypes.array
    };

    static defaultProps = {
        parent: undefined
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            checkedItems: this.props.checkedItems || [],
            selected: this.props.selected || []
        };
    }

    render(): string {
        let checked = false;
        let value = this.props.data[this.props.dataValueField];
        if (this.state.checkedItems.indexOf(value) !== -1) {
            checked = true;
        }

        let isSelected = false;
        // let selected = this.props.data[this.props.dataValueField];
        if (this.state.selected.indexOf(value) !== -1) {
            isSelected = true;
        }

        let className = isSelected ? "selected" : "";

        let input = checked ?
            <input
                type="checkbox"
                value={value}
                checked
                onChange={this.__handleChange(value)}
            /> :
            <input
                type="checkbox"
                value={value}
                onChange={this.__handleChange(value)}
            />;
        return (
            <li>
                <label className="checkbox">
                    {input}
                    <strong className={className}>{this.props.data.text}</strong>
                </label>
                <ul>
                    {this.__renderChildren()}
                </ul>
            </li>
        );
    }
    __handleChange = (value: Object, e: Object) => {
        if (this.props.parent) {
            if (this.props.parent.__handleChange) {
                this.props.parent.__handleChange(value, e);
            }
        } else {
            if (this.props.onChange) {
                this.props.onChange(value, e.target.checked);
            }
        }
    }

    __renderChildren = () => {
        if (this.props.data[this.props.childrenKey] && this.props.data[this.props.childrenKey].length > 0) {
            let childrens = this.props.data[this.props.childrenKey];
            let items = [];

            for (let i = 0; i < childrens.length; i++) {
                let item = childrens[i];

                let value = this.props.data[this.props.dataValueField];

                items.push(<CheckBoxTree
                    data={this.props.data}
                    selected={this.props.selected} value={this.props.value}
                    key={i}
                    data={item}
                    dataTextField={this.props.dataTextField}
                    dataValueField={this.props.dataValueField}
                    childrenKey={this.props.childrenKey}
                    parent={this}
                    onChange={this.__handleChange(value)}
                    checkedItems={this.state.checkedItems}
                />);
            }
            return items;
        }
        return null;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checkedItems: nextProps.checkedItems || [],
            selected: nextProps.selected || []
        });
    }
    shouldComponentUpdate() {
        return true;
    }
}

module.exports = CheckBoxTree;
