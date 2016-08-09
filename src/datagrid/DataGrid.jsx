import React from "react";
import is from "is-js";
import {Row, Col, Table, Pagination, FormControl, InputGroup, ButtonGroup, Button} from "react-bootstrap";
import StoreShallowComponent from "robe-react-commons/lib/components/StoreShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import Maps from "robe-react-commons/lib/utils/Maps";
import DataTableBodyRow from "./DataGridBodyRow";
import ModalConfirm from "../form/ModalConfirm";
import Filter from "./filter/Filter";
import "./style.css";
import FaIcon from "../faicon/FaIcon";

/**
 * TODO removing un used css
 */
export default class DataGrid extends StoreShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
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
         * Callback for row selection
         */
        onSelection: React.PropTypes.func,
        /**
         * Enable pageable for DataGrid
         */
        pageable: React.PropTypes.bool,
        /**
         * Make DataGrid as readonly
         */
        editable: React.PropTypes.bool,
        /**
         * enable/disable searchable
         */
        searchable: React.PropTypes.bool,
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
         * ModalConfirm configuration
         */
        modalConfirm: React.PropTypes.shape({
            header: React.PropTypes.string,
            message: React.PropTypes.string,
            okButtonText: React.PropTypes.string,
            cancelButtonText: React.PropTypes.string,
        }),
        /**
         * pagination configuration
         */
        pagination: React.PropTypes.shape({
            pageSize: React.PropTypes.number,
            emptyText: React.PropTypes.string,
            displayText: React.PropTypes.string,
        }),
    };

    static defaultProps = {
        editable: true,
        searchable: true,
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
        },
        pagination: {
            pageSize: 20,
            emptyText: "No data to display.",
            displayText: "Showing {start}-{end} from {total} data items"
        }
    };

    activePage = 1;
    selection = undefined;
    __q = undefined;
    __filters = undefined;
    pageSize = 20;

    constructor(props: Object) {
        super(props);

        this.state = {
            rows: [],
            totalCount: 0,
            hasSelection: false,
            modalDeleteConfirm: false,
            visiblePopups: {},
        };
        this.activePage = 1;

        let columns = this.props.columns;
        if (!columns) {
            console.warn("columns not found.");
        }
    }

    render(): Object {
        return (
            <Col className="datagrid">
                <Row>
                    <Col xs={5} sm={5} lg={4}>
                        {this.__renderSearchInput()}
                    </Col>
                    <Col xs={7} sm={7} lg={8}>
                        {this.__renderToolbar()}
                    </Col>

                </Row>

                <Filter
                    columns={this.props.columns}
                    visiblePopups={this.state.visiblePopups}
                    onChange={this.__onFilterChanged}
                />
                <Table responsive bordered condensed className="datagrid-table">
                    <thead>
                    <tr>
                        {this.__generateHeader(this.props.columns)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.__generateRows(this.props.columns, this.state.rows)}
                    </tbody>
                </Table>
                {this.__renderPagination()}
                {this.__renderModalConfirm()}

            </Col>
        );
    }

    /**
     * Selected rows
     * @returns {Array}
     */
    getSelectedRows(): Object<Array> {
        let selections = [];
        if (this.selection) {
            selections.push(this.selection.props.data);
        }
        return selections;
    }

    __renderToolbar = () => {
        if (!this.props.editable) {
            return null;
        }

        let config = this.__getToolbarConfig();
        let actions = [];
        Maps.forEach(config, (item) => {
            if (item.visible) {
                let action = <Button disabled={item.disabled} onClick={item.onClick}><FaIcon code={item.icon} size={"fa-lg"}/><Col componentClass="span" className="hidden-xs"> {item.text}</Col></Button>;
                actions.push(action);
            }
        });


        return (
            <ButtonGroup className="pull-right">
                {actions}
            </ButtonGroup>
        );
    };

    __renderSearchInput = () => {
        if (this.props.searchable) {
            return (
                <InputGroup>
                    <FormControl
                        type="text"
                        addonBefore={<i className="fa fa-search" />}
                        placeholder="Arama"
                        onChange={this.__onSearchChanged}
                        ref="input"
                    />
                </InputGroup>
            );
        }
        return null;
    };

    __onDeleteConfirm = () => {
        this.props.onDeleteClick();
        this.__hideDeleteConfirm();

        this.setState({
            hasSelection: false
        });
    };
    __showDeleteConfirm = () => {
        this.setState({
            modalDeleteConfirm: true
        });
    };

    __hideDeleteConfirm = () => {
        this.setState({
            modalDeleteConfirm: false
        });
    };
    __renderModalConfirm = () => {
        let config = this.__getModalConfirmConfig();
        return (
            <ModalConfirm
                {...config}
                onOkClick={this.__onDeleteConfirm}
                onCancelClick={this.__hideDeleteConfirm}
                show={this.state.modalDeleteConfirm}
            />);
    };

    __renderPagination = () => {
        if (!this.props.pageable) {
            return null;
        }
        let config = this.__getPaginationConfig();
        let items = Math.ceil(this.state.totalCount / config.pageSize);

        let start = (config.pageSize * (this.activePage - 1));
        let end = start + config.pageSize;
        let total = this.state.totalCount;

        if (end > total) {
            end = total;
        }
        let pagination;
        if (total !== 0) {
            let displayText = config.displayText;
            displayText = displayText.replace(/\{start\}/g, (start + 1));
            displayText = displayText.replace(/\{end\}/g, end);
            displayText = displayText.replace(/\{total\}/g, total);

            pagination = (<span><p className="hidden-xs">{displayText}</p>
                <p className="visible-xs">{total} / {start + 1}-{end}</p></span>);
        } else {
            pagination = <p>{config.emptyText}</p>;
        }

        return (
            <Col className="datagrid-pagination-row">
                <Row>
                    <Col xs={4} className="datagrid-table-pagination-buttons">

                        <ButtonGroup
                            style={{ color: "#337ab7" }} className="pull-left hidden-xs" bsSize="small">
                            <Button bsSize="small" onClick={this.__readData}><FaIcon code="fa-refresh"/></Button>
                            <Button disabled>Limit:</Button>
                            <Button active={this.pageSize === 20} onClick={this.__pageSizeChange}
                                    value="20">20</Button>
                            <Button active={this.pageSize === 50} onClick={this.__pageSizeChange}
                                    value="50">50</Button>
                            <Button active={this.pageSize === 100} onClick={this.__pageSizeChange}
                                    value="100">100</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={4} className="datagrid-table-pagination-buttons text-center">
                        {pagination}
                    </Col>
                    <Col xs={4} className="datagrid-table-pagination-buttons">
                        <Pagination
                            style={{ margin: "0" }}
                            className="pull-right hidden-xs"
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            activePage={this.activePage}
                            onSelect={this.__handlePaginationSelect}
                            items={items}
                            maxButtons={5}
                        />
                        <Pagination
                            style={{ margin: "0" }}
                            className="visible-xs pull-right"
                            prev
                            next
                            ellipsis={false}
                            boundaryLinks
                            activePage={this.activePage}
                            onSelect={this.__handlePaginationSelect}
                            items={items}
                            maxButtons={1}
                        />
                    </Col>
                </Row>
            </Col>);
    };


    __pageSizeChange = (e) => {
        this.pageSize = parseInt(e.target.value, 10);
        this.__readData();
    };
    __handlePaginationSelect = (event, selectedEvent) => {
        this.activePage = selectedEvent.eventKey;
        this.__readData();
    };

    __generateHeader = (columns) => {
        let trArr = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            if (column.type === "upload") {
                continue;
            }
            let onClick = this.__openFilterPopups.bind(undefined, column.code);
            if (column.visible !== false) {
                let filterBtn = column.filter === true ? <i id={`tableColumn-" +${column.code}`} className="fa fa-filter pull-right" aria-hidden="true" onClick={onClick}/> : null;
                trArr.push(<th key={column.code}>
                    {column.label}
                    {filterBtn}
                </th>);
            }
        }

        return (trArr);
    };

    __openFilterPopups = (code) => {
        let isVisible = this.state.visiblePopups[code];
        let shows = {};
        shows[code] = !isVisible;
        this.setState({
            visiblePopups: shows
        });
    };

    __onFilterChanged = (filterState) => {
        let filters = [];
        Maps.forEach(filterState.filters, (a) => {
            filters.push(a);
        });
        this.__filters = filters.join(",");
        this.__readData();
    };

    __generateRows = (columns, rows) => {
        if (!rows) {
            return null;
        }

        let rowsArr = [];
        let size = rows.length !== undefined ? rows.length : rows.size();
        for (let i = 0; i < size; i++) {
            let row = rows[i];
            if (!is.object(row)) {
                console.warn("Undefined data row at:", i, row);
                continue;
            }

            rowsArr.push(
                <DataTableBodyRow
                    key={row.oid} resources={this.props.resources}
                    columns={columns}
                    data={row}
                    onSelection={this.__onSelection}
                />);
        }
        return rowsArr;
    };

    __onSearchChanged = (event) => {
        this.__q = event.target.value;
        this.activePage = 1;
        this.__readData();
    };

    __onSelection = (selection) => {
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
    };

    __readData = () => {
        if (this.props.pageable) {
            let start = (this.pageSize * (this.activePage - 1));
            this.props.stores[0].read(
                (response) => {
                    this.setState({
                        rows: response.data,
                        totalCount: response.data.length
                    });
                }, undefined, start, this.pageSize, this.__q, this.__filters);
        } else {
            this.props.store.read(undefined, undefined, this.__q, this.__filters);
        }
    };

    __getPaginationConfig = () => {
        let config = {
            pageSize: this.pageSize,
            emptyText: "No data to display.",
            displayText: "Showing {start}-{end} from {total} data items"
        };
        config = Maps.merge(this.props.pagination, config);
        return config;
    };
    __getModalConfirmConfig = () => {
        let config = {
            header: "Are you sure you want to delete?",
            message: "The selected entry will be deleted.You can not be undone.",
            okButtonText: "Yes",
            cancelButtonText: "No"
        };
        config = Maps.merge(this.props.modalConfirm, config);
        return config;
    };
    __getToolbarConfig = () => {
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

        Maps.forEach(this.props.toolbar, (item) => {
            if (typeof item === "string" || item instanceof String) {
                if (!(config[item] === undefined)) {
                    config[item].visible = true;
                } else {
                    console.warn("command not found please use create,update,delete or use your custom command");
                }
            } else if (typeof item === "object" || item instanceof Object) {
                if (config[item.name] === undefined) {
                    config[item.name] = {};
                }
                config[item.name].visible = true;
                Maps.merge(item, config[item.name]);
            }
        });

        return config;
    };

    componentDidMount = () => {
        for (let i = 0; i < this.stores.length; i++) {
            this.stores[i].register(this);
        }
        this.pageSize = this.props.pagination.pageSize;
    };

    /**
     * Do not implement
     * @param store
     */
    triggerChange(store: Store) {
        this.setState({
            rows: store.getResult().data,
            totalCount: store.getResult().data.length
        });
    }
}
