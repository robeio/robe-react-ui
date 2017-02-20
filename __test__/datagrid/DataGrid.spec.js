import chai from "chai";
import React from "react";
import {Store, RemoteEndPoint} from "robe-react-commons";
import Promise from "bluebird";
import TestUtils from "../TestUtils";
import DataGrid from "datagrid/DataGrid";
import DataGridBodyRow from "datagrid/DataGridBodyRow";
import Pagination from "datagrid/Pagination";
import SearchField from "datagrid/toolbar/SearchField";
import DataGridTest from "./DataGridTest";
import ModalDataForm from "form/ModalDataForm";
import DataGridModel from "./DataGridModel.json";


describe("datagrid/DataGrid", () => {
    const assert = chai.assert;

    const model = DataGridModel;
    const store = new Store({
        endPoint: new RemoteEndPoint({
            url: TestUtils.createUrl("users")
        }),
        idField: "id",
        autoLoad: true
    });

    let props;

    beforeEach(() => {
        props = {
            fields: model.fields,
            store: store,
            pagination: {pageSize: 1},
            onClick: () => {
            }
        };
    });

    let start = () => {
        return Promise.resolve();
    };

    let finish = (wrapper, done) => {
        wrapper.unmount();
        done();
    };

    let rowCount = 0;
    let columnCount = 0;

    model.fields.forEach((field) => {
        if (field.type !== "file" && field.visible !== false) {
            columnCount++;
        }
    });

    it("column headers", () => {
        let grid = TestUtils.mount(props, DataGrid);
        let colArray = grid.find("th");
        assert.equal(colArray.length, columnCount, "Columns must be rendered if the field is not 'upload' or 'visible=false' ");
        assert.equal(colArray.first().node.innerText, "Name");
        assert.equal(colArray.last().node.innerText, "Gender");
        grid.unmount();
    });

    it("rows", () => {
        let grid = TestUtils.mount(props, DataGrid);
        let rows = grid.find(DataGridBodyRow);
        assert.equal(rows.length, store.getResult().data.length, "Row count must be equal with the store data length");
        rowCount = rows.length;
        grid.unmount();
    });

    it("nonSearchable", () => {
        props.searchable = false;
        let grid = TestUtils.mount(props, DataGrid);
        let searchField = grid.find(SearchField);
        assert.equal(searchField.find("input").length, 0);
    });

    /*
     it("search", (done) => {
     let grid = TestUtils.shallow(props, DataGrid);
     let searchField = grid.find(SearchField);

     let search = () => {
     return new Promise((ok) => {
     searchField.first().simulate("change", { target: { value: "Seray" } });
     ok();
     });
     };

     let checkChangedState = () => {
     return new Promise((ok) => {
     let data = grid.instance().getStore().getResult().data;
     console.log("DataGrid Result: ", data);
     assert.equal(data.length, 1);
     assert.equal(data[0].name, "Seray");
     searchField.first().simulate("change", { target: { value: "" } });
     ok([grid, done]);
     });
     };

     start().delay(1000)
     .then(search).delay(1000)
     .then(checkChangedState)
     .spread(finish)
     .catch(done);
     });

     */
    /*
     it("add", (done) => {
     props.toolbar = ["create"];
     let testGrid = TestUtils.mount(props, DataGridTest);
     let grid = testGrid.find(DataGrid);

     let add = () => {
     return new Promise((ok) => {
     let modal = testGrid.find(ModalDataForm);
     modal.props().onSubmit({ name: "Mehmet", surname: "Güreli" });
     ok();
     });
     };

     let testIfAdded = () => {
     return new Promise((ok) => {
     let rows = grid.find(DataGridBodyRow);
     assert.equal(rows.length, ++rowCount);
     ok([testGrid, done]);
     });
     };

     start().delay(500)
     .then(add).delay(500)
     .then(testIfAdded)
     .spread(finish)
     .catch(done);
     });

     */
    it("edit", (done) => {
        let testGrid = TestUtils.mount(props, DataGridTest);
        let grid = testGrid.find(DataGrid);
        let oldName;

        let edit = () => {
            return new Promise((ok) => {
                let firstRow = grid.find(DataGridBodyRow).first();
                let data = firstRow.node.props.data;
                oldName = data.name + "";
                data.name = "Hasan";
                let modal = testGrid.find(ModalDataForm);
                modal.props().onSubmit(data);
                ok();
            });
        };

        let checkIfEdited = () => {
            return new Promise((ok) => {
                let firstRow = grid.find(DataGridBodyRow).first();
                let data = firstRow.node.props.data;
                assert.equal(data.name, "Hasan");
                data.name = oldName;
                let modal = testGrid.find(ModalDataForm);
                modal.props().onSubmit(data);
                ok([testGrid, done]);
            });
        };

        start().delay(500)
            .then(edit).delay(500)
            .then(checkIfEdited)
            .spread(finish)
            .catch(done);
    });

    /*
     it("delete", (done) => {
     let testGrid = TestUtils.mount(props, DataGridTest);
     let grid = testGrid.find(DataGrid);

     let deleteRow = () => {
     return new Promise((ok) => {
     let rows = grid.find(DataGridBodyRow);
     rows.last().simulate("click");
     grid.get(0).__showDeleteConfirm();
     grid.get(0).__onDeleteConfirm();
     ok();
     });
     };

     let checkIfDeleted = () => {
     return new Promise((ok) => {
     let rows = grid.find(DataGridBodyRow);
     assert.equal(rows.length, --rowCount);
     ok([testGrid, done]);
     });
     };

     start().delay(500)
     .then(deleteRow).delay(500)
     .then(checkIfDeleted)
     .spread(finish)
     .catch(done);
     });

     */
    it("rows - getSelectedRows", (done) => {
        store.getResult();
        let grid = TestUtils.mount(props, DataGrid);

        let check = () => {
            return new Promise((ok) => {
                let rows = grid.find(DataGridBodyRow);
                assert.equal(grid.node.getSelectedRows().length, 0, "getSelectetRows() must return empty before selection");
                rows.first().simulate("click");
                assert.equal(grid.node.getSelectedRows().length, 1, "getSelectetRows() must return 1 after selection");
                ok([grid, done]);
            });
        };

        start().delay(500)
            .then(check)
            .spread(finish)
            .catch(done);
    });

    it("pagination", () => {
        props.pagination = undefined;
        let grid = TestUtils.mount(props, DataGrid);
        let pagination = grid.find(Pagination);
        assert.equal(pagination.length, 0, "Pagination must be invisible if 'props.pagination' is not given.");
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
        assert.equal(pagination.length, 1, "Pagination must be rendered if 'props.pagination' is given.");
        grid.unmount();

        grid = TestUtils.mount(props, DataGrid);
        pagination = grid.find(Pagination);
        let rows = grid.find(DataGridBodyRow);
        assert.equal(rows.length, store.getResult().data.length, "Row count must be equal with the store data length");
        grid.unmount();
    });
});
