import React from "react";
import { ShallowComponent } from "robe-react-commons";
import is from "is-js";
import ComponentManager from "../form/ComponentManager";

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
            <tr className={rowClassName} onClick={this.__onClick} key={row[this.props.idField]}>
                {cells}
            </tr>
        );
    }

    __cellRenderer(idx: number, fields: Array, row: Object): Object {
        let column = fields[idx];
        if (column.visible !== false) {
            let value = row[column.name];
            let result = ComponentManager.getDisplayAsText(column.type, column, value);
            return (<td key={column.name}>{result}</td>);
        }
        return undefined;
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
