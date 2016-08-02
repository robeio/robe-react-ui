import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DataGrid from "datagrid/DataGrid";
import DataGridModel from "./DataGridModel.json";
import Store from "robe-react-commons/lib/stores/Store";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";


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
            store: store
        };
    }

    render():Object {
        return (
            <DataGrid
                columns={this.state.columns}
                stores={[this.state.store]}
                ref="table"
                onNewClick={this.__add}
                onEditClick={this.__edit}
                onDeleteClick={this.__remove}
                exportButton={true}
                pageable={true}
                pageSize={10}
            />
        );
    }

    __add = () => {
    };
    __edit = ()=> {
    };
    __remove = ()=> {
    };

    __onCancel = ()=> {
        this.setState({showModal: false});
    };
}
