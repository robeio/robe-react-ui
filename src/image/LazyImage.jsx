import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { ShallowComponent } from "robe-react-commons";
import BImage from "react-bootstrap/lib/Image";
import "./LazyImage.css";
/**
 * LazyImage is a component for loading images via ajax with a loading animation.
 *
 * @export
 * @class LazyImage
 * @extends {ShallowComponent}
 */
export default class LazyImage extends ShallowComponent {

    static propTypes = {
        /**
         *Source of the image
         */
        src: PropTypes.string.isRequired,
        /**
         *Height of the image
         */
        height: PropTypes.string.isRequired,
        /**
         * Width of the image
         */
        width: PropTypes.string.isRequired,

        /**
         * Applies custom style to the image.
         */
        style: PropTypes.object,

        /**
         *Sets image shape as circle
        */
        circle: PropTypes.bool,

        /** Sets image as responsive image */
        responsive: PropTypes.bool,

        /** Sets image shape as rounded */
        rounded: PropTypes.bool,

        /** Sets image shape as thumbnail */
        thumbnail: PropTypes.bool,

    };

    /**
     *
     *
     * @static
     *
     * @memberOf LazyImage
     */
    static defaultProps = {
        style: {},
        circle: false,
        responsive: false,
        rounded: false,
        thumbnail: false
    };

    /**
     * Actual image <img>
     * @memberOf LazyImage
     */
    innerComponent;

    /**
     * Creates an instance of LazyImage.
     * @param {any} props
     * @memberOf LazyImage
     */
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    /**
     * Renders the component
     * @returns {Object}
     * @memberOf LazyImage
     */
    render(): Object {
        let className = "lazyimage-placeholder";
        if (!this.state.loaded) {
            className += "-loading"
        }
        return (
            <div>
                <BImage {...this.props} className={className} src={this.state.src} ref={this.__setInnerComponent} />
            </div>
        );

    }

    __setInnerComponent(component: Object) {
        this.innerComponent = component;
    }

    componentDidMount() {
        this.downloadingImage = new Image();
        this.downloadingImage.onload = (e) => {
            this.setState({ loaded: true, src: this.props.src });
        };
        this.downloadingImage.src = this.props.src;
    }
}
