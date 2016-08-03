import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DataGrid from "datagrid/DataGrid";
import DataGridModel from "./DataGridModel.json";
import Store from "robe-react-commons/lib/stores/Store";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import ModalDataForm from "form/ModalDataForm";


export default class DataGridSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    constructor(props:Object) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://localhost:3000/users"
            }),
            autoLoad: true
        });

        this.state = {
            columns: DataGridModel.columns,
            store: store,
            showModal: false,
            item: {}
        };
    }

    render():Object {
        return (

            <span>
            <DataGrid
                toolbar={["create", "edit", { name: "custom", text: "Custom", icon: "fa-university" }]}
                columns={this.state.columns}
                stores={[this.state.store]}
                ref="table"
                onNewClick={this.__add}
                onEditClick={this.__edit}
                onDeleteClick={this.__remove}
                exportButton={true}
                pageable={true}
                editable={true}
                pagination={{ emptyText: "No data." }}
                modalConfirm={{ header: "Please do not delete me." }}
            />
            <ModalDataForm
                ref="detailModal"
                header="Modal Data Form"
                show={this.state.showModal}
                onSubmit={this.__onSave}
                onCancel={this.__onCancel}
                item={this.state.item}
                fields={this.state.columns} />
            </span>
        );
    }

    __add = () => {
        let empty = {};
        this.__showModal(empty);
    };

    __edit = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    };

    __onCancel = () => {
        this.setState({ showModal: false });
    };

    __onSave = (oldData, newData, callback) => {
        console.log("saving ", newData);
    };

    __remove = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        console.log("removing ", selectedRows[0]);
    };

    __showModal = (newItem) => {
        this.setState({ showModal: true, item: newItem });
    };
}
