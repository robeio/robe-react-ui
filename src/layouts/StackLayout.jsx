import React from "react";
import { ShallowComponent, Maps } from "robe-react-commons";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

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
        display: React.PropTypes.string,
        style: React.PropTypes.object,
        items: React.PropTypes.array,
        col: React.PropTypes.object,
        onItemRender: React.PropTypes.func
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        diplay: "list",
        style: {},
        items: [],
        col: {
            lg: 3,
            md: 4,
            xs: 6,
        }
    };

    _style;

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(props) {
        this.state = {
            display: props.display,
            items: props.items
        };
        this._style = Maps.mergeDeep(props.style, style);
    }

    render() {
        let component;
        switch (this.state.display) {
            case "thumbnail":
                component = this.thumbnail(this.state.items);
                break;
            default:
                component = this.list(this.state.items);
        }
        return (
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
        );
    }

    thumbnail(items: Array) {
        let components = [];
        for (let i = 0; i < items.length; i++) {
            components.push(this.thumbnailItem(items[i]));
        }
        return (
            <Row>
                {components}
            </Row>
        );
    }

    thumbnailItem(item: Map) {
        return (
            <Col {...this.props.col}>
                {this.props.onItemRender(this.state.display, item)}
            </Col>
        );
    }

    list(items: Array) {
        let components = [];
        for (let i = 0; i < items.length; i++) {
            components.push(this.listItem(items[i]));
        }
        return (
            <ListGroup responsive>
                {components}
            </ListGroup>
        );
    }

    listItem(item: Map) {
        return (
            <ListGroupItem header={item.header}>
                {this.props.onItemRender(this.state.display, item)}
            </ListGroupItem>
        );
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
    /**
     * Called when a element is clicked
     * @param e
     * @returns {boolean}
     */
    onClick(e) {
        let result = false;
        if (this.props.onClick) {
            result = this.props.onClick.call(this, e);
        }
        return result;
    }
}
