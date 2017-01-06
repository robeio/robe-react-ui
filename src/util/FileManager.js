import { AjaxRequest, Maps, Class } from "robe-react-commons";
import HttpError from "robe-react-commons/lib/connections/HttpError";
import Http from "robe-ajax";

export default class FileManager extends Class {

    __uploadProps;
    __infoRequest;
    __deleteRequest;

    constructor(props: Object) {
        super();
        this.__uploadProps = FileManager.createUpload(props);
        this.__infoRequest = new AjaxRequest(FileManager.createInfo(props));
        this.__deleteRequest = new AjaxRequest(FileManager.createDelete(props));
    }

    /**
     * @param {any} keys
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    info(keys: any, onSuccess: Function, onError: Function) {
        this.__infoRequest.call(keys, undefined, onSuccess, FileManager.createOnError(onError));
    }
    /**
     * upload multiple file
     * @param {string} fieldName
     * @param {Array} files
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    upload(fieldName: string, files: Array<string>, onSuccess: Function, onError: Function) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(fieldName, files[i].file);
        }
        this.__upload(formData, (response) => {
            for (let i = 0; i < response.length; i++) {
                files[i].id = response[i].id;
            }
            onSuccess(files);
        }, onError);
    }

    /**
     * upload file(s) formData.
     * @param formData
     * @param onSuccess
     * @param onError
     * @private
     */
    __upload(formData, onSuccess: Function, onError: Function) {
        let uploadProps = {
            data: formData,
            success: onSuccess,
            error: FileManager.createOnError(onError)
        };
        uploadProps = Maps.mergeDeep(uploadProps, this.__uploadProps);
        Http.ajax(uploadProps);
    }

    /**
     * @param {any} keys
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    delete(keys: any, onSuccess: Function, onError: Function) {
        this.__deleteRequest.call(keys, undefined, onSuccess, FileManager.createOnError(onError));
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
    static createUpload(props: Object): Object {
        let uploadRequest = FileManager.createInstance("upload", props, "PUT");
        if (uploadRequest.contentType === undefined) {
            uploadRequest.contentType = false;
        }
        if (uploadRequest.processData === undefined) {
            uploadRequest.processData = false;
        }
        FileManager.setCorelationId(props, uploadRequest);
        return uploadRequest;
    }

    /**
     * @param {Object} props
     * @returns {Object}
     */
    static createInfo(props: Object): Object {
        let infoRequest = FileManager.createInstance("info", props, "POST");
        FileManager.setCorelationId(props, infoRequest);
        return infoRequest;
    }

    /**
     * @param {Object} props
     * @returns {Object}
     */
    static createDelete(props: Object): Object {
        let deleteRequest = FileManager.createInstance("delete", props, "DELETE");
        FileManager.setCorelationId(props, deleteRequest);
        return deleteRequest;
    }

    static createInstance(key: string, props: Object, type: string): Object {
        let instance = props[key];
        if (!instance) {
            instance = {};
        }
        if (!instance.url) {
            instance.url = props.url;
        }
        if (!instance.type) {
            instance.type = type;
        }
        return instance;
    }
    /**
     * @param {Object} props
     * @param {Object} destination
     * @returns {Object}
     */
    static setCorelationId(props: Object, destination: Object) {
        if (props.correlationId) {
            destination.beforeSend = (req: Object) => {
                req.setRequestHeader("X-Correlation-ID", props.correlationId);
            };
        }
    }
}
