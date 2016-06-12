import React from "react";
import { ShallowComponent } from "robe-react-commons";
import is from "is-js";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Table from "react-bootstrap/lib/Table";
import DataTableBodyRow from "datagrid/DataGridBodyRow";
import Pagination from "react-bootstrap/lib/Pagination";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Input from "react-bootstrap/lib/Input";
import ModalConfirm from "form/ModalConfirm";
import Filter from "datagrid/filter/Filter";
import Maps from "robe-react-commons/lib/utils/Maps";
import "datagrid/style.css";

/**
 * TODO removing un used css
 */

class DataGrid extends ShallowComponent {

    static propTypes = {
        onNewClick: React.PropTypes.func,
        onEditClick: React.PropTypes.func,
        onDeleteClick: React.PropTypes.func,
        onSelection: React.PropTypes.func,
        pageable: React.PropTypes.bool,
        pageSize: React.PropTypes.number,
        editable: React.PropTypes.bool,
        addButton: React.PropTypes.bool,
        editButton: React.PropTypes.bool,
        deleteButton: React.PropTypes.bool,
        searchable: React.PropTypes.bool,
        disableAddButton: React.PropTypes.bool,
        addButtonText: React.PropTypes.string,
        editButtonText: React.PropTypes.string,
        deleteButtonText: React.PropTypes.string
    };

    static defaultProps = {
        editable: true,
        addButton: true,
        editButton: true,
        deleteButton: true,
        searchable: true,
        disableAddButton: false,
        addButtonText: "Yeni Ekle",
        editButtonText: "Düzenle",
        deleteButtonText: "Sil"
    };

    activePage = 1;
    selection:undefined;
    __q = undefined;
    __filters = undefined;

    uniqueRef = new Date().getTime();


    constructor(props) {
        super(props);

        this.state = {
            rows: [],
            hasSelection: false,
            modalDeleteConfirm: false,
            visiblePopups: {}
        };

        this.activePage = 1;

        var columns = this.props.columns;
        if (!columns)
            return;
    };

    render() {

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

                <Filter columns={this.props.columns}
                        visiblePopups={this.state.visiblePopups}
                        onChange={this.__onFilterChanged}
                ></Filter>
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
        )
    };

    __renderSearchInput = ()=> {

        if (this.props.searchable) {

            return (
                <Input
                    addonBefore={<i className="fa fa-search"/>}
                    type="text"
                    placeholder="Arama"
                    onChange={this.__onSearchChanged}
                    ref="input"/>
            );
        } else {
            return null;
        }

    };
    __renderActionButtons = ()=> {
        if (!this.props.editable || this.props.hidden)
            return null;

        let addButton = (this.props.addButton && this.props.onNewClick) ?
            <Button disabled={this.props.disableAddButton} onClick={this.props.onNewClick}><Glyphicon glyph="plus"/><Col
                componentClass="span" className="hidden-xs"> {this.props.addButtonText}</Col></Button> : null;
        let editButton = (this.props.editButton && this.props.onEditClick) ?
            <Button disabled={!this.state.hasSelection} onClick={this.props.onEditClick}><Glyphicon glyph="pencil"/><Col
                componentClass="span" className="hidden-xs"> {this.props.editButtonText}</Col></Button> : null;
        let deleteButton = (this.props.deleteButton && this.props.onDeleteClick) ?
            <Button disabled={!this.state.hasSelection} onClick={this.__showDeleteConfirm}><Glyphicon
                glyph="trash"/><Col componentClass="span"
                                    className="hidden-xs"> {this.props.deleteButtonText}</Col></Button> : null;
        return (
            <ButtonGroup className="pull-right">
                {addButton}
                {editButton}
                {deleteButton}
            </ButtonGroup>
        );
    };
    __onDeleteConfirm = ()=> {
        this.props.onDeleteClick(this.__readData);
        this.__hideDeleteConfirm();

        this.setState({
            hasSelection: false
        })

    };
    __showDeleteConfirm = ()=> {
        this.setState({
            modalDeleteConfirm: true
        });
    };

    __hideDeleteConfirm = ()=> {
        this.setState({
            modalDeleteConfirm: false
        });
    };
    __renderModalConfirm = ()=> {
        return (<ModalConfirm header="Silmek istediğinizden emin misiniz ?"
                              message="Seçili kayıt silinecektir.Bu işlem geri alınamaz."
                              onOkClick={this.__onDeleteConfirm} onCancelClick={this.__hideDeleteConfirm}
                              show={this.state.modalDeleteConfirm}/>);
    };

    __renderPagination = ()=> {

        if (!this.props.pageable) {
            return null;
        }

        let items = this.__calculatePaginationItems();
        let _start = (this.props.pageSize * (this.activePage - 1));
        let _end = _start + this.props.pageSize;
        let _total = this.props.store.getTotalCount();

        if (_end > _total) {
            _end = _total;
        }
        let pagination;
        if (_total != 0) {
            pagination = (<span><p className="hidden-xs">{_total} tanesinden görüntülenen {_start + 1}-{_end}</p><p
                className="visible-xs">{_total} / {_start + 1}-{_end}</p></span>);
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
                            maxButtons={5}/>
                        <Pagination
                            className="visible-xs pull-right"
                            prev
                            next
                            ellipsis={false}
                            boundaryLinks
                            activePage={this.activePage}
                            onSelect={this.__handlePaginationSelect}
                            items={items}
                            maxButtons={1}/>
                    </Col>
                </Row>
            </Col>);


    };

    __calculatePaginationItems = ()=> {
        return Math.ceil(this.props.store.getTotalCount() / this.props.pageSize);
    };
    __handlePaginationSelect = (event, selectedEvent)=> {
        this.activePage = selectedEvent.eventKey;
        this.__readData();
    };

    __generateHeader = (columns) => {
        var trArr = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            if (column.type === "upload")
                continue;

            if (column.visible != false) {
                var filterBtn = column.filter === true ?
                    <i id={"tableColumn-"+column.code} className="fa fa-filter pull-right" aria-hidden="true"
                       onClick={this.__openFilterPopups.bind(undefined,column.code)}></i> :
                    <span></span>;
                trArr.push(<th key={column.code}>
                    {column.title}
                    {filterBtn}
                </th>);
            }
        }

        return (trArr);
    };

    __openFilterPopups = (code)=> {
        var isVisible = this.state.visiblePopups[code];
        var shows = {};
        shows[code] = !isVisible;
        this.setState({
            visiblePopups: shows
        });

    };

    __onFilterChanged = (filterState)=> {
        var filters = [];
        Maps.forEach(filterState.filters, function (a, b) {
            filters.push(a);
        });
        this.__filters = filters.join(",");
        this.__readData();
    };

    __generateRows = (columns, rows) => {
        if (!rows)
            return;
        var rowsArr = [];
        var size = rows.length != undefined ? rows.length : rows.size();
        for (var i = 0; i < size; i++) {
            var row = rows[i];
            if (!is.object(row)) {
                console.warn("Undefined data row at:", i, row);
                continue;
            }

            rowsArr.push(<DataTableBodyRow key={row.oid} resources={this.props.resources}
                                           columns={columns}
                                           data={row}
                                           onSelection={this.__onSelection}/>);

        }
        return rowsArr;
    };

    getSelectedRows = ()=> {
        var selections = [];
        if (this.selection) {
            selections.push(this.selection.props.data)
        }
        return selections;
    };

    __onSearchChanged = (event)=> {
        this.__q = event.target.value;
        this.activePage = 1;
        this.__readData();
    };

    __onSelection = (selection)=> {
        if (this.selection) {
            if (this.selection.props == selection.props) {
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

        if (this.props.onSelection)
            this.props.onSelection(this.selection.props.data);
    };

    __readData = ()=> {
        // this.selection = undefined;
        if (this.props.pageable) {
            let _start = (this.props.pageSize * (this.activePage - 1));
            this.props.store.read(_start, this.props.pageSize, this.__q, this.__filters);
        } else {
            this.props.store.read(undefined, undefined, this.__q, this.__filters);
        }

    };
    componentDidMount = () => {
        this.props.store.register(this.uniqueRef, this, "rows");
        this.__readData();
        this.props.store.triggerChange(this, "rows");
    };
    componentWillUnmount = ()=> {
        this.props.store.unRegister(this.uniqueRef, "rows");
    };
}


module.exports = DataGrid;