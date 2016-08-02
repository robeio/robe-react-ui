import React from "react";
import StoreShallowComponent from "robe-react-commons/lib/components/StoreShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import is from "is-js";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Table from "react-bootstrap/lib/Table";
import DataTableBodyRow from "./DataGridBodyRow";
import Pagination from "react-bootstrap/lib/Pagination";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Input from "react-bootstrap/lib/Input";
import ModalConfirm from "../form/ModalConfirm.jsx";
import Filter from "./filter/Filter.jsx";
import Maps from "robe-react-commons/lib/utils/Maps";
import "./style.css";

/**
 * TODO removing un used css
 */
export default class DataGrid extends StoreShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes:Map = {
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
         * Page size of DataGrid
         */
        pageSize: React.PropTypes.number,
        /**
         * Make DataGrid as readonly
         */
        editable: React.PropTypes.bool,
        /**
         * Show/hide new button.
         */
        newButton: React.PropTypes.bool,
        /**
         * Show/hide edit button.
         */
        editButton: React.PropTypes.bool,
        /**
         * Show/hide edit button.
         */
        deleteButton: React.PropTypes.bool,
        /**
         * enable/disable searchable
         */
        searchable: React.PropTypes.bool,
        /**
         * new button text
         */
        newButtonText: React.PropTypes.string,
        /**
         * edit button text
         */
        editButtonText: React.PropTypes.string,
        /**
         * delete button text
         */
        deleteButtonText: React.PropTypes.string
    };

    static defaultProps = {
        editable: true,
        newButton: true,
        editButton: true,
        deleteButton: true,
        searchable: true,
        newButtonText: "Yeni Ekle",
        editButtonText: "Düzenle",
        deleteButtonText: "Sil"
    };

    activePage = 1;
    selection:undefined;
    __q = undefined;
    __filters = undefined;

    uniqueRef = new Date().getTime();

    constructor(props:Object) {
        super(props);

        this.state = {
            rows: [],
            totalCount: 0,
            hasSelection: false,
            modalDeleteConfirm: false,
            visiblePopups: {}
        };
        this.activePage = 1;

        let columns = this.props.columns;
        if (!columns) {
            console.warn("columns not found.");
        }
    }

    render():Object {
        return (
            <Col className="datagrid">
                <Row>
                    <Col xs={5} sm={5} lg={4}>
                        {this.__renderSearchInput()}
                    </Col>
                    <Col xs={7} sm={7} lg={8}>
                        {this.__renderActionButtons()}
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

    getSelectedRows() {
        let selections = [];
        if (this.selection) {
            selections.push(this.selection.props.data);
        }
        return selections;
    }

    __renderSearchInput = () => {
        if (this.props.searchable) {
            return (
                <Input
                    addonBefore={<i className="fa fa-search" />}
                    type="text"
                    placeholder="Arama"
                    onChange={this.__onSearchChanged}
                    ref="input"
                />
            );
        }
        return null;
    };

    __renderActionButtons = () => {
        if (!this.props.editable || this.props.hidden) {
            return null;
        }

        let newButton = (this.props.newButton && this.props.onNewClick) ?
            <Button onClick={this.props.onNewClick}><Glyphicon glyph="plus" />
                <Col componentClass="span" className="hidden-xs"> {this.props.newButtonText}</Col></Button> : null;
        let editButton = (this.props.editButton && this.props.onEditClick) ?
            <Button disabled={!this.state.hasSelection} onClick={this.props.onEditClick}><Glyphicon glyph="pencil" />
                <Col componentClass="span" className="hidden-xs">{this.props.editButtonText}</Col></Button> : null;
        let deleteButton = (this.props.deleteButton && this.props.onDeleteClick) ?
            <Button disabled={!this.state.hasSelection} onClick={this.__showDeleteConfirm}>
                <Glyphicon glyph="trash" />
                <Col componentClass="span" className="hidden-xs">{this.props.deleteButtonText}</Col></Button> : null;
        return (
            <ButtonGroup className="pull-right">
                {newButton}
                {editButton}
                {deleteButton}
            </ButtonGroup>
        );
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
        return (
            <ModalConfirm
                header="Silmek istediğinizden emin misiniz ?"
                message="Seçili kayıt silinecektir.Bu işlem geri alınamaz."
                onOkClick={this.__onDeleteConfirm} onCancelClick={this.__hideDeleteConfirm}
                show={this.state.modalDeleteConfirm}
            />);
    };

    __renderPagination = () => {
        if (!this.props.pageable) {
            return null;
        }

        let items = this.__calculatePaginationItems();
        let start = (this.props.pageSize * (this.activePage - 1));
        let end = start + this.props.pageSize;
        let total = this.state.totalCount;

        if (end > total) {
            end = total;
        }
        let pagination;
        if (total !== 0) {
            pagination = (<span><p className="hidden-xs">{`${total} tanesinden görüntülenen ${start + 1}-${end}`}</p>
                <p className="visible-xs">{total} / {start + 1}-{end}</p></span>);
        } else {
            pagination = <p>Görüntülenecek Veri Bulunmamaktadır.</p>;
        }
        return (
            <Col className="datagrid-pagination-row">
                <Row>
                    <Col xs={6} className="pagination-pager">{pagination}</Col>
                    <Col xs={6}>
                        <Pagination
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

    __calculatePaginationItems = () => {
        return Math.ceil(this.state.totalCount / this.props.pageSize);
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
                    {column.title}
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
        if (this.selection) {
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
            let start = (this.props.pageSize * (this.activePage - 1));
            this.props.stores[0].read(
                (response) => {
                    this.setState({
                        rows: response.data,
                        totalCount: response.data.length
                    });
                }, undefined, start, this.props.pageSize, this.__q, this.__filters);
        } else {
            this.props.store.read(undefined, undefined, this.__q, this.__filters);
        }

    };

    /**
     * Do not implement
     * @param store
     */
    triggerChange(store:Store) {
        this.setState({
            rows: store.getResult().data,
            totalCount: store.getResult().data.length
        });
    }
}
