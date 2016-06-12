import React from "react";
import { ShallowComponent } from "robe-react-commons";
import is from "is-js";
import FaIcon from "faicon/FaIcon";
import moment from "moment";

/**
 * TODO removing un used css
 */

class DataTableBodyRow extends ShallowComponent {

    static propTypes = {
        onClick: React.PropTypes.func
    };

    constructor(props: Object) {
        super(props);
        moment.locale("tr");
        this.state = {
            selected: false
        };
    };

    render() {
        return this.__generateRow(this.props.columns, this.props.data);
    };

    __generateRow = (columns, row) => {

        if (!row)
            return;
        if (!is.object(row)) {
            console.warn("Undefined data row at:", i, row);
            return;
        }
        var rowColumns = [];
        for (var j = 0; j < columns.length; j++) {
            var column = columns[j];
            if (column.visible != false) {

                var value = row[column.code];
                //rowColumns
                if (column.type === "bool") {
                    value = value ? <FaIcon size={""} code="fa-check-square-o"/> :
                        <FaIcon size={""} code="fa-square-o"/>;
                } else if (column.type === "password") {
                    value = "******";
                } else if (column.type === "date") {
                    if (value) {
                        let format = column.format ? column.format : "DD/MM/YYYY";
                        value = moment(value).format(format);
                    }

                } else if (column.type === "list") {

                    var dataTextField = column.dataTextField || "name";
                    var dataValueField = column.dataValueField || "oid";

                    if (is.object(this.props.resources)) {
                        var data = this.props.resources[column.code];

                        if (data) {
                            for (let i = 0; i < data.length; i++) {
                                let item = data [i];
                                if (item[dataValueField] == value) {
                                    value = item[dataTextField];
                                    break;
                                }
                            }
                        }
                    }
                } else if (column.type === "upload") {
                    continue;
                }
                rowColumns.push(<td key={column.code}>{value}</td>);
            }

        }
        var rowClassName = "datagrid-body-row";
        if (this.state.selected) {
            rowClassName = rowClassName + "-selected";
        }


        return (
            <tr className={rowClassName}
                onClick={this.__onClick}>
                {rowColumns}
            </tr>);

    }
        ;
    __onClick = (e)=> {
        if (this.props.onSelection)
            this.props.onSelection(this);
        if (this.props.onClick)
            this.props.onClick(this.props.data);
    };

}


module.exports = DataTableBodyRow;