import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";


class CheckBoxTree extends BaseComponent {

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

    constructor(props) {
        super(props);

        this.state = {
            checkedItems: this.props.checkedItems || [],
            selected: this.props.selected || []
        };
    };

    render() {


        let checked = false;
        var value = this.props.data[this.props.dataValueField];
        if (this.state.checkedItems.indexOf(value) !== -1) {
            checked = true;
        }

        let isSelected = false;
        var selected = this.props.data[this.props.dataValueField];
        if (this.state.selected.indexOf(value) !== -1) {
            isSelected = true;
        }

        let className = isSelected ? "selected" : "";

        let input = checked ?
            <input
                type="checkbox"
                value={value}
                checked
                onChange={this.__handleChange.bind(null,value)}/> :
            <input
                type="checkbox"
                value={value}
                onChange={this.__handleChange.bind(null,value)}/>;


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


    __handleChange = (value, e)=> {

        if (this.props.parent) {
            if (this.props.parent.__handleChange) {
                this.props.parent.__handleChange(value, e);
            }
        } else {
            if (this.props.onChange) {
                this.props.onChange(value, e.target.checked);
            }
        }

    };

    __renderChildren = ()=> {

        if (this.props.data[this.props.childrenKey] && this.props.data[this.props.childrenKey].length > 0) {
            var childrens = this.props.data[this.props.childrenKey];
            let items = [];

            for (let i = 0; i < childrens.length; i++) {
                var item = childrens[i];

                var value = this.props.data[this.props.dataValueField];

                items.push(<CheckBoxTree data={this.props.data}
                                         selected={this.props.selected}
                                         value={this.props.value}
                                         key={i}
                                         data={item}
                                         dataTextField={this.props.dataTextField}
                                         dataValueField={this.props.dataValueField}
                                         childrenKey={this.props.childrenKey}
                                         parent={this}
                                         onChange={this.__handleChange.bind(null,value)}
                                         checkedItems={this.state.checkedItems}
                />);

            }
            return items;
        } else {
            return null;
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            checkedItems: nextProps.checkedItems || [],
            selected: nextProps.selected || [],
        });
    };
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    };
}

module.exports = CheckBoxTree;