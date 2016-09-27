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
        onSelection: React.PropTypes.func,

        /**
         * Render method for the row. Use for custom row templates
         */
        rowRenderer: React.PropTypes.func,

        /**
         * Render method for the cell. Use for custom cell templates.
         * Default row template will call for every cell render event.
         */
        cellRenderer: React.PropTypes.func
    };

    constructor(props: Object) {
        super(props);
        moment.locale("tr");
        this.state = {
            selected: false
        };
    }

    render(): Object {
        if (this.props.rowRenderer !== undefined) {
            return this.props.rowRenderer(this.props.fields, this.props.data);
        }
        return this.__generateRow(this.props.fields, this.props.data);
    }

    __generateRow(fields: Array<Map>, row: Object): Object {
        if (!row) {
            return null;
        }

        if (!is.object(row)) {
            throw Error(`Undefined data row at: ${row}`);
        }
        let cells = [];
        for (let j = 0; j < fields.length; j++) {
            let cell;
            if (this.props.cellRenderer !== undefined) {
                cell = this.props.cellRenderer(j, fields, row);
            } else {
                cell = this.__cellRenderer(j, fields, row);
            }
            if (cell !== undefined) {
                cells.push(cell);
            }
        }
        let rowClassName = "datagrid-body-row";
        if (this.state.selected) {
            rowClassName = `${rowClassName}-selected`;
        }
        return (
            <tr className={rowClassName} onClick={this.__onClick}>
                {cells}
            </tr>
        );
    }

    __cellRenderer(idx: number, fields: Array, row: Object): Object {
        let column = fields[idx];
        if (column.visible !== false) {
            let value = row[column.name];
            switch (column.type) {
                case "date": {
                    let format = column.format ? column.format : "DD/MM/YYYY";
                    let date = moment(value);
                    value = date.isValid() ? date.format(format) : "";
                    break;
                }
                case "password":
                    value = "******";
                    break;
                case "check": {
                    value = this.__getTextValue(column, value);
                    if (value === true) {
                        value = <FaIcon size={"fa-lg"} code="fa-check-square-o" />;
                    } else if (value === false) {
                        value = <FaIcon size={"fa-lg"} code="fa-square-o" />;
                    }
                    break;
                }
                case "select":
                    value = this.__getTextValue(column, value);
                    break;
                case "radio":
                    value = this.__getTextValue(column, value);
                    break;
                default:
                    break;
            }
            return (<td key={column.name}>{value}</td>);
        }
        return undefined;
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
