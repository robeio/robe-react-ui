import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {
    Row,
    Col,
    ButtonGroup,
    Button
} from "react-bootstrap";
import BPagination from "react-bootstrap/lib/Pagination";
import FaIcon from "../faicon/FaIcon";

export default class Pagination extends ShallowComponent {
    static propTypes: Map = {
        /**
         * Fields Configurations to show style on view.
         */
        visible: React.PropTypes.boolean,
        activePage: React.PropTypes.number,
        pageSize: React.PropTypes.number,
        totalCount: React.PropTypes.number,
        displayText: React.PropTypes.string,
        emptyText: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onPageSizeChange: React.PropTypes.func,
        onRefresh: React.PropTypes.func,
        pageSizeButtons: React.PropTypes.array

    };
    static defaultProps = {
        pageSizeButtons: [],
        visible: true,
        pageSize: 5,
        totalCount: 0,
        activePage: 0,
        emptyText: "No data to display.",
        displayText: "Showing {start} to {end} of {total} entries"
    };

    /**
    * @returns {Object}
    */
    render(): Object {
        if (!this.props.visible) {
            return <span />;
        }
        let items = Math.ceil(this.props.totalCount / this.props.pageSize);

        let start = (this.props.pageSize * (this.props.activePage - 1));
        let end = start + this.props.pageSize;
        let total = this.props.totalCount;

        if (end > total) {
            end = total;
        }
        let paginationText;
        if (total !== 0) {
            let text = this.props.displayText.replace(/\{start\}/g, (start + 1)).replace(/\{end\}/g, end).replace(/\{total\}/g, total);
            paginationText = (<p>{text}</p>);
        } else {
            paginationText = (<p>{this.props.emptyText}</p>);
        }

        let pageSizeButtons = [];
        for (let i = 0; i < this.props.pageSizeButtons.length; i++) {
            let value = this.props.pageSizeButtons[i];
            pageSizeButtons.push(
                <Button key={i} active={this.props.pageSize === parseInt(value, 10)} onClick={this.props.onPageSizeChange} value={value}>
                    {value}
                </Button>);
        }

        return (
            <Col className="datagrid-pagination-row">
                <Row>
                    <Col sm={4}>
                        <ButtonGroup className="hidden-xs" bsSize="small">
                            {this.props.refreshable ? (<Button onClick={this.props.onRefresh}><FaIcon code="fa-refresh" /></Button>) : undefined}
                            {pageSizeButtons}
                        </ButtonGroup>
                    </Col>
                    <Col sm={4} className="text-center">
                        <BPagination
                            style={{ margin: "0px" }}
                            prev
                            next
                            first
                            last
                            boundaryLinks
                            activePage={this.props.activePage}
                            onSelect={this.props.onChange}
                            items={items}
                            maxButtons={5}
                            bsSize="xsmall"
                        />
                    </Col>
                    <Col sm={4} className="text-center" style={{ paddingTop: "5px" }}>
                        {paginationText}
                    </Col>
                </Row>
            </Col>);
    }

}
