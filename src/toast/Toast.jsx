import React from "react";
import ReactDOM from "react-dom";
import {ShallowComponent, Generator, Class, Arrays, Maps} from "robe-react-commons";
import ClassName from "../util/css/ClassName";
import "./Toast.css"

const Constants = {
    CHANGE: 'change',
    INFO: 'info-item',
    SUCCESS: 'success-item',
    WARNING: 'warning-item',
    ERROR: 'error-item'
};

const Positions = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left'
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
    numMaxVisible = 5;


    static propTypes = {
        /**
         * Desired position of toast to be shown on screen
         * { 'top-right', 'top-left', 'bottom-right', 'bottom-left' }
         */
        position: React.PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
        /**
         * Maximum available number of visible
         */
        numMaxVisible: React.PropTypes.number,
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
        position: 'top-right',
        timeOut: 5000,
        numMaxVisible: 5
    };

    /**
     * Creates an instance of Toast.
     */
    constructor(props) {
        super(props);
        Toast.info = this.info;
        Toast.success = this.success;
        Toast.warning = this.warning;
        Toast.error = this.error;
        Toast.getPosition = this.getPosition;
        Toast.getNumMaxVisible = this.getNumMaxVisible;
        Toast.configuration = this.configuration;

        this.state = {
            listToast: [],
            position: "top-right"
        }
    }

    render() {
        return (
            <div className={"toast "+this.state.position}>
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
                    className={"toast-item toast-item-open "+ item.type}
                    style={{zIndex:item.zIndex}}
                    onClick={item.onClick}>
                    <div
                        className="toast-item-title"
                        style={{padding: item.message ? "12px 12px 6px 12px" : "20px"}}>
                        {item.title ? (item.title.substr(0, 24) + (item.title.length > 24 ? ".." : "")) : ""}
                    </div>
                    <div
                        className="toast-item-content"
                        style={{padding: item.title ? "0px 12px 12px 12px" : "20px"}}>
                        {item.message ? (item.message.substr(0, maxLength) + (item.message.length > maxLength ? ".." : "")) : ""}
                    </div>
                </div>)
        }
        return arr;
    }

    __addQueue(toast) {
        if (this.state.listToast.length >= this.numMaxVisible || (this.__queueList[0] && this.__queueList[0].id != toast.id)) {
            if (!Arrays.isExistByKey(this.__queueList, "id", toast)) {
                this.__queueList.push(toast);
            }
            setTimeout(()=> {
                this.__addQueue(toast);
            }, 1000);
            return;
        }
        Arrays.removeByKey(this.__queueList, "id", toast);
        this.__addToast(toast);

    }

    __addToast(toast) {
        let list = this.state.listToast.slice(0);
        if (this.state.position === "top-right" || this.state.position === "top-left") {
            toast.zIndex = toast.timeOut + list.length;
            list.push(toast);
        }
        else {
            toast.zIndex = toast.timeOut + list.length;
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
            setTimeout(()=> {
                this.__removeToast(toast);
            }, 1000);
            return;
        }
        setTimeout(()=> {
            this.__removeAction = true;
        }, 1000);
        this.__removeAction = false;
        setTimeout(()=> {
            ClassName.replace(element, "toast-item-open", "toast-item-close");
            setTimeout(()=> {
                let arr = this.state.listToast.slice(0);
                Arrays.removeByKey(arr, "id", toast);
                this.setState({listToast: arr});
            }, 1000);
        }, toast.timeOut);
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
            timeOut: timeOut || 5000,
            onClick: onClick
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
            timeOut: timeOut || 5000,
            onClick: onClick
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
            timeOut: timeOut || 5000,
            onClick: onClick
        });
    }

    /**
     *  Toast.error(message, title, timeOut, callback)
     * @param message
     * @param title
     * @param timeOut
     * @param onClick
     */
    error(message:string, title:string, timeOut:number, onClick:func) {
        this.__addQueue({
            id: getTime(),
            type: Constants.ERROR,
            message: message,
            title: title,
            timeOut: timeOut || 5000,
            onClick: onClick
        });

    }

    /**
     *  Toast.configure({position:string})
     * @param config
     */
    configuration(config:Object) {
        if (config.numMaxVisible) {
            this.numMaxVisible = config.numMaxVisible;
        }
        if (!config.position) {
            return;
        }
        switch (config.position) {
            case "top-right":
                this.setState({position: Positions.TOP_RIGHT});
                break;
            case "top-left":
                this.setState({position: Positions.TOP_LEFT});
                break;
            case "bottom-right":
                this.setState({position: Positions.BOTTOM_RIGHT});
                break;
            case "bottom-left":
                this.setState({position: Positions.BOTTOM_LEFT});
                break;
            default:
                this.setState({position: Positions.TOP_RIGHT});
                break;
        }
    }

    /**
     * Toast.getPosition()
     * Return current position
     * @returns {string}
     */
    getPosition():String {
        return this.state.position;
    }

    /**
     * Toast.getMaxVisible()
     * Return maximum available number of visible
     * @returns {number}
     */
    getNumMaxVisible():Number {
        return this.numMaxVisible;
    }
}

let element = document.createElement('div');
element.setAttribute("id", Toast.componentId);
document.body.appendChild(element);
Toast.containerNode = document.getElementById(Toast.componentId);
ReactDOM.render(<Toast />, Toast.containerNode);

export default Toast;
