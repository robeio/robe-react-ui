import React from "react";
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
        src: React.PropTypes.string.isRequired,
        /**
         *Height of the image
         */
        height: React.PropTypes.string.isRequired,
        /**
         * Width of the image
         */
        width: React.PropTypes.string.isRequired,
        /**
         * applies custom style to the image.
         */
        style: React.PropTypes.object,
    };

    /**
     * 
     * 
     * @static
     * 
     * @memberOf LazyImage
     */
    static defaultProps = {
        style: {}
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
        let style = this.props.style;
        let className = "lazyimage-placeholder";
        if (!this.state.loaded) {
            className += "-loading"
        }
        return (
            <div>
                <BImage className={className} src={this.state.src} ref={this.__setInnerComponent}
                    height={this.props.height}
                    width={this.props.width}
                    style={this.style}
                    aria-hidden="true"
                    />
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
