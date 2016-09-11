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

const propsOfFields = {
    job: {
        "items": [
            {
                "value": "sd",
                "text": "Software Developer"
            },
            {
                "value": "sa",
                "text": "Software Architect"
            }
        ]
    },
    gender: {
        "items": [
            {
                "value": "male",
                "text": "Erkek"
            },
            {
                "value": "female",
                "text": "Kadın"
            }
        ]
    }
};

export default class DataGridSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    static idField = "id";

    constructor(props: Object) {
        super(props);

        let store1 = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://localhost:3000/users"
            }),
            idField: DataGridSample.idField,
            autoLoad: true
        });
        let store2 = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://localhost:3000/users"
            }),
            idField: DataGridSample.idField,
            autoLoad: true
        });

        this.state = {
            fields: DataGridModel.fields,
            store1: store1,
            store2: store2,
            showModal: false,
            item: {}
        };
    }

    static tableRef = "table";

    render(): Object {
        return (
            <span>
                <DataGrid
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                    store={this.state.store1}
                    ref={DataGridSample.tableRef}
                    toolbar={["create", "edit", "delete"]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    pageable={true}
                    editable={true}
                    pagination={{ emptyText: "No data.", pageSize: 50 }}
                    modalConfirm={{ header: "Please do not delete me." }}
                    />
                <DataGrid
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                    store={this.state.store2}
                    toolbar={[{ name: "custom", text: "Custom", icon: "fa-university" }]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    pageable={true}
                    editable={true}
                    pagination={{ pageSize: 3 }}
                    modalConfirm={{ header: "Please do not delete me." }}
                    pageSizeButtons={["1", "2", "3"]}
                    />
                <ModalDataForm
                    header="Modal Data Form"
                    show={this.state.showModal}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    item={this.state.item}
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
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
            this.state.store1.update(this.state.item, newData);
        } else {
            this.state.store1.create(newData);
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
