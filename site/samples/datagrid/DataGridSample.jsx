import React from "react";
import {
    ShallowComponent,
    Store,
    RemoteEndPoint,
    Assertions
} from "robe-react-commons";
import ModalDataForm from "form/ModalDataForm";
import DataGrid from "datagrid/DataGrid";
import DataGridModel from "./DataGridModel.json";
export default class DataGridSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    static idField = "id";

    constructor(props:Object) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://localhost:3000/users"
            }),
            idField: DataGridSample.idField,
            autoLoad: true
        });

        this.state = {
            fields: DataGridModel.fields,
            store: store,
            showModal: false,
            item: {}
        };
    }

    static tableRef = "table";

    render():Object {
        return (

            <span>
            <DataGrid
                fields={this.state.fields}
                store={this.state.store}
                ref={DataGridSample.tableRef}
                toolbar={["create", "edit", { name: "custom", text: "Custom", icon: "fa-university" }]}
                onNewClick={this.__add}
                onEditClick={this.__edit}
                onDeleteClick={this.__remove}
                exportButton={true}
                pageable={true}
                editable={true}
                pagination={{ emptyText: "No data.", pageSize: 50 }}
                modalConfirm={{ header: "Please do not delete me." }}
            />
            <ModalDataForm
                header="Modal Data Form"
                show={this.state.showModal}
                onSubmit={this.__onSave}
                onCancel={this.__onCancel}
                item={this.state.item}
                fields={this.state.fields}
            />
            </span>
        );
    }

    __add = () => {
        let empty = {};
        this.__showModal(empty);
    };

    __edit = () => {
        let selectedRows = this.refs[DataGridSample.tableRef].getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    };

    __onCancel = () => {
        this.setState({ showModal: false });
    };

    __onSave = (newData, callback) => {
        let id = newData[DataGridSample.idField];
        if (Assertions.isNotEmpty(id)) {
            this.state.store.update(this.state.item, newData);
        } else {
            this.state.store.create(newData);
        }
        if (newData) {
            callback(true);
            this.setState({
                showModal: true
            });
        }

        // this.refs[DataGridSample.tableRef].__readData();
    };

    __remove = () => {
        let selectedRows = this.refs[DataGridSample.tableRef].getSelectedRows();
        console.log("removing ", selectedRows[0]);
    };

    __showModal = (newItem) => {
        this.setState({ showModal: true, item: newItem });
    };
}
