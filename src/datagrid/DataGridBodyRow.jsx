import React from "react";
import moment from "moment";
import { ShallowComponent } from "robe-react-commons";
import is from "is-js";
import FaIcon from "../faicon/FaIcon";

export default class DataTableBodyRow extends ShallowComponent {

    /**
     * @type {func}
     */
    static propTypes = {
        onClick: React.PropTypes.func,
        resources: React.PropTypes.object,
        fields: React.PropTypes.array,
        data: React.PropTypes.object,
        onSelection: React.PropTypes.func
    };

    constructor(props: Object) {
        super(props);
        moment.locale("tr");
        this.state = {
            selected: false
        };
    }

    render(): Object {
        return this.__generateRow(this.props.fields, this.props.data);
    }

    __generateRow(fields: Array<Map>, row: Object): Object {
        if (!row) {
            return null;
        }

        if (!is.object(row)) {
            throw Error(`Undefined data row at: ${row}`);
        }
        let rowColumns = [];
        for (let j = 0; j < fields.length; j++) {
            let column = fields[j];
            if (column.visible !== false) {
                let value = row[column.code];
                switch (column.type) {
                    case "bool":
                        value = value ? <FaIcon size={"fa-lg"} code="fa-check-square-o" /> :
                            <FaIcon size={"fa-lg"} code="fa-square-o" />;
                        break;
                    case "date": {
                        let format = column.format ? column.format : "DD/MM/YYYY";
                        let date = moment(value);
                        value = date.isValid() ? date.format(format) : "";
                        break;
                    }
                    case "password":
                        value = "******";
                        break;
                    case "check":
                    case "CheckInput": {
                        value = this.__getTextValue(column, value);
                        if (value === true) {
                            value = <FaIcon size={"fa-lg"} code="fa-check-square-o" />;
                        } else if (value === false) {
                            value = <FaIcon size={"fa-lg"} code="fa-square-o" />;
                        }
                        break;
                    }
                    case "list":
                    case "select":
                    case "SelectInput":
                        value = this.__getTextValue(column, value);
                        break;
                    case "radio":
                        value = this.__getTextValue(column, value);
                        break;
                    default:
                        break;
                }
                rowColumns.push(<td key={column.code}>{value}</td>);
            }
        }
        let rowClassName = "datagrid-body-row";
        if (this.state.selected) {
            rowClassName = `${rowClassName}-selected`;
        }
        return (
            <tr className={rowClassName} onClick={this.__onClick}>
                {rowColumns}
            </tr>
        );
    }

    __getTextValue(column: Object, selectedValues: any): any {
        let isMultipleSelection = !!column.items;
        if (!isMultipleSelection) {
            return selectedValues;
        }
        selectedValues = [].concat(selectedValues);
        let textOfValues = [];
        let dataTextField = column.dataTextField || "text";
        let dataValueField = column.dataValueField || "value";
        for (let i = 0; i < column.items.length; i++) {
            let item = column.items[i];
            for (let k = 0; k < selectedValues.length; k++) {
                let selectedValue = selectedValues[k];
                if (String(item[dataValueField]) === selectedValue) {
                    textOfValues.push(item[dataTextField]);
                }
            }
        }
        return textOfValues.join("\n");
    }

    __onClick() {
        if (this.props.onSelection) {
            this.props.onSelection(this);
        }

        if (this.props.onClick) {
            this.props.onClick(this.props.data);
        }
    }

    shouldComponentUpdate(): boolean {
        return true;
    }

}
