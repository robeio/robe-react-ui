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
import TestUtils from "../TestUtils";

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

export default class DataGridTest extends ShallowComponent {
    /**
     *
     * @param props
     */
    static idField = "id";

    constructor(props:Object) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: TestUtils.createUrl("users")
            }),
            idField: DataGridTest.idField,
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

    render(): Object {
        return (
            <span>
                <DataGrid
                    fields={this.state.fields}
                    propsOfFields={propsOfFields}
                    store={this.state.store}
                    ref={DataGridTest.tableRef}
                    toolbar={this.props.toolbar}
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
        let selectedRows = this.refs[DataGridTest.tableRef].getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    };

    __onCancel = () => {
        this.setState({ showModal: false });
    };

    __onSave = (data, callback) => {
        Assertions.isNotUndefinedAndNull(data, true);
        let id = data[DataGridTest.idField];
        if (Assertions.isNotUndefinedAndNull(id)) {
            this.state.store.update(this.state.item, data);
        } else {
            this.state.store.create(data);
        }
        callback = callback || (() => {});
        if (data) {
            callback(true);
            this.setState({
                showModal: true
            });
        }
    };

    __remove = () => {
        let selectedRows = this.refs[DataGridTest.tableRef].getSelectedRows();
        if (selectedRows || selectedRows.length) {
            this.state.store.delete(selectedRows[0]);
        }
    };

    __showModal = (newItem) => {
        this.setState({ showModal: true, item: newItem });
    };
}
