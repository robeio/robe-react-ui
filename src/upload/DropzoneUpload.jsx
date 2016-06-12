import React from "react";
import { ShallowComponent, Arrays } from "robe-react-commons";
import DropzoneComponent from "react-dropzone-component/lib/react-dropzone";
import "upload/filepicker.css";
import "upload/dropzone.min.css";

// https://github.com/felixrieseberg/React-Dropzone-Component

export default class DropzoneUpload extends ShallowComponent {

    static propTypes = {
        iconFiletypes: React.PropTypes.array,
        showFiletypeIcon: React.PropTypes.bool,
        postUrl: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        fileSize: React.PropTypes.number,
        addRemoveLinks: React.PropTypes.bool,
        files: React.PropTypes.array
    };

    static defaultProps = {
        iconFiletypes: [".jpg", ".png", ".pdf", ".xls", ".doc"],
        showFiletypeIcon: false,
        addRemoveLinks: true,
        files: []
    };

    addedFiles = [];
    deletedFiles = [];

    render() {
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
        let eventHandlers = {
            init: this.__init,
            success: this.__onAdd,
            removedfile: this.__onRemove
        };
        let componentConfig = {
            iconFiletypes: this.props.iconFiletypes,
            showFiletypeIcon: this.props.showFiletypeIcon,
            postUrl: this.props.postUrl
        };

        return (
            <DropzoneComponent
                config={componentConfig}
                djsConfig={djsConfig}
                eventHandlers={eventHandlers}
            />);
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
            e.target.deleted = this.__createValidData(this.deletedFiles);

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

    __fileToAsset = (item) => {
        let asset = {};
        asset.type = item.type;
        asset.oid = item.oid;
        asset.size = item.size;
        asset.name = item.name;
        asset.filePath = item.filePath;

        return asset;
    };
    __init = (dropzone) => {
        const files = this.props.files;
        for (let i = 0; i < files.length; i++) {
            let asset = files[i];

            this.addedFiles.push(asset);
            let item = this.__fileToAsset(asset);
            dropzone.options.addedfile.call(dropzone, item);

            /**
             * TODO handle all types
             */

            if (item.type.startsWith("image/")) {
                dropzone.options.thumbnail.call(dropzone, item, `${window.backendRootPath}assets/preview/${item.oid}`);
            } else if (item.type.endsWith("pdf")) {
                dropzone.options.thumbnail.call(dropzone, item, `${window.applicationRootPath}images/120x120_pdf.png`);
            } else if (item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || item.endsWith("/msword")) {
                dropzone.options.thumbnail.call(dropzone, item, `${window.applicationRootPath}images/120x120_word.png`);
            }

            // dropzone.options.thumbnail.call(dropzone, asset, "https://pixabay.com/static/uploads/photo/2015/10/01/21/39/background-image-967820_960_720.jpg");
            item.previewElement.classList.add("dz-success");
            item.previewElement.classList.add("dz-complete");
        }
    }

}

