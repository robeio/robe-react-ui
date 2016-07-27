import React from "react";
import { ShallowComponent, Arrays } from "robe-react-commons";
import DropZoneComponent from "react-dropzone-component/lib/react-dropzone";
import "./filepicker.css";
import "./dropzone.min.css";

// https://github.com/felixrieseberg/React-Dropzone-Component
export default class DropZoneUpload extends ShallowComponent {

    static propTypes = {
        rootPath: React.PropTypes.string,
        /**
         * Will Uploaded files to URL
         */
        postUrl: React.PropTypes.string,
        /**
         * Will uploaded files
         */
        files: React.PropTypes.array,
        /**
         * file types that can be selected
         */
        iconFiletypes: React.PropTypes.array,
        /**
         *
         */
        showFiletypeIcon: React.PropTypes.bool,
        /**
         *
         */
        addRemoveLinks: true,
        preview: React.PropTypes.func
    }

    static defaultProps = {
        extensions: [".jpg", ".png", ".pdf", ".xls", ".doc"],
        showFiletypeIcon: false,
        addRemoveLinks: true,
        files: []
    }

    addedFiles = [];
    deletedFiles = [];

    render(): Object {
        return (
            <DropZoneComponent
                config={this.createComponentConfig()}
                djsConfig={this.createDsjConfig()}
                eventHandlers={{
                    init: this.__init,
                    success: this.__onAdd,
                    removedfile: this.__onRemove
                }}
            />);
    }

    __init = (dropZone) => {
        this.__initFiles(dropZone);
    }
    __initFiles(dropZone) {
        const files = this.props.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            this.__initFile(dropZone, file);
        }
    }

    __initFile(dropZone: Object, file: Map) {
        this.addedFiles.push(file);
        let asset = this.__fileToAsset(file);
        dropZone.options.addedfile.call(dropZone, asset);

        dropZone.options.thumbnail.call(dropZone, asset, file.path);

        let previewFound = null;
        if (this.props.preview) {
            previewFound = this.props.preview(asset);
        }
        if (!previewFound) {
            previewFound = this.__findPreview(asset);
        }

        if (previewFound) {
            dropZone.options.thumbnail.call(dropZone, asset, previewFound);
        }

        asset.previewElement.classList.add("dz-success");
        asset.previewElement.classList.add("dz-complete");
    }

    __findPreview(asset) {
        if (asset.type.startsWith("image/")) {
            return `${this.props.rootPath}assets/preview/${asset.oid}`;
        } else if (asset.type.endsWith("pdf")) {
            return `${this.props.rootPath}images/120x120_pdf.png`;
        } else if (asset.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || asset.endsWith("/msword")) {
            return `${this.props.rootPath}images/120x120_word.png`;
        }
        return null;
    }

    __onAdd = (file, response) => {
        let asset = {};
        asset.type = file.type;
        asset.size = file.size;
        asset.name = file.name;
        asset.oid = null;
        asset.filePath = response.filePath;
        this.addedFiles.push(asset);

        let e = {};
        e.target = {};
        e.target.event = "add";
        this.__onChange(e);
    };
    __onRemove = (file) => {
        let findIndex = Arrays.indexOfByKey(this.addedFiles, "name", file.name);

        let item = this.addedFiles[findIndex];

        this.deletedFiles.push(item);

        this.addedFiles.splice(findIndex, 1);

        let e = {};
        e.target = {};
        e.target.event = "remove";
        /**
         * TODO DELETE FROM SERVER
         */

        this.__onChange(e);
    };

    __onChange = (e) => {
        if (this.props.onChange) {
            e.target.parsedValue = this.__createValidData(this.addedFiles);
            e.target.deletedAssets = this.__createValidData(this.deletedFiles);
            this.props.onChange(e);
        }
    }

    __createValidData = (arr) => {
        let response = [];
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            response.push(this.__fileToAsset(item));
        }

        return response;
    };

    __fileToAsset = (item: Map) => {
        let asset = {};
        asset.type = item.type;
        asset.oid = item.oid;
        asset.size = item.size;
        asset.name = item.name;
        asset.filePath = item.filePath;
        return asset;
    };

    createComponentConfig() {
        let componentConfig = {
            iconFiletypes: this.props.iconFiletypes,
            showFiletypeIcon: this.props.showFiletypeIcon,
            postUrl: this.props.postUrl
        };
        return componentConfig;
    }
    createDsjConfig() {
        let djsConfig = {
            addRemoveLinks: true,
            parallelUploads: true,
            maxFilesize: 4,
            maxFiles: 5,
            dictRemoveFile: "Kaldır",
            dictCancelUpload: "İptal",
            dictDefaultMessage: "Yükleme yapmak için tıklayınız ya da dosyayı alana sürükleyiniz.",
            dictFallbackMessage: "Yükleme yapmak için tıklayınız.",
            dictMaxFilesExceeded: "Toplam yüklenebilecek dosya sayısı 5 adettir.",
            dictFileTooBig: " Dosya boyutu 4MB'dan büyük olmamalıdır.",
            dictInvalidFileType: "Geçerli bir dosya tipi değildir."

        };
        return djsConfig;
    }
}