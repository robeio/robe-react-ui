import chai from "chai";
import React from "react";
import {
    Store,
    RemoteEndPoint,
} from "robe-react-commons";
import DataGrid from "datagrid/DataGrid";
import DataGridBodyRow from "datagrid/DataGridBodyRow";
import Pagination from "datagrid/Pagination";
import { mount } from "enzyme";


describe("datagrid/DataGrid", () => {
    const data = [];
    const model = {
        name: "DataGridModel",
        fields: [
            {
                label: "id",
                type: "string",
                code: "id",
                tooltip: "id",
                visible: false
            },
            {
                label: "Name",
                type: "string",
                code: "name",
                tooltip: "Name"
            },
            {
                label: "Surname",
                type: "string",
                code: "surname",
                tooltip: "Surname"
            },
            {
                label: "Avatar",
                type: "upload",
                code: "avatar",
                tooltip: "Avatar"
            }
        ]
    };
    const store = new Store({
        endPoint: new RemoteEndPoint({
            url: "http://localhost:3001/users"
        }),
        idField: "id",
        autoLoad: true
    });

    const getComponent = (props: Object): Object => {
        return (
            <DataGrid {...props} />
        );
    };

    it("column headers", () => {
        let props = {
            fields: model.fields,
            store: store,
        };
        let grid = mount(getComponent(props));
        let colArray = grid.find("th");
        chai.assert.equal(colArray.length, 2, "Columns must be rendered if the field is not 'upload' or 'visible=false' ");
        chai.assert.equal(colArray.first().node.innerText, "Name");
        chai.assert.equal(colArray.last().node.innerText, "Surname");
        grid.unmount();
    });

    it("rows", () => {
        let props = {
            fields: model.fields,
            store: store
        };
        let grid = mount(getComponent(props));
        let rows = grid.find(DataGridBodyRow);
        chai.assert.equal(rows.length, store.getResult().data.length, "Row count must be equal with the store data length");
        grid.unmount();
    });

    it("rows - getSelectedRows", () => {
        let props = {
            fields: model.fields,
            store: store
        };
        store.getResult();
        let grid = mount(getComponent(props));
        window.setTimeout(check, 1000);

        function check() {
            let rows = grid.find(DataGridBodyRow);
            chai.assert.equal(grid.node.getSelectedRows().length, 0, "getSelectetRows() must return empty before selection");
            rows.first().simulate("click");
            chai.assert.equal(grid.node.getSelectedRows().length, 1, "getSelectetRows() must return 1 after selection");
            grid.unmount();
        }
    });

    it("pagination", () => {
        let props = {
            fields: model.fields,
            store: store
        };
        let grid = mount(getComponent(props));
        let pagination = grid.find(Pagination);
        chai.assert.equal(pagination.length, 0, "Pagination must be invisible if 'props.pagination' is not given.");
        grid.unmount();

        props = {
            fields: model.fields,
            store: store,
            pagination: {
                pageSize: 1
            }
        };
        grid = mount(getComponent(props));
        pagination = grid.find(Pagination);
        chai.assert.equal(pagination.length, 1, "Pagination must be rendered if 'props.pagination' is given.");
        grid.unmount();

        grid = mount(getComponent(props));
        pagination = grid.find(Pagination);
        let rows = grid.find(DataGridBodyRow);
        chai.assert.equal(rows.length, store.getResult().data.length, "Row count must be equal with the store data length");
        grid.unmount();
    });
});
