import React from "react";
import { ShallowComponent, Assertions } from "robe-react-commons";
import StackLayout from "../layouts/StackLayout";
import { Grid, Row, Col, Table, Panel, ButtonGroup, Button, Input } from "react-bootstrap";
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
        display: React.PropTypes.string,
        multiple: React.PropTypes.bool,
        /**
         * Data Id is relation between files and data.
         */
        id: React.PropTypes.any,
        request: React.PropTypes.object,
        /**
         * Current file list.
         */
        files: React.PropTypes.string
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        display: "list",
        multiple: true,
        files: []
    };

    __currentFiles = [];

    __fileManager;

    constructor(props) {
        super(props);
        this.onItemRender = this.onItemRender.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onUploadSucess = this.onUploadSucess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
        this.browse = this.browse.bind(this);
        this.upload = this.upload.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);

        this.__fileManager = new FileManager(props);
        this.state = {
            loaded: false,
            display: props.display,
            files: props.files
        };
        this.load();
    }

    render() {
        return (
            <Panel>
                <StackLayout
                    display={this.props.display}
                    items={this.__currentFiles}
                    onItemRender={this.onItemRender}
                    onClick={this.browse}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                />
                {this.createButtons()}
            </Panel>
        );
    }
    /**
     * @param display
     * @param file
     * @returns {Object}
     */
    onItemRender(display, file: Map) {
        switch (display) {
            case "thumbnail" :
                return this.thumbnailItem(file);
            // case "list" :
            default :
                return this.listItem(file);
        }
    }


    /**
     *  Upload File : {
	 *      destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp",
	 *      encoding: "7bit",
	 *      fieldname: "files",
	 *      filename: "e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      mimetype: "application/x-x509-ca-cert",
	 *      originalname: "hamburgsud.com.crt",
	 *      path: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp/e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      size: 2067
     *  }
     * @param file
     * @returns {Object}
     */
    listItem(file: Map): Object {
        return (
            <Table responsive>
                <tbody>
                    <tr>
                        <td>{file.filename}</td>
                        <td>{file.mimetype}</td>
                        <td>{file.originalname}</td>
                        <td>{file.size}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
    /**
     *  Upload File : {
	 *      destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp",
	 *      encoding: "7bit",
	 *      fieldname: "files",
	 *      filename: "e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      mimetype: "application/x-x509-ca-cert",
	 *      originalname: "hamburgsud.com.crt",
	 *      path: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp/e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
	 *      size: 2067
     *  }
     * @param file
     * @returns {Object}
     */
    thumbnailItem(file: Map) {
        return (
            <Grid>
                <Row>
                    <Col sm={4} md={12}>{file.originalname}</Col>
                </Row>
                <Row>
                    <Col sm={4} md={2}>{file.mimeType}</Col>
                </Row>
                <Row>
                    <Col sm={4} md={2}>{file.size}</Col>
                </Row>
                <Row>
                    <Col sm={4} md={6}>{file.path}</Col>
                </Row>
            </Grid>
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
            <ButtonGroup>
                <Button
                    className="btn-default fileinput-remove fileinput-remove-button"
                    onClick={this.delete}
                >
                    <FaIcon code="trash-o" size="fa-lg" />
                    <span className="hidden-xs">Remove</span>
                </Button>
                <Button
                    className="btn-default fileinput-cancel fileinput-cancel-button"
                    onClick={this.cancel}
                >
                    <FaIcon code="trash-o" size="fa-lg" />
                    <span className="hidden-xs">Cancel</span>
                </Button>
                <Button
                    className="btn-default fileinput-upload fileinput-upload-button"
                    onClick={this.upload}
                >
                    <FaIcon code="times-circle-o" size="fa-lg" />
                    <span className="hidden-xs">Upload</span>
                </Button>
                <Button
                    className="btn-default fileinput-upload fileinput-upload-button"
                    onClick={this.browse}
                >
                    Browse...

                </Button>
                <input
                    {...inputAttributes}
                />
            </ButtonGroup>
        );
    }

    load() {
        if (this.props.files.length > 0) {
            this.__fileManager.load(this.props.files, this.onLoadSuccess, this.onLoadError);
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
     * @param data
     */
    onLoadSuccess(loadedFiles, isUpload) {
        if (!loadedFiles || loadedFiles.length === 0) {
            return;
        }
        Assertions.isArray(loadedFiles, true);
        this.__currentFiles = this.__currentFiles.concat(loadedFiles);

        if (isUpload) {
            let files = this.state.files;
            for (let i = 0; i < loadedFiles.length; i++) {
                if (files.indexOf(loadedFiles[i].filename) === -1) {
                    files.push(loadedFiles[i].filename);
                }
            }
        }
        this.setState({
            loaded: true,
            files: this.props.files
        });
    }


    browse() {
        if (!this.props.disableClick) {
            this.open();
        }
    }

    open() {
        this.fileInputEl.value = null;
        this.fileInputEl.click();
    }

    upload() {

    }

    /**
     * @param uploadedFiles
     */
    onUploadSucess(uploadedFiles: Array) {
        this.onLoadSuccess(uploadedFiles, true);
    }

    onLoadError() {
        console.log(error);
    }

    onUploadError(error) {
        console.log(error);
    }

    onDragStart(e) {
        console.log("onDragStart");
        console.log(e.target);
        return false;
    }

    onDragEnter(e) {
        console.log("onDragEnter");
        console.log(e.target);
        return false;
    }

    onDragOver(e) {
        console.log("onDragOver");
        console.log(e.target);
        return false;
    }

    onDragLeave(e) {
        console.log("onDragLeave");
        console.log(e.target);
        return false;
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
        this.__fileManager.upload("files", droppedFiles, this.onUploadSucess, this.onUploadError);
        return true;
    }

    cancel() {

    }
    delete() {

    }

    onDeleteSuccess(deletedFiles: Array) {

    }
    onDeleteError() {

    }
}

