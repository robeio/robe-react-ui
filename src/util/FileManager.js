import { AjaxRequest, Maps } from "robe-react-commons";
import HttpError from "robe-react-commons/lib/connections/HttpError";
import jajax from "jajax";

export default class FileManager {
    /**
     *
     */
    __request;
    /**
     *
     */
    __info;
    /**
     *
     */
    __preview;
    /**
     *
     */
    __delete;

    /**
     *
     * @param props
     */
    constructor(props: Object) {
        this.__request = FileManager.createRequest(props);
        this.__info = new AjaxRequest(this.__request.info);
        this.__preview = new AjaxRequest(this.__request.preview);
        this.__delete = new AjaxRequest(this.__request.delete);
        this.upload = this.upload.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.load = this.load.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.preview = this.preview.bind(this);
        this.previewFile = this.previewFile.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    upload(name: string, files: Array, onSuccess: Function, onError: Function) {
        let formData = new FormData();
        let appendFile = (value) => {
            formData.append(name, value);
        };
        Maps.forEach(files, appendFile);
        let uploadProps = {
            data: formData,
            success: onSuccess,
            error: FileManager.createOnError(onError)
        };
        uploadProps = Maps.mergeDeep(uploadProps, this.__request.upload);
        jajax.ajax(uploadProps);
    }

    /**
     * upload file
     * @param {string} name
     * @param {Array} files
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    uploadFile(file: Object, onSuccess: Function, onError: Function) {
        let formData = new FormData();
        formData.append(name, file);

        let uploadProps = {
            data: formData,
            success: onSuccess,
            error: FileManager.createOnError(onError)
        };
        uploadProps = Maps.mergeDeep(uploadProps, this.__request.upload);
        jajax.ajax(uploadProps);
    }
    /**
     * @param {Array} filenames
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    load(filenames, onSuccess: Function, onError: Function) {
        this.__info.call(filenames, undefined, onSuccess, FileManager.createOnError(onError));
    }
    /**
     * @param {string} filename
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    loadFile(filename, onSuccess: Function, onError: Function) {
        this.__info.call([filename], undefined, onSuccess, FileManager.createOnError(onError));
    }
    /**
     * @param {Array} files
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    preview(files, onSuccess: Function, onError: Function) {
        this.__preview.call(files, undefined, onSuccess, FileManager.createOnError(onError));
    }
    /**
     * @param {Object} file
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    previewFile(file, onSuccess: Function, onError: Function) {
        this.__preview.call(file, undefined, onSuccess, FileManager.createOnError(onError));
    }
    /**
     * @param {Array} files
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    delete(files, onSuccess: Function, onError: Function) {
        this.__delete.call(files, undefined, onSuccess, FileManager.createOnError(onError));
    }
    /**
     * @param {Object} file
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    deleteFile(file, onSuccess: Function, onError: Function) {
        this.__delete.call(file, undefined, onSuccess, FileManager.createOnError(onError));
    }

    /**
     * @param {Function} errorCallback
     * @returns {Function}
     */
    static createOnError(errorCallback: Function): Function {
        return (xhr: Object, exception: string) => {
            let error = HttpError.parse(xhr, exception);
            errorCallback(error);
        };
    }


    /**
     * @param {Object} props
     * @returns {Object}
     */
    static createRequest(props: Object) {
        let request = props.request;
        request.upload = FileManager.createUpload(request);
        request.info = FileManager.createInfo(request);
        request.preview = FileManager.createPreview(request);
        request.delete = FileManager.createDelete(request);
        return request;
    }
    /**
     * @param {Object} request
     * @returns {Object}
     */
    static createUpload(request) {
        let uploadRequest = FileManager.createInstance("upload", request, "PUT");
        if (uploadRequest.contentType === undefined) {
            uploadRequest.contentType = false;
        }
        if (uploadRequest.processData === undefined) {
            uploadRequest.processData = false;
        }
        FileManager.setCorelationId(request, uploadRequest);
        return uploadRequest;
    }
    /**
     * @param {Object} request
     * @returns {Object}
     */
    static createInfo(request) {
        let infoRequest = FileManager.createInstance("info", request, "POST");
        FileManager.setCorelationId(request, infoRequest);
        return infoRequest;
    }
    /**
     * @param {Object} request
     * @returns {Object}
     */
    static createPreview(request) {
        let previewRequest = FileManager.createInstance("preview", request, "GET");
        FileManager.setCorelationId(request, previewRequest);
        return previewRequest;
    }
    /**
     * @param {Object} request
     * @returns {Object}
     */
    static createDelete(request) {
        let deleteRequest = FileManager.createInstance("delete", request, "DELETE");
        FileManager.setCorelationId(request, deleteRequest);
        return deleteRequest;
    }
    static createInstance(key: string, request: Object, type: string) {
        let instance = request[key];
        if (!instance) {
            instance = {};
        }
        if (!instance.url) {
            instance.url = request.url;
        }
        if (!instance.type) {
            instance.type = type;
        }
        return instance;
    }
    /**
     * @param {Object} request
     * @param {Object} destination
     * @returns {Object}
     */
    static setCorelationId(request: Object, destination: Object) {
        if (request.correlationId) {
            destination.beforeSend = (req: Object) => {
                req.setRequestHeader("X-Correlation-ID", request.correlationId);
            };
        }
    }
}

