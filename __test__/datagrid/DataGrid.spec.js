import chai from "chai";
import React from "react";
import {
    Store,
    RemoteEndPoint,
} from "robe-react-commons";
import Promise from "bluebird"
import DataGrid from "datagrid/DataGrid";
import DataGridBodyRow from "datagrid/DataGridBodyRow";
import Pagination from "datagrid/Pagination";
import SearchField from "datagrid/toolbar/SearchField";
import TestUtils from "../TestUtils";

describe("datagrid/DataGrid", () => {
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

    let props;

    beforeEach(() => {
        props = {
            fields: model.fields,
            store: store,
            pageable: true
        };
    });

    it("column headers", () => {
        let grid = TestUtils.mount(props, DataGrid);
        let colArray = grid.find("th");
        chai.assert.equal(colArray.length, 2, "Columns must be rendered if the field is not 'upload' or 'visible=false' ");
        chai.assert.equal(colArray.first().node.innerText, "Name");
        chai.assert.equal(colArray.last().node.innerText, "Surname");
        grid.unmount();
    });

    it("rows", () => {
        let grid = TestUtils.mount(props, DataGrid);
        let rows = grid.find(DataGridBodyRow);
        chai.assert.equal(rows.length, store.getResult().data.length, "Row count must be equal with the store data length");
        grid.unmount();
    });

    it("search", (done) => {
        let grid = TestUtils.shallow(props, DataGrid);
        let searchField = grid.find(SearchField);

        let start = () => {
            return Promise.resolve();
        };

        let checkInitialState = (): Promise => {
            return new Promise((ok) => {
                chai.assert.equal(grid.instance().getStore().getResult().data.length, 3);
                searchField.first().simulate("change", { target: { value: "Seray" } });
                ok();
            });
        };

        let checkChangedState = () => {
            return new Promise((ok) => {
                let data = grid.instance().getStore().getResult().data;
                chai.assert.equal(data.length, 1);
                chai.assert.equal(data[0].name, "Seray");
                ok();
            });
        };

        let finish = () => {
            grid.unmount();
            done();
        };

        start().delay(500)
            .then(checkInitialState).delay(500)
            .then(checkChangedState)
            .then(finish)
            .catch(done);
    });

    it("rows - getSelectedRows", (done) => {
        store.getResult();
        let grid = TestUtils.mount(props, DataGrid);

        function check() {
            let rows = grid.find(DataGridBodyRow);
            chai.assert.equal(grid.node.getSelectedRows().length, 0, "getSelectetRows() must return empty before selection");
            rows.first().simulate("click");
            chai.assert.equal(grid.node.getSelectedRows().length, 1, "getSelectetRows() must return 1 after selection");
            grid.unmount();
            done();
        }

        window.setTimeout(check, 1000);
    });

    it("pagination", () => {
        let grid = TestUtils.mount(props, DataGrid);
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
        grid = TestUtils.mount(props, DataGrid);
        pagination = grid.find(Pagination);
        chai.assert.equal(pagination.length, 1, "Pagination must be rendered if 'props.pagination' is given.");
        grid.unmount();

        grid = TestUtils.mount(props, DataGrid);
        pagination = grid.find(Pagination);
        let rows = grid.find(DataGridBodyRow);
        chai.assert.equal(rows.length, store.getResult().data.length, "Row count must be equal with the store data length");
        grid.unmount();
    });
});
