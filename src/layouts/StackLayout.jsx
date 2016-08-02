import React from "react";
import { ShallowComponent, Maps, Assertions } from "robe-react-commons";
import { Panel, Row, Col ,Glyphicon } from "react-bootstrap";
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
         * Presentation mode.
         */
        display: React.PropTypes.oneOf(["list", "thumbnail"]),
        style: React.PropTypes.object,
        items: React.PropTypes.oneOfType(
            React.PropTypes.array,
            React.PropTypes.object
        ),
        onItemRender: React.PropTypes.func,
        toolbar: React.PropTypes.object,
        toolbarPosition: React.PropTypes.oneOf(["bottom", "top", "left", "right"]),
        onSelected: React.PropTypes.func
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
        items: []
    };

    _style;

    _selectedList;

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onClickDisplayList = this.onClickDisplay.bind(this, "list");
        this.onClickDisplayThumbnail = this.onClickDisplay.bind(this, "thumbnail");
        this._selectedList = [];
        this.state = {
            display: props.display,
            items: props.items,
            selectedList: this._selectedList
        };
        this._style = Maps.mergeDeep(props.style, style);
    }

    render() {
        let component = this.list(this.state.items);
        let panel = (
            <Panel
                ref="parent"
                header={this.panelToolbar()}
            >
                <div
                    onClick={this.onClick}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    style={this._style}
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

    panelToolbar() {
        let listClassName = `btn btn-default ${this.state.display === "list" ? "active" : ""}`;
        let thumbnailClassName = `btn btn-default ${this.state.display === "thumbnail" ? "active" : ""}`;
        return [
            <div className="btn-group pull-right">
                <button type="button" className={listClassName} onClick={this.onClickDisplayList}>
                    <Glyphicon glyph="list" />
                </button>
                <button type="button" className={thumbnailClassName} onClick={this.onClickDisplayThumbnail}>
                    <Glyphicon glyph="th-large" />
                </button>
            </div>,
            <div className="clearfix"></div>
        ];
    }
    list(items: Array) {
        let components = [];
        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                components.push(this.listItem(items[key]));
            }
        }
        return (
            <Row>
                {components}
            </Row>
        );
    }

    listItem(item: Map) {
        let checked = this.state.selectedList.indexOf(item.filename) !== -1 ? "checked" : "";
        let itemClick = this.onItemClick.bind(this, item);
        let className = null;
        switch (this.state.display) {
            case "thumbnail":
                className = `row stacklayout thumbnail no-float ${checked}`;
                return (
                   <div className={className} onClick={itemClick}>
                       {this.props.onItemRender(item, this.state.display)}
                   </div>
               )
            default:
                className = `stacklayout no-float ${checked}`;
                return (
                    <Col md={12} className={className} onClick={itemClick} >
                        {this.props.onItemRender(item, this.state.display)}
                    </Col>
                );
        }
    }


    /**
     * Called when the user starts to drag a <p> element
     * @param e
     * @returns {boolean}
     */
    onDragStart(e) {
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
    onDragEnter(e) {
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
    onDragOver(e) {
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
    onDragLeave(e) {
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
    onDrop(e) {
        e.preventDefault();
        let result = false;
        if (this.props.onDrop) {
            result = this.props.onDrop.call(this, e);
        }
        return result;
    }
    /* eslint-disable no-underscore-dangle */
    onItemClick(item, e) {
        this._selectedList = this._selectedList.slice(0);
        let index = this._selectedList.indexOf(item.filename);
        if (index === -1) {
            this._selectedList.push(item.filename);
        } else {
            this._selectedList.splice(index, 1);
        }
        this.setState({
            selectedList: this._selectedList
        });
        return true;
    }

    onClickDisplay(display) {
        this.setState({
            display
        });
    }
    /**
     * Called when a element is clicked
     * @param e
     * @returns {boolean}
     */
    onClick(e) {
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
