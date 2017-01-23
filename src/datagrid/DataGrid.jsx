import React from "react";
import is from "is-js";
import {
    Application,
    Store,
    StoreComponent,
    Maps,
    Assertions
} from "robe-react-commons";

import {
    Row,
    Col,
    Table
} from "react-bootstrap";

import DataTableBodyRow from "./DataGridBodyRow";
import ModalConfirm from "../form/ModalConfirm";
import Filters from "./filter/Filters";
import SearchField from "./toolbar/SearchField";
import ActionButtons from "./toolbar/ActionButtons";
import Pagination from "./Pagination";
import Header from "./Header";

import "./DataGrid.css";

export default class DataGrid extends StoreComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * Fields Configurations to show style on view.
         */
        fields: React.PropTypes.array.isRequired,
        /**
         * Holds extra props of components if need.
         */
        propsOfFields: React.PropTypes.object,
        /**
         * set one store
         */
        store: React.PropTypes.object.isRequired,
        /**
         * toolbar for create,edit,delete and custom buttons
         */
        toolbar: React.PropTypes.array,
        /**
         * Callback for new button click
         */
        onNewClick: React.PropTypes.func,
        /**
         * Callback for edit button click
         */
        onEditClick: React.PropTypes.func,
        /**
         * Callback for delete button click
         */
        onDeleteClick: React.PropTypes.func,
        /**
         * show export data flag
         */
        exportButton: React.PropTypes.bool,
        /**
         * Make DataGrid as readonly
         */
        editable: React.PropTypes.bool,
        /**
         * ModalConfirm configuration
         */
        modalConfirm: React.PropTypes.shape({
            header: React.PropTypes.string,
            message: React.PropTypes.string,
            okButtonText: React.PropTypes.string,
            cancelButtonText: React.PropTypes.string
        }),
        /**
         * Callback for row selection
         */
        onSelection: React.PropTypes.func,
        /**
         * Enable pageable for DataGrid
         */
        pageable: React.PropTypes.bool,
        /**
         * enable/disable searchable
         */
        searchable: React.PropTypes.bool,

        /**
         * show/hide refresh button
         */
        refreshable: React.PropTypes.bool,

        /**
         * show/hide Page size buttons
         */
        pageSizeButtons: React.PropTypes.array,

        /**
         * Render method for the row. Use for custom row templates
         */
        rowRenderer: React.PropTypes.func,

        /**
         * Render method for the cell. Use for custom cell templates.
         * Default row template will call for every cell render event.
         */
        cellRenderer: React.PropTypes.func,

        /**
         * Filter properties of the grid.
         */
        filter: React.PropTypes.shape({
            clearButtonText: React.PropTypes.string,
            clearAllButtonText: React.PropTypes.string
        }),
    };
    /**
     * static props
     * @type {object}
     */
    static defaultProps = {
        editable: true,
        searchable: true,
        refreshable: false,
        toolbar: [
            {
                name: "create",
                visible: false,
                icon: "fa-plus"

            }, {
                name: "edit",
                visible: false,
                icon: "fa-pencil"
            }, {
                name: "delete",
                visible: false,
                icon: "fa-trash"
            }
        ],
        modalConfirm: {
            header: Application.i18n(DataGrid, "datagrid.DataGrid", "modalConfirm", "header"),
            message: Application.i18n(DataGrid, "datagrid.DataGrid", "modalConfirm", "message"),
            ok: Application.i18n(DataGrid, "datagrid.DataGrid", "modalConfirm", "ok"),
            cancel: Application.i18n(DataGrid, "datagrid.DataGrid", "modalConfirm", "cancel")
        },
        filter: {
            clear: Application.i18n(DataGrid, "datagrid.DataGrid", "filter", "clear"),
            clearAll: Application.i18n(DataGrid, "datagrid.DataGrid", "filter", "clearAll")
        }
    };

    activePage = 1;
    selection = undefined;
    __q = undefined;
    __filters = undefined;
    pageSize = 20;
    __fields = [];
    __sorts = {};
    __filterComponent;

    constructor(props: Object) {
        super(props);
        this.state = {
            rows: [],
            totalCount: 0,
            hasSelection: false,
            modalDeleteConfirm: false,
            visiblePopups: {},
            counter: 0
        };

        this.activePage = 1;
        if (props.propsOfFields) {
            this.__init(props.fields, props.propsOfFields);
        } else {
            this.__fields = props.fields;
        }
    }

    __init(fields: Array, propsOfFields: Object) {
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.name) {
                throw new Error("'name' field must be defined");
            }
            let props = propsOfFields[field.name];
            this.__fields[i] = props ? Maps.mergeDeep(field, props) : fields[i];
        }
    }

    render(): Object {
        return (
            <Col className="datagrid">
                <Row>
                    <Col xs={5} sm={5} lg={4}>
                        <SearchField
                            onChange={this.__onSearchChanged}
                            value={this.state.qfilter}
                            visible={this.props.searchable}
                            placeholder={Application.i18n(DataGrid, "datagrid.DataGrid", "search")}
                            />
                    </Col>
                    <Col xs={7} sm={7} lg={8} style={{ marginBottom: 15 }}>
                        <ActionButtons
                            visible={this.props.editable}
                            items={this.__getToolbarConfig()}
                            />
                    </Col>

                </Row>
                <Filters
                    ref={(component: Object) => { this.__filterComponent = component; } }
                    fields={this.__fields}
                    visiblePopups={this.state.visiblePopups}
                    onChange={this.__onFilterChanged}
                    idCount={this.getObjectId()}
                    clearButtonText={this.props.filter.clear}
                    clearAllButtonText={this.props.filter.clearAll}
                    />
                <Table responsive bordered condensed className="datagrid-table">
                    <thead>
                        <tr>
                            {this.__generateHeader(this.props.fields)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.__generateRows(this.__fields, this.state.rows)}
                    </tbody>
                </Table>
                {this.props.pagination === undefined ? undefined :
                    (<Pagination
                        {...this.props.pagination}
                        activePage={this.activePage}
                        pageSizeButtons={this.props.pageSizeButtons}
                        pageSize={this.pageSize}
                        onChange={this.__handlePaginationSelect}
                        onPageSizeChange={this.__pageSizeChange}
                        refreshable={this.props.refreshable}
                        onRefresh={this.__readData}
                        totalCount={this.state.totalCount}
                        emptyText={Application.i18n(DataGrid, "datagrid.DataGrid","pagination" ,"empty")}
                        displayText={Application.i18n(DataGrid, "datagrid.DataGrid","pagination", "display")}
                        />)
                }
                {this.__renderModalConfirm()}
            </Col>
        );
    }

    /**
     * Selected rows
     * @returns {Array}
     */
    getSelectedRows(): Object {
        let selections = [];
        if (this.selection) {
            selections.push(this.selection.props.data);
        }
        return selections;
    }


    /**
     * @private
     */
    __onDeleteConfirm() {
        this.props.onDeleteClick();
        this.__hideDeleteConfirm();
        this.__clearSelection();
    }

    /**
     * @private
     */
    __showDeleteConfirm() {
        this.setState({
            modalDeleteConfirm: true
        });
    }

    /**
     * @private
     */
    __hideDeleteConfirm() {
        this.setState({
            modalDeleteConfirm: false
        });
    }

    /**
     * @private
     */
    __renderModalConfirm(): Object {
        let config = this.__getModalConfirmConfig();
        return (
            <ModalConfirm
                {...config}
                onOkClick={this.__onDeleteConfirm}
                onCancelClick={this.__hideDeleteConfirm}
                show={this.state.modalDeleteConfirm}
                />);
    }

    /**
     * @private
     */
    __pageSizeChange(e: Object) {
        this.pageSize = parseInt(e.target.value, 10);
        this.__readData();
    }

    /**
     * @private
     */
    __handlePaginationSelect(event: Object) {
        this.activePage = event;
        this.__readData();
    }

    /**
     * @param {Array<Object>} fields
     * @returns {Array<Object>}
     * @private
     */
    __generateHeader(fields: Array<Object>): Array<Object> {
        let headers = [];
        for (let i = 0; i < fields.length; i++) {
            const column = fields[i];
            if (column.visible !== false && column.type !== "file") {
                headers.push(
                    <Header
                        name={`tableColumn${this.getObjectId()}-${column.name}`}
                        key={`tableColumn${this.getObjectId()}-${column.name}`}
                        field={column}
                        onFilterClick={this.__openFilterPopup}
                        onSortClick={this.__onSortClick}
                        filter={this.__filterComponent !== undefined ? this.__filterComponent.state.filters[column.name] : undefined}
                        sort={this.__sorts[column.name] !== undefined ? this.__sorts[column.name] : column.sort}
                        />
                );
            }
        }
        return (headers);
    }

    __onSortClick(name: string) {
        let value;
        switch (this.__sorts[name]) {
            case "DESC":
                value = "ASC";
                break;
            case "ASC":
                value = "";
                break;
            default:
                value = "DESC";
        }
        this.__sorts[name] = value;
        this.__readData();
    }

    __openFilterPopup(name: string) {
        let visiblePopups = this.__filterComponent.state.visiblePopups;
        let isVisible = visiblePopups[name];
        let popupState = {};
        popupState[name] = !isVisible;
        this.__filterComponent.setState({
            visiblePopups: popupState
        });
    }

    __onFilterChanged(deleteAll: boolean) {
        let filterArr = [];
        if (!deleteAll) {
            Maps.forEach(
                this.__filterComponent.state.filters,
                (a: string) => {
                    if (a !== undefined) {
                        if (Assertions.isArray(a[0])) {
                            for (let i = 0; i < a.length; i++) {
                                filterArr.push(a[i]);
                            }
                        } else {
                            filterArr.push(a);
                        }
                    }
                }
            );
        }
        this.__filters = filterArr;
        this.__readData();
    }

    __generateRows(fields: Array, rows: Array): Object {
        if (!rows) {
            return null;
        }

        let rowsArr = [];
        let size = rows.length !== undefined ? rows.length : rows.size();
        for (let i = 0; i < size; i++) {
            let row = rows[i];
            if (!is.object(row)) {
                console.warn("Undefined data row at:", i, row);
            } else {
                rowsArr.push(
                    <DataTableBodyRow
                        key={i}
                        resources={this.props.resources}
                        fields={fields}
                        idField={this.props.store.__props.idField}
                        data={row}
                        onSelection={this.__onSelection}
                        onClick={this.props.onClick}
                        rowRenderer={this.props.rowRenderer}
                        cellRenderer={this.props.cellRenderer}
                        />);
            }
        }
        return rowsArr;
    }

    __onSearchChanged = (event: Object) => {
        this.state.qfilter = event.target.value;
        this.activePage = 1;
        this.__readData();
    }

    __clearSelection() {
        if (this.selection !== undefined) {
            this.selection.setState({
                selected: false
            });
        }
        this.selection = undefined;
        this.setState({
            hasSelection: true
        });
        if (this.props.onSelection) {
            this.props.onSelection(undefined);
        }
    }

    __onSelection(selection: Object) {
        if (this.selection !== undefined) {
            if (this.selection.props === selection.props) {
                if (this.props.editButton && this.props.onEditClick) {
                    this.props.onEditClick();
                }
                this.__triggerSelection();
                return;
            }
            this.selection.setState({
                selected: false
            });
        }
        this.selection = selection;
        this.selection.setState({
            selected: true
        });

        this.setState({
            hasSelection: true
        });

        this.__triggerSelection();
    }

    __triggerSelection(){
        if (this.props.onSelection) {
            this.props.onSelection(this.selection.props.data);
        }
    }

    __map2Array(map: Object): Array {
        let array = [];
        Maps.forEach(map, (value: string, key: string) => {
            if (value !== "") {
                array.push([key, value]);
            }
        });
        return array.length === 0 ? undefined : array;
    }

    __readData() {
        this.__clearSelection();
        let queryParams = {
            q: this.state.qfilter,
            filters: this.__filters,
            sort: this.__map2Array(this.__sorts)
        };
        if (this.props.pagination) {
            let start = (this.pageSize * (this.activePage - 1));
            queryParams.offset = start;
            queryParams.limit = this.pageSize;
            this.props.store.read(
                (response: Object) => {
                    this.setState({
                        rows: response.data,
                        totalCount: response.totalCount
                    });
                }, undefined, queryParams);
        } else {
            this.props.store.read(undefined, undefined, queryParams);
        }
    }

    __getModalConfirmConfig(): Object {
        let config = Maps.merge(this.props.modalConfirm, DataGrid.defaultProps.modalConfirm);
        return config;
    }

    __getToolbarConfig(): Object {
        let config = {
            create: {
                visible: false,
                text: Application.i18n(DataGrid, "datagrid.DataGrid", "toolbar", "create"),
                icon: "fa-plus",
                onClick: this.props.onNewClick
            },
            edit: {
                visible: false,
                text: Application.i18n(DataGrid, "datagrid.DataGrid", "toolbar", "edit"),
                icon: "fa-pencil",
                onClick: this.props.onEditClick,
                disabled: !this.state.hasSelection
            },
            delete: {
                visible: false,
                text: Application.i18n(DataGrid, "datagrid.DataGrid", "toolbar", "delete"),
                icon: "fa-trash",
                onClick: this.__showDeleteConfirm,
                disabled: !this.state.hasSelection
            }
        };

        Maps.forEach(this.props.toolbar, (item: Object) => {
            if (is.string(item)) {
                if (!(config[item] === undefined)) {
                    config[item].visible = true;
                } else {
                    console.warn("command not found please use create,edit,delete or use your custom command"); //eslint-disable-line
                }
            } else if (is.hash(item)) {
                if (config[item.name] === undefined) {
                    config[item.name] = {};
                }
                config[item.name].visible = true;
                Maps.merge(item, config[item.name]);
            }
        });

        return config;
    }

    componentWillMount() {
        if (this.props.pagination !== undefined && this.props.pagination.pageSize !== undefined) {
            this.pageSize = this.props.pagination.pageSize;
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.__readData();
    }
    /**
     * Do not implement
     * @param store
     */
    triggerChange(store: Store) {
        this.setState({
            rows: store.getResult().data,
            totalCount: store.getResult().totalCount
        });
        this.forceUpdate();
    }
}
