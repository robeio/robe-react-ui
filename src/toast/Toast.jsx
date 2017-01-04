import NotificationManager from "react-notifications/lib/NotificationManager";

const Constants = {
    CHANGE: "change",
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error"
};

const getTime = (): number => {
    let d = new Date();
    return d.getTime();
};

NotificationManager.numMaxVisible = Number.MAX_SAFE_INTEGER;
NotificationManager.configure = function configure(numMaxVisible : number) {
    NotificationManager.numMaxVisible = numMaxVisible;
};

NotificationManager.create = function create(notify: Object) {
    notify.type = notify.type || Constants.INFO;
    let defaultNotify = {
        id: getTime(),
        type: "info",
        title: null,
        message: null,
        timeOut: 5000
    };
    if (NotificationManager.listNotify.length >= NotificationManager.numMaxVisible) {
        NotificationManager.listNotify = NotificationManager.listNotify.splice(1, NotificationManager.numMaxVisible);
        NotificationManager.emitChange();
    }

    if (notify.priority) {
        NotificationManager.listNotify.unshift(Object.assign(defaultNotify, notify));
    } else {
        NotificationManager.listNotify.push(Object.assign(defaultNotify, notify));
    }
    NotificationManager.emitChange();
};

export default NotificationManager;
