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
                        value = date.isValid() ? date.format(format) : "Invalid date";
                        break;
                    }
                    case "password":
                        value = "******";
                        break;
                    case "list":
                    case "radio":
                        value = this.__getCollectionValue(column, value);
                        break;
                    case "upload":
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

    __getCollectionValue(column, value) {
        if (column.items && Array.isArray(column.items)) {
            let dataTextField = column.dataTextField || "text";
            let dataValueField = column.dataValueField || "value";
            for (let k = 0; k < column.items.length; k++) {
                let item = column.items[k];
                if (item[dataValueField] === value) {
                    return item[dataTextField];
                }
            }
        }
        return value;
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
