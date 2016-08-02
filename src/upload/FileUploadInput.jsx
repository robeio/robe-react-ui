import React from "react";
import { ShallowComponent, Assertions, Generator } from "robe-react-commons";
import StackLayout from "../layouts/StackLayout";
import { Table, Thumbnail, Panel, ButtonGroup, Button, Glyphicon } from "react-bootstrap";
import FaIcon from "../faicon/FaIcon";
import FileManager from "../util/FileManager";
import "./filepicker.css";
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
        name: React.PropTypes.string.isRequired,
        /**
         * Presentation mode.
         */
        label: React.PropTypes.string,
        display: React.PropTypes.oneOf(["list", "thumbnail"]),
        /**
         * Mutliple file load.
         */
        multiple: React.PropTypes.bool,
        /**
         * Files Id Array List if `Multiple Mode` using (multiple = true)
         */
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        /**
         * Object Id will use on if files related with any entity
         */
        objectId: React.PropTypes.any,
        onChange: React.PropTypes.func,
        autoUpload: React.PropTypes.bool,
        request: React.PropTypes.object
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        display: "list",
        multiple: true,
        items: [],
        autoUpload: true
    };

    /**
     * @type {Array}
     * @private
     */

    __fileManager;

    // current items
    __items = [];
    /**
     * current files
     */
    __files = {};

    __uploadedFiles = [];
    __inProgress = [];

    constructor(props) {
        super(props);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onItemRender = this.onItemRender.bind(this);

        // init methods
        this.onInitSuccess = this.onInitSuccess.bind(this);
        // upload methods
        this.onUploadSucess = this.onUploadSucess.bind(this);
        this.onError = this.onError.bind(this);
        this.browse = this.browse.bind(this);
        this.upload = this.upload.bind(this);
        this.cancelUpload = this.cancelUpload.bind(this);
        // delete operation
        this.deleteItem = this.deleteItem.bind(this);
        this.onDelete = this.onDelete.bind(this);
        // init component
        this.init();
    }

    /**
     *
     */
    init() {
        this.__items = this.props.items ? this.props.items : [];
        this.__fileManager = new FileManager(this.props);
        this.state = {
            items: []
        };
        this.__files = {};
        this.__uploadedFiles = [];
        if (this.__items.length > 0) {
            this.__fileManager.load(this.__items, this.onInitSuccess, this.onError);
        }
    }
    /**
     *  Load File : {
	 *      destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp",
	 *      encoding: "7bit",
	 *      fieldname: "files",
	 *      filename: "e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      mimetype: "application/x-x509-ca-cert",
	 *      originalname: "hamburgsud.com.crt",
	 *      path: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp/e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      size: 2067
     *  }
     * @param {Array} files
     */
    onInitSuccess(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.filename || this.__items.indexOf(file.filename) === -1) {
                this.onError({
                    message: `Gelen ${file.path} dosyasında filename kimliği bulunamadı ! `
                });
            }
            this.__files[file.filename] = file;
        }

        this.setState({
            items: this.__items
        });

        return true;
    }

    browse(e) {
        console.log(e);
        if (!this.props.disableClick) {
            this.open();
        }
    }

    open() {
        this.fileInputEl.value = null;
        this.fileInputEl.click();
    }

    /**
     *  File = {
     *       lastModified: 1468913662000,
     *       lastModifiedDate: "Tue Jul 19 2016 10:34:22 GMT+0300 (EEST)",
     *       name: "hamburgsud.com.crt",
     *       size: 2067,
     *       type: "application/x-x509-ca-cert",
     *       webkitRelativePath: "",
     *   }
     * @param e
     * @returns {boolean}
     */
    onDrop(e) {
        const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;

        if (!droppedFiles || droppedFiles.length === 0) {
            this.onError({
                message: "File couldn't droppped. You must select valid file."
            });
            return false;
        }
        for (let i = 0; i < droppedFiles.length; i++) {
            droppedFiles[i].filename = Generator.guid();
        }
        this.upload(droppedFiles);
        return true;
    }

    /**
     */
    upload(files: Array) {
        this.__fileManager.upload(this.props.name, files, this.onUploadSucess, this.onError);
        return true;
    }

    /**
     * @param uploadedFiles
     */
    onUploadSucess(files: Array) {
        if (!files || !Assertions.isArray(files) || files.length === 0) {
            this.onError({
                message: "Upload Failed ! "
            });
            return false;
        }

        this.__items = this.__items.slice(0);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.__items.indexOf(file.filename) !== -1) {
                this.onError({
                    message: "File Name Exist ! "
                });
                return false;
            }
            this.__files[file.filename] = file;
            this.__uploadedFiles.push(file.filename);
        }
        this.setState({
            items: this.__items
        });
        return true;
    }

    onError(error: Map) {
        console.log(error);
    }

    cancelUpload() {

    }

    deleteItem(item) {
        // if is uploaded yet then delete it from server.
        if (this.__uploadedFiles.indexOf(item.filename) !== -1) {
            this.__fileManager.delete(item, (deletedFile: Object) => {
               this.onDelete(item);
            }, (error) => {
                error.key = item.filename;
                this.onError(error);
            });
            return true;
        }
        this.onDelete(item);
    }

    onDelete(item) {
        // clone items
        let items = this.__items.slice(0);

        // find item by filename
        let index = items.indexOf(item.filename);
        // delete item
        items.splice(index, 1);
        delete this.__files[item.filename];
        this.setState({
            items
        });
    }

    render() {
        return (
            <Panel>
                <StackLayout
                    ref="layout"
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
     * @param item
     * @param display
     * @returns {Object}
     */
    onItemRender(item: Map, display) {
        switch (display) {
            case "thumbnail":
                return this.thumbnail(item);
            default:
                return this.gridList(item);
        }
    }

    thumbnail(item: Map) {
        let onItemDelete = this.deleteItem.bind(this, item);
        return [
            <span className="gi-5x">
                <Glyphicon glyph="file" />
            </span>,
            <h5>{item.originalname}</h5>,
            <p>{item.description}</p>,
            <div style={{
                margin: 5
            }}>
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

    gridList(item: Map) {
        return (
            <Table
                width="100%"
                style={{
                    display: "inline-block"
                }}
            >
                <tbody>
                    <tr>
                        <td>{item.originalname}</td>
                        <td>{item.path}</td>
                        <td>{item.size}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    createButtons() {
        const inputAttributes = {
            type: "file",
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
                <Button className="btn-file" bsSize="large" onClick={this.browse}>
                    <Glyphicon glyph="folder-open" />&nbsp; <span className="hidden-xs">Browse …</span>
                    <input
                        {...inputAttributes}
                    />
                </Button>
            </ButtonGroup>
        );
    }

    onDragStart() {
        return false;
    }

    onDragEnter() {
        return false;
    }

    onDragOver() {
        return false;
    }

    onDragLeave() {
        return false;
    }

    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return super.shouldComponentUpdate(nextProps, nextState) || (this.state.items.length !== nextState.items.length);
    }
}

