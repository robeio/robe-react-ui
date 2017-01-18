import React, { PropTypes } from "react";
import { ShallowComponent, Application } from "robe-react-commons";
import Googlemap from "google-map-react";
import SearchBox from "./SearchBox";
import Col from "react-bootstrap/lib/Col";
import "./GoogleMap.css";

export default class GoogleMap extends ShallowComponent {

    static propTypes: Map = {
        ...Googlemap.PropTypes,
        searchBox: React.PropTypes.object
    };

    static defaultProps = {
        ...Googlemap.defaultProps,
        language: Application.i18n(GoogleMap, "googlemap.GoogleMap", "language")
    };

    render(): Object {
        let newProps = { ...this.props };
        if (!newProps.bootstrapURLKeys.language) {
            newProps.bootstrapURLKeys.language = this.props.language;
        }
        return (<span>
            {this.__renderSearchBox()}
            <Googlemap {...newProps} />
        </span>);
    }

    __renderSearchBox(): Object {
        if (this.props.searchBox && this.props.searchBox.apiParams && this.props.bootstrapURLKeys.libraries) {
            return (<Col id="searchBoxContainer"
                className="searchbox-container">
                <SearchBox
                    apiParams={this.props.searchBox.apiParams}
                    onPlacesChanged={this.__onSearchBoxPlaceChange}
                    placeholder={this.props.searchBox.placeholder}
                    onChange={this.__onInputChange}
                    />
            </Col>);
        }
        else if (this.props.searchBox && !this.props.bootstrapURLKeys.libraries) {
            console.warn("please add 'libraries=places' parameter in bootstrapURLKeys to use SearchBox");
            return;
        }
        else
            return;
    };

    __onSearchBoxPlaceChange(places: Object) {
        if (this.props.searchBox.onPlacesChanged)
            this.props.searchBox.onPlacesChanged(places);
    };

    __onInputChange(state: Object) {
        if (this.props.searchBox.onInputChange)
            this.props.searchBox.onInputChange(state);
    };

}
