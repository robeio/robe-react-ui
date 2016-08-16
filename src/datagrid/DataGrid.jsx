import React from "react";
import is from "is-js";
import {
    Store,
    BinderStoreShallowComponent,
    Maps
} from "robe-react-commons";

import {
    Row,
    Col,
    Table
} from "react-bootstrap";

import DataTableBodyRow from "./DataGridBodyRow";
import ModalConfirm from "../form/ModalConfirm";
import Filter from "./filter/Filter";
import SearchField from "./toolbar/SearchField";
import ActionButtons from "./toolbar/ActionButtons";
import Pagination from "./Pagination";
import "./style.css";


export default class DataGrid extends BinderStoreShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * Fields Configurations to show style on view.
         */
        fields: React.PropTypes.array,
        /**
         * Holds extra props of components if need.
         */
        propsOfFields: React.PropTypes.object,
        /**
         * set one store
         */
        store: React.PropTypes.object,
        /**
         * toolbar for create,edit,delete and custom buttons
         */
        toolbar: React.PropTypes.arrayOf(
            React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.object
            ])
        ),
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
        pageSizeButtons: React.PropTypes.array
    };

    /**
     * static props
     * @type {object}
     */
    static defaultProps = {
        editable: true,
        searchable: true,
        refreshable: false,
        toolbar: {
            create: {
                visible: false,
                text: "New",
                icon: "fa-plus"
            },
            edit: {
                visible: false,
                text: "Edit",
                icon: "fa-pencil"
            },
            delete: {
                visible: false,
                text: "Delete",
                icon: "fa-trash"
            }
        },
        modalConfirm: {
            header: "Are you sure you want to delete?",
            message: "The selected entry will be deleted.You can not be undone.",
            okButtonText: "Yes",
            cancelButtonText: "No"
        }
    };

    activePage = 1;
    selection = undefined;
    __q = undefined;
    __filters = undefined;
    pageSize = 20;

    constructor(props: Object) {
        super({
            stores: [props.store]
        });

        this.state = {
            rows: [],
            totalCount: 0,
            hasSelection: false,
            modalDeleteConfirm: false,
            visiblePopups: {},
            counter: 0
        };

        this.activePage = 1;

        let fields = this.props.fields;
        if (!fields) {
            console.warn("fields not found.");
        }
    }

    render(): Object {
        return (
            <Col className="datagrid">
                <Row>
                    <Col xs={5} sm={5} lg={4}>
                        <SearchField onChange={this.__onSearchChanged} value={this.state.filter} visible={this.props.searchable} />
                    </Col>
                    <Col xs={7} sm={7} lg={8}>
                        <ActionButtons visible={this.props.editable} items={this.__getToolbarConfig()} />
                    </Col>

                </Row>
                <Filter
                    fields={this.props.fields}
                    visiblePopups={this.state.visiblePopups}
                    onChange={this.__onFilterChanged}
                />
                <Table responsive bordered condensed className="datagrid-table">
                    <thead>
                        <tr>
                            {this.__generateHeader(this.props.fields) }
                        </tr>
                    </thead>
                    <tbody>
                        {this.__generateRows(this.props.fields, this.state.rows) }
                    </tbody>
                </Table>
                <Pagination
                    {...this.props.pagination}
                    activePage={this.activePage}
                    visible={this.props.pageable}
                    pageSizeButtons={this.props.pageSizeButtons}
                    pageSize={this.pageSize}
                    onChange={this.__handlePaginationSelect}
                    onPageSizeChange={this.__pageSizeChange}
                    refreshable={this.props.onRefresh}
                    onRefresh={this.__readData}
                    totalCount={this.state.totalCount}
                />
                {this.__renderModalConfirm() }
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

        this.setState({
            hasSelection: false
        });
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
    __renderModalConfirm() {
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
    __pageSizeChange(e) {
        this.pageSize = parseInt(e.target.value, 10);
        this.__readData();
    }

    /**
     * @private
     */
    __handlePaginationSelect(event) {
        this.activePage = event;
        this.__readData();
    }

    /**
     * @param {Array<Object>} fields
     * @returns {Array<Object>}
     * @private
     */
    __generateHeader(fields: Array<Object>): Array<Object> {
        let trArr = [];
        for (let i = 0; i < fields.length; i++) {
            const column = fields[i];
            if (column.type === "upload") {
                continue;
            }
            let onClick = this.__openFilterPopups.bind(undefined, column.code);
            if (column.visible !== false) {
                let filterBtn = column.filter === true ? (
                    <i
                        id={`tableColumn-" +${column.code}`}
                        className="fa fa-filter pull-right"
                        aria-hidden="true"
                        onClick={onClick}
                    />
                ) : null;

                trArr.push(
                    <th key={column.code} >
                        {column.label}
                        {filterBtn}
                    </th>
                );
            }
        }

        return (trArr);
    }

    __openFilterPopups(code) {
        let isVisible = this.state.visiblePopups[code];
        let shows = {};
        shows[code] = !isVisible;
        this.setState({
            visiblePopups: shows
        });
    }

    __onFilterChanged(filterState) {
        let filters = [];
        Maps.forEach(filterState.filters, (a) => {
            filters.push(a);
        });
        this.__filters = filters.join(",");
        this.__readData();
    }

    __generateRows(fields, rows) {
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
                        key={row.oid} resources={this.props.resources}
                        fields={fields}
                        data={row}
                        onSelection={this.__onSelection}
                    />);
            }
        }
        return rowsArr;
    }

    __onSearchChanged = (event) => {
        this.__q = event.target.value;
        this.activePage = 1;
        this.__readData();
    }

    __onSelection(selection) {
        if (this.selection !== undefined) {
            if (this.selection.props === selection.props) {
                if (this.props.editButton && this.props.onEditClick) {
                    this.props.onEditClick();
                }
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

        if (this.props.onSelection) {
            this.props.onSelection(this.selection.props.data);
        }
    }

    __readData() {
        if (this.props.pageable) {
            let start = (this.pageSize * (this.activePage - 1));
            this.props.store.read(
                (response) => {
                    this.setState({
                        rows: response.data,
                        totalCount: response.totalCount
                    });
                }, undefined, start, this.pageSize, this.__q, this.__filters);
        } else {
            this.props.store.read(undefined, undefined, this.__q, this.__filters);
        }
    }

    __getModalConfirmConfig() {
        let config = Maps.merge(this.props.modalConfirm, DataGrid.defaultProps.modalConfirm);
        return config;
    }

    __getToolbarConfig() {
        let config = {
            create: {
                visible: false,
                text: "New",
                icon: "fa-plus",
                onClick: this.props.onNewClick
            },
            edit: {
                visible: false,
                text: "Edit",
                icon: "fa-pencil",
                onClick: this.props.onEditClick,
                disabled: !this.state.hasSelection
            },
            delete: {
                visible: false,
                text: "Delete",
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
                    console.warn("command not found please use create,update,delete or use your custom command");
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
        this.pageSize = this.props.pagination.pageSize;
    }
    componentDidMount() {
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
