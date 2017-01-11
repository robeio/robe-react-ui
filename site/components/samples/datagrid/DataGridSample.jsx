import React from "react";
import {
    ShallowComponent,
    Store,
    RemoteEndPoint,
    Assertions,
    LocalEndPoint
} from "robe-react-commons";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import DataGridModel from "./DataGridModel.json";
import { ControlLabel } from "react-bootstrap";


const propsOfFields = {
    job: {
        items: [
            {
                value: "sd",
                text: "Software Developer"
            },
            {
                value: "sa",
                text: "Software Architect"
            }
        ]
    },
    gender: {
        items: [
            {
                value: "male",
                text: "Erkek"
            },
            {
                value: "female",
                text: "Kadın"
            }
        ]
    }
};

export default class DataGridSample extends ShallowComponent {

    static idField = "id";

    constructor(props: Object) {
        super(props);

        let store1 = new Store({
            endPoint: new LocalEndPoint({
                data: [{ id: 1, name: "John", surname: "Doe" }, { name: "Jane", surname: "Roe", id: 2 }],
                idField: DataGridSample.idField
            }),
            idField: DataGridSample.idField,
            autoLoad: true
        });
        let store2 = new Store({
            endPoint: new LocalEndPoint({
                data: [{ id: 1, name: "John", surname: "Doe" }, { name: "Jane", surname: "Roe", id: 2 }],
                idField: DataGridSample.idField
            }),
            idField: DataGridSample.idField,
            autoLoad: true
        });

        let store3 = new Store({
            endPoint: new LocalEndPoint({
                data: [{ id: 1, name: "John", surname: "Doe" }, { name: "Jane", surname: "Roe", id: 2 }],
                idField: DataGridSample.idField
            }),
            idField: DataGridSample.idField,
            autoLoad: true
        });

        this.state = {
            fields: DataGridModel.fields,
            store1: store1,
            store2: store2,
            store3: store3,
            showModal: false,
            item: {}
        };
    }

    render(): Object {
        return (
            <span>
                <ControlLabel>DataGrid (CRUD Toolbar)</ControlLabel>
                <DataGrid
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                    store={this.state.store1}
                    ref="table1"
                    toolbar={["create", "edit", "delete"]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    editable={true}
                />
                <ControlLabel>DataGrid (Custom Toolbar and Pagination)</ControlLabel>
                <DataGrid
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                    store={this.state.store2}
                    toolbar={[{ name: "custom", text: "Custom", icon: "fa-university" }]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    editable={true}
                    refreshable={true}
                    pagination={{ pageSize: 1 }}
                    pageSizeButtons={["1", "2", "3"]}
                />
                <ControlLabel>DataGrid (Custom Cell Renderer)</ControlLabel>
                <DataGrid
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                    store={this.state.store3}
                    exportButton={true}
                    cellRenderer={DataGridSample.cellRenderer}
                />
                <ModalDataForm
                    show={this.state.showModal}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    defaultValues={this.state.item}
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                />
            </span>
        );
    }

    __add() {
        let empty = {};
        this.__showModal(empty);
    }

    __edit() {
        let selectedRows = this.refs.table1.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    }

    __onCancel() {
        this.setState({ showModal: false });
    }

    __onSave(newData: Object, callback: Function) {
        let id = newData[DataGridSample.idField];
        if (Assertions.isNotEmpty(id)) {
            this.state.store1.update(newData);
        } else {
            this.state.store1.create(newData);
        }
        if (newData) {
            callback(true);
            this.setState({
                showModal: true
            });
        }
    }

    __remove() {
        let selectedRows = this.refs.table1.getSelectedRows();
        this.state.store1.delete(selectedRows[0]);
    }

    __showModal(newItem: Object) {
        this.setState({ showModal: true, item: newItem });
    }

    static cellRenderer(idx: number, fields: Array, row: Object) {
        if (fields[idx].visible !== false) {
            return <td key={fields[idx].name}><FaIcon code={"fa-smile-o"} /> {row[fields[idx].name]}</td>;
        }
        return undefined;
    }
}
