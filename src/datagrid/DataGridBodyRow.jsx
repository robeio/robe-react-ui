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
                if (column.type === "bool") {
                    value = value ? <FaIcon size={"fa-lg"} code="fa-check-square-o" /> :
                        <FaIcon size={"fa-lg"} code="fa-square-o" />;
                } else if (column.type === "password") {
                    value = "******";
                } else if (column.type === "date") {
                    if (value) {
                        let format = column.format ? column.format : "DD/MM/YYYY";
                        value = moment(value).format(format);
                    }
                } else if (column.type === "list") {
                    let dataTextField = column.dataTextField || "name";
                    let dataValueField = column.dataValueField || "oid";

                    if (is.object(this.props.resources)) {
                        let data = this.props.resources[column.code];
                        if (data) {
                            for (let i = 0; i < data.length; i++) {
                                let item = data[i];
                                if (item[dataValueField] === value) {
                                    value = item[dataTextField];
                                    break;
                                }
                            }
                        }
                    }
                } else if (column.type === "upload") {
                    /* eslint-disable no-continue */
                    continue;
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
