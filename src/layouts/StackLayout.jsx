import React from "react";
import { ShallowComponent, Maps, Assertions } from "robe-react-commons";
import { Panel, Row, Col, Glyphicon } from "react-bootstrap";
import "./StackLayout.css";

const style = {
    minHeight: 200
};

export default class StackLayout extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * Presentation mode list or thumbnail.
         */
        display: React.PropTypes.oneOf(["list", "thumbnail"]),
        /**
         * Header of Layout
         */
        label: React.PropTypes.string,
        /**
         * Layout Container style
         */
        style: React.PropTypes.object,
        items: React.PropTypes.array,
        
        /**
         * Add Toolbar to layout . Default position is bottom
         */
        toolbar: React.PropTypes.object,
        /**
         * toolbar position
         */
        toolbarPosition: React.PropTypes.oneOf(["bottom", "top", "left", "right"]),
        /**
         * render item by class which is using this layout.
         */
        onItemRender: React.PropTypes.func,
        /**
         * if layout container clicked then triggered.
         */
        onClick: React.PropTypes.func,
        /**
         * if any item selection changed.
         */
        onItemClick: React.PropTypes.func,
        /**
         * when a draggable element is dropped in the layout container element.
         */
        onDrop: React.PropTypes.func,
        /**
         * when a draggable element is moved out of the layout container element.
         */
        onDragLeave: React.PropTypes.func,
        /**
         * when an element is being dragged over the layout container element.
         */
        onDragOver: React.PropTypes.func,
        /**
         * when a draggable element enters the layout container element.
         */
        onDragEnter: React.PropTypes.func,
        /**
         * when the user starts to drag the layout container element.
         */
        onDragStart: React.PropTypes.func

    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        buttonToolbar: null,
        toolbarPosition: "bottom",
        display: "list",
        style: {},
        items: [],
        onItemRender: (item, displayType) => {
            if (displayType === "list") {
                return (<span> <span style={{ fontSize: "18px" }}> {`${item.key} `}</span>{item.value}</span>);
            }
            return (
                <span>
                    <span style={{ fontSize: "24px" }}> {item.key}</span>
                    <br />
                    {item.value}
                </span>);
        }
    };


    constructor(props: Object) {
        super(props);

        this.onClickDisplayList = this.onClickDisplay.bind(this, "list");
        this.onClickDisplayThumbnail = this.onClickDisplay.bind(this, "thumbnail");
        this.state = {
            display: props.display,
            items: props.items
        };
    }

    render(): Object {
        let component = this.__renderList(this.state.items);
        let panel = (
            <Panel header={this.panelToolbar()} >
                <div
                    className="StackLayout-container"
                    onClick={this.onClick}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    style={this.props.style}
                >
                    {component}
                </div>
            </Panel>
        );

        if (!this.props.toolbar) {
            return panel;
        }
        switch (this.props.toolbarPosition) {
            case "top":
                return (
                    <div>
                        {this.props.toolbar}
                        {panel}
                    </div>
                );
            case "left":
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">{this.props.toolbar}</div>
                            <div className="col">{panel}</div>
                        </div>
                    </div>
                );
            case "right":
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">{panel}</div>
                            <div className="col">{this.props.toolbar}</div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        {panel}
                        {this.props.toolbar}
                    </div>
                );
        }
    }

    panelToolbar(): Object {
        let listClassName = `btn btn-default ${this.state.display === "list" ? "active" : ""}`;
        let thumbnailClassName = `btn btn-default ${this.state.display === "thumbnail" ? "active" : ""}`;
        return [
            this.props.label,
            <div className="btn-group pull-right">
                <button type="button" className={listClassName} onClick={this.onClickDisplayList}>
                    <Glyphicon glyph="list" />
                </button>
                <button type="button" className={thumbnailClassName} onClick={this.onClickDisplayThumbnail}>
                    <Glyphicon glyph="th-large" />
                </button>
            </div>,
            <div className="clearfix" />
        ];
    }
    __renderList(items: Array): Object {
        let components = [];
        for (let i = 0; i < items.length; i++) {
            components.push(this.__renderListItem(items[i]));
        }
        return (
            <Row>
                {components}
            </Row>
        );
    }

    __renderListItem(item: Map): Object {
        let className = null;
        let itemJson = JSON.stringify(item);
        switch (this.state.display) {
            case "thumbnail":
                className = "Stacklayout-thumbnail";
                return (
                    <Col
                        xs={6}
                        md={4}
                        className={className}
                        onClick={this.onItemClick}
                        data={itemJson}
                        key={itemJson}
                    >
                        {this.props.onItemRender(item, this.state.display) }
                    </Col>
                );
            default:
                className = "Stacklayout-list no-float";
                return (
                    <Col
                        md={12}
                        className={className}
                        onClick={this.onItemClick}
                        data={itemJson}
                        key={itemJson}
                    >
                        {this.props.onItemRender(item, this.state.display) }
                    </Col>
                );
        }
    }


    /**
     * Called when the user starts to drag a <p> element
     * @param e
     * @returns {boolean}
     */
    onDragStart(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragStart) {
            result = this.props.onDragStart.call(this, e);
        }
        return result;
    }
    /**
     * Called when a draggable element enters a drop target:
     * @param e
     * @returns {boolean}
     */
    onDragEnter(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragEnter) {
            result = this.props.onDragEnter.call(this, e);
        }
        return result;
    }
    /**
     * Called when an element is being dragged over a drop target
     * @param e
     * @returns {boolean}
     */
    onDragOver(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragOver) {
            result = this.props.onDragOver.call(this, e);
        }
        return result;
    }

    /**
     * Called when a draggable element is moved out of a drop target
     * @param e
     * @returns {boolean}
     */
    onDragLeave(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDragLeave) {
            result = this.props.onDragLeave.call(this, e);
        }
        return result;
    }
    /**
     * Called when a draggable element is dropped in a <div> element
     * @param e
     * @returns {boolean}
     */
    onDrop(e: Object): boolean {
        e.preventDefault();
        let result = false;
        if (this.props.onDrop) {
            result = this.props.onDrop.call(this, e);
        }
        return result;
    }
    /* eslint-disable no-underscore-dangle */
    /**
     * @param item
     * @param e
     * @returns {boolean}
     */
    onItemClick(e: Object): boolean {
        let dataElement = e.target;
        while (dataElement.getAttribute("data") == null) {
            dataElement = dataElement.parentElement;
        }
        if (this.props.onItemClick) {
            this.props.onItemClick(JSON.parse(dataElement.getAttribute("data")));
        }
        return true;
    }

    onClickDisplay(display: string) {
        this.setState({
            display
        });
    }
    /**
     * Called when a element is clicked
     * @param e
     * @returns {boolean}
     */
    onClick(e: Object): boolean {
        if (Assertions.isArray(e._dispatchInstances)) {
            return false;
        }
        let result = false;
        if (this.props.onClick) {
            result = this.props.onClick.call(this, e);
        }
        return result;
    }
}
