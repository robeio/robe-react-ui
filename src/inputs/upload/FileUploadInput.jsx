import React from "react";
import { ShallowComponent, Assertions, Generator } from "robe-react-commons";
import StackLayout from "../../layouts/StackLayout";
import { Table, Panel, ButtonGroup, Button, Glyphicon } from "react-bootstrap";
import FileManager from "../../util/FileManager";
import "./FileUploadInput.css";
// https://github.com/felixrieseberg/React-Dropzone-Component

const supportMultiple = (typeof document !== "undefined" && document && document.createElement) ?
"multiple" in document.createElement("input") :
    true;

export default class FileUploadInput extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * It is field name of uploaded file
         */
        name: React.PropTypes.string.isRequired,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * File Id List or File Name
         */
        value: React.PropTypes.arrayOf(React.PropTypes.string),
        /**
         * FileUploadInputStyle
         */
        containerStyle: React.PropTypes.object,
        /**
         * onChangeEvent event for the component
         */
        onChange: React.PropTypes.func,
        /**
         *
         */
        onError: React.PropTypes.func,
        /**
         * Presentation Mode
         */
        display: React.PropTypes.oneOf(["list", "thumbnail"]),
        /**
         *
         * TODO will implement
         * Max Uploaded file
         */
        maxFileSize: React.PropTypes.bool,
        /**
         * TODO will implement
         * auto upload is false then file will upload when clicking the upload button.
         */
        autoUpload: React.PropTypes.bool,
        request: React.PropTypes.object,
        /**
         * will disable browse button
         */
        disabledBrowse: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        containerStyle: {
            height: 400
        },
        display: "list",
        multiple: true,
        value: [],
        autoUpload: true,
        disabledBrowse: false
    };

    /**
     * @type {Array}
     * @access private
     */

    __fileManager;

    // current items
    __value = [];
    /**
     * Example File : {
	 *      destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp",
	 *      encoding: "7bit",
	 *      fieldname: "files",
	 *      filename: "e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      mimetype: "application/x-x509-ca-cert",
	 *      originalname: "examplefile.png",
	 *      path: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp/e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      size: 2067
     * }
     * current files
     */
    __uploadedFiles = [];
    constructor(props) {
        super(props);
        // init component
        this.__init();
    }

    /**
     * @desc initialize input
     */
    __init() {
        this.__value = this.props.value;
        this.__fileManager = new FileManager(this.props.remote);
        this.state = {
            value: []
        };
        this.__files = [];
        this.__uploadedFiles = [];
        if (this.__value.length > 0) {
            this.__fileManager.info(this.__value, this.__onInitSuccess, (error) => {
                this.__value = [];
                this.__onError(error);
            });
        }
    }
    /**
     * @desc success callback after loading given files.
     * @param {Array} files
     * @access private
     */
    __onInitSuccess(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileIndex = this.__value.indexOf(file.filename);
            if (!file.filename || fileIndex === -1) {
                this.__onError({
                    message: `Gelen ${file.path} dosyasında filename kimliği bulunamadı ! `
                });
            }
            this.__files[fileIndex] = file;
        }

        this.setState({
            items: this.__value
        });
        this.onChange("load", this.__value);
        return true;
    }

    /**
     * @desc Displays File Explorer to select file or files.
     * @access public
     */
    browse() {
        if (!this.props.disabledBrowse) {
            this.open();
        }
    }

    /**
     * @desc Opens File Expoler to select file or files
     * @access private
     */
    open() {
        this.fileInputEl.value = null;
        this.fileInputEl.click();
    }

    /**
     * @desc Uploads files array by Using FileManager
     * @param {Array} files
     * @returns {boolean}
     * @access private
     */
    upload(files: Array) {
        this.__fileManager.upload(this.props.name, files, this.__onUploadSucess, this.__onError);
        return true;
    }

    /**
     * @param {Array} uploadedFiles
     * @return {boolean}
     * @access private
     */
    __onUploadSucess(files: Array) {
        if (!files || !Assertions.isArray(files) || files.length === 0) {
            this.__onError({
                message: "Upload Failed ! "
            });
            return false;
        }
        let oldValue = this.__value;
        this.__value = oldValue.slice(0);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileIndex = this.__value.indexOf(file.filename);
            if (fileIndex !== -1) {
                this.__onError({
                    message: "File Name Exist ! "
                });
                return false;
            }
            this.__value.push(file.filename);
            fileIndex = this.__value.indexOf(file.filename);
            this.__files[fileIndex] = file;

            // new file uploaded
            this.__uploadedFiles.push(file.filename);
        }
        this.setState({
            items: this.__value
        });
        this.onChange("upload", this.__value, oldValue);
        return true;
    }

    /**
     * catchs any FileUploadInput's errors
     * @param {Map} error
     * @access private
     */
    __onError(error: Map) {
        if (this.props.onError) {
            this.props.onError(error);
        }
        console.log(error);
    }

    // TODO if any file uploading then cancelUpload must be enabled.
    cancelUpload() {

    }

    /**
     *
     * @param {Map} item
     * @returns {boolean}
     * @access public
     */
    deleteItem(item: Map) {
        // if is uploaded yet then delete it from server.
        if (this.__uploadedFiles.indexOf(item.filename) !== -1) {
            this.__fileManager.delete(item, () => {
                this.__onDelete(item);
            }, (error) => {
                error.key = item.filename;
                this.__onError(error);
            });
            return true;
        }
        this.__onDelete(item);
        return true;
    }

    /**
     * @param {Map} item
     * @access private
     */
    __onDelete(item: Map) {
        // clone items
        let oldValue = this.__value;
        let newValue = oldValue.slice(0);

        // find item by filename
        let index = newValue.indexOf(item.filename);
        // delete item
        newValue.splice(index, 1);
        this.__files.splice(index, 1);
        this.setState({
            items: newValue
        });
        this.onChange("delete", item, oldValue);
    }

    render() {
        return (
            <Panel>
                <StackLayout
                    style={this.props.containerStyle}
                    display={this.props.display}
                    label={this.props.label}
                    items={this.__files}
                    onItemRender={this.onItemRender}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    toolbar={this.createButtons()}
                    toolbarPosition="bottom"
                />
            </Panel>
        );
    }
    /**
     * @desc render items
     * @param {Map} item
     * @param {string} display
     * @returns {Object}
     */
    onItemRender(item: Map, display) {
        switch (display) {
            case "thumbnail":
                return this.thumbnail(item);
            default:
                return this.list(item);
        }
    }

    /**
     * @desc render item will shown in thumbnail layout
     * @param {Map} item
     * @returns {Array<Object>}
     */
    thumbnail(item: Map) {
        let onItemDelete = this.deleteItem.bind(this, item);
        return [
            <span className="gi-5x">
                <Glyphicon glyph="file" />
            </span>,
            <h5>{item.originalname}</h5>,
            <p>{item.description}</p>,
            <div
                style={{
                    margin: 5
                }}
            >
                <Button bsSize="xsmall" onClick={onItemDelete} >
                    <Glyphicon glyph="remove" />
                </Button>
                <Button bsSize="xsmall">
                    <Glyphicon glyph="upload" />
                </Button>
                <Button bsSize="xsmall">
                    <Glyphicon glyph="zoom-in" />
                </Button>
            </div>
        ];
    }

    /**
     * @desc render item will shown in list layout
     * @param item
     * @returns {Object}
     */
    list(item: Map) {
        return (
            <Table
                width="100%"
                style={{
                    display: "inline-block"
                }}
            >
                <tbody>
                    <tr>
                        <td>
                            <Glyphicon glyph="file" />
                        </td>
                        <td>{item.originalname}</td>
                        <td>{item.mime}</td>
                        <td>{item.size}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    /**
     *
     * @returns {XML}
     */
    createButtons() {
        const inputAttributes = {
            type: this.props.code ? this.props.code : "file",
            style: { display: "none" },
            multiple: supportMultiple && this.props.multiple,
            ref: el => this.fileInputEl = el, // eslint-disable-line
            onChange: this.onDrop
        };
        if (this.props.name && this.props.name.length) {
            inputAttributes.name = this.props.name;
        }


        return (
            <ButtonGroup className="pull-right">
                <Button className="btn-file" bsSize="small" disabled={this.props.disabledBrowse} onClick={this.browse}>
                    <Glyphicon glyph="folder-open" />&nbsp; <span className="hidden-xs">Browse …</span>
                    <input
                        {...inputAttributes}
                    />
                </Button>
            </ButtonGroup>
        );
    }

    /**
     *
     * @example File
     * File = {
     *       lastModified: 1468913662000,
     *       lastModifiedDate: "Tue Jul 19 2016 10:34:22 GMT+0300 (EEST)",
     *       name: "hamburgsud.com.crt",
     *       size: 2067,
     *       type: "application/x-x509-ca-cert",
     *       webkitRelativePath: "",
     *   }
     * @desc called when any file drop on the presentation layout.
     * @param {Object} e
     * @returns {boolean}
     */
    onDrop(e) {
        const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        console.log(droppedFiles);
        if (!droppedFiles || droppedFiles.length === 0) {
            this.__onError({
                message: "File couldn't droppped. You must select valid file."
            });
            return false;
        }
        for (let i = 0; i < droppedFiles.length; i++) {
            droppedFiles[i].filename = Generator.guid();
        }

        if (this.props.autoUpload) {
            this.upload(droppedFiles);
        }
        return true;
    }

    /**
     *
     * @returns {boolean}
     */
    onDragStart() {
        return false;
    }

    /**
     *
     * @returns {boolean}
     */
    onDragEnter() {
        return false;
    }

    /**
     *
     * @returns {boolean}
     */
    onDragOver() {
        return false;
    }

    /**
     *
     * @returns {boolean}
     */
    onDragLeave() {
        return false;
    }

    /**
     * @desc called when added or removed files from FileUploadInput
     * @param event
     * @param newValue
     * @param oldValue
     */
    onChange(event, newValue, oldValue) {
        if (this.props.onChange) {
            let e = {
                target: {
                    event: event,
                    oldValue: oldValue,
                    value: newValue
                }
            };
            this.props.onChange(e);
        }
    }
    /**
     * @ desc Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return super.shouldComponentUpdate(nextProps, nextState) || (this.state.items.length !== nextState.items.length);
    }
}

