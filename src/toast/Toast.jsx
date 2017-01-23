import React from "react";
import ReactDOM from "react-dom";
import { ShallowComponent, Generator, Class, Arrays, Maps } from "robe-react-commons";
import ClassName from "../util/css/ClassName";
import "./Toast.css"

const TIMEOUTS = {
    REMOVE: 500,
    RETRY: 500,
    SHOW: 5000
}
const Constants = {
    INFO: "toast-item-info",
    SUCCESS: "toast-item-success",
    WARNING: "toast-item-warning",
    ERROR: "toast-item-error"
};

const Positions = {
    TOP_RIGHT: "top-right",
    TOP_LEFT: "top-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_LEFT: "bottom-left"
};

const getTime = () => {
    let d = new Date();
    return d.getTime();
};

class Toast extends ShallowComponent {
    static containerNode;
    static componentId = Generator.guid();
    __removeAction = true;
    __queueList = [];

    static propTypes = {
        /**
         * Desired position of toast to be shown on screen
         * { "top-right", "top-left", "bottom-right", "bottom-left" }
         */
        position: React.PropTypes.oneOf(["top-right", "top-left", "bottom-right", "bottom-left"]).isRequired,
        /**
         * Maximum available number of visible toasts
         */
        maxVisible: React.PropTypes.number,
        /**
         *  Message to be shown on Toast
         */
        message: React.PropTypes.string,
        /**
         *  Message to be shown on Toast
         */
        title: React.PropTypes.string,
        /**
         *  Display time of toast
         */
        timeOut: React.PropTypes.number,
        /**
         *  Function to be called when toast is clicked
         */
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        position: "top-right",
        timeOut: TIMEOUTS.SHOW,
        maxVisible: 5
    };

    /**
     * Creates an instance of Toast.
     */
    constructor(props) {
        super(props);

        this.state = {
            listToast: [],
        }

        Toast.success = this.success;
        Toast.info = this.info;
        Toast.warning = this.warning;
        Toast.error = this.error;
    }

    render() {
        return (
            <div className={`toast toast-${this.props.position}`}>
                {this.__renderItems()}
            </div>
        )
    }

    __renderItems() {
        let arr = [];
        for (let index in this.state.listToast) {
            let item = this.state.listToast[index];
            let maxLength = item.title ? 24 : 48;
            arr.push(
                <div
                    key={item.id}
                    id={item.id}
                    className={"toast-item toast-item-open " + item.type}
                    style={{ zIndex: item.zIndex }}
                    onClick={item.onClick}>
                    <div
                        className="toast-item-title"
                        style={{ padding: item.message ? "12px 12px 6px 12px" : "20px" }}>
                        {item.title}
                    </div>
                    <div
                        className="toast-item-content"
                        style={{ padding: item.title ? "0px 12px 12px 12px" : "20px" }}>
                        {item.message}
                    </div>
                </div>)
        }
        return arr;
    }

    __addQueue(toast) {
        if (this.state.listToast.length >= this.props.maxVisible || (this.__queueList[0] && this.__queueList[0].id != toast.id)) {
            if (!Arrays.isExistByKey(this.__queueList, "id", toast)) {
                this.__queueList.push(toast);
            }
            setTimeout(() => {
                this.__addQueue(toast);
            }, TIMEOUTS.RETRY);
            return;
        }
        Arrays.removeByKey(this.__queueList, "id", toast);
        this.__addToast(toast);

    }

    __addToast(toast) {
        let list = this.state.listToast.slice(0);
        let item = this.state.listToast[this.state.listToast.length - 1];
        toast.zIndex = item ? item.zIndex - 1 : this.props.maxVisible;
        if (this.props.position === "top-right" || this.props.position === "top-left") {
            list.push(toast);
        }
        else {
            list.unshift(toast)
        }
        this.setState({
            listToast: list
        }, this.__removeToast.bind(undefined, toast));
    }

    __removeToast(toast) {
        let element = document.getElementById(toast.id);
        if (element === undefined) {
            return;
        }
        if (!this.__removeAction) {
            setTimeout(() => {
                this.__removeToast(toast);
            }, TIMEOUTS.REMOVE);
            return;
        }
        setTimeout(() => {
            this.__removeAction = true;
        }, TIMEOUTS.REMOVE);
        this.__removeAction = false;
        setTimeout(() => {
            ClassName.replace(element, "toast-item-open", "toast-item-close");
            setTimeout(() => {
                let arr = this.state.listToast.slice(0);
                Arrays.removeByKey(arr, "id", toast);
                this.setState({ listToast: arr });
            }, TIMEOUTS.REMOVE);
        }, toast.timeOut);
    }
    closeOnClick(e) {
        let id = e.target.getAttribute("id");
        let element = e.target;
        if (!id) {
            id = e.target.parentNode.getAttribute("id");
            element = e.target.parentNode;
        }
        ClassName.replace(element, "toast-item-open", "toast-item-close");
        let arr = this.state.listToast.slice(0);
        Arrays.removeByKey(arr, "id", { id });
        this.setState({ listToast: arr });
    }

    /**
     * Toast.info(message, title, timeOut, callback)
     * @param message
     * @param title
     * @param timeOut
     * @param onClick
     */
    info(message, title, timeOut, onClick) {
        this.__addQueue({
            id: getTime(),
            type: Constants.INFO,
            message: message,
            title: title,
            timeOut: timeOut || this.props.timeOut,
            onClick: onClick || this.closeOnClick
        });
    }

    /**
     *  Toast.success(message, title, timeOut, callback)
     * @param message
     * @param title
     * @param timeOut
     * @param onClick
     */
    success(message, title, timeOut, onClick) {
        this.__addQueue({
            id: getTime(),
            type: Constants.SUCCESS,
            message: message,
            title: title,
            timeOut: timeOut || this.props.timeOut,
            onClick: onClick || this.closeOnClick
        });
    }

    /**
     *  Toast.warning(message, title, timeOut, callback)
     * @param message
     * @param title
     * @param timeOut
     * @param onClick
     */
    warning(message, title, timeOut, onClick) {
        this.__addQueue({
            id: getTime(),
            type: Constants.WARNING,
            message: message,
            title: title,
            timeOut: timeOut || this.props.timeOut,
            onClick: onClick || this.closeOnClick
        });
    }

    /**
     *  Toast.error(message, title, timeOut, callback)
     * @param message
     * @param title
     * @param timeOut
     * @param onClick
     */
    error(message: string, title: string, timeOut: number, onClick: func) {
        this.__addQueue({
            id: getTime(),
            type: Constants.ERROR,
            message: message,
            title: title,
            timeOut: timeOut || this.props.timeOut,
            onClick: onClick || this.closeOnClick
        });
    }
    static configuration(props) {
        ReactDOM.render(<Toast {...props} />, this.containerNode);

    }
}


let element = document.createElement("div");
element.setAttribute("id", Toast.componentId);
document.body.appendChild(element);
Toast.containerNode = document.getElementById(Toast.componentId);
Toast.configuration();
export default Toast;
