import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import GoogleMap from "robe-react-ui/lib/googlemap/GoogleMap";
import BounceMarker from "robe-react-ui/lib/googlemap/BounceMarker";

export default class GoogleMapSample extends ShallowComponent {


    static defaultProps = {
        apiKey: "AIzaSyAY1o0OVVUKBFoVX84PQW5FuAkolw6kNeU",
        zoom: 11
    };

    constructor(props:Object) {
        super(props);
        this.state = {
            center: {lat: 41.017224, lng: 28.949146},
            selectedCenter: {lat: 41.017224, lng: 28.949146},
            zoom: 11
        };
    }

    render():Object {
        return (
            <span>
                <div style={{height:500}}>
                    <GoogleMap
                        bootstrapURLKeys={{
                            key: this.props.apiKey,
                            libraries:'places'}}
                        defaultZoom={this.props.zoom}
                        center={this.state.center}
                        searchBox={{
                            apiParams: this.state.apiParams,
                            onPlacesChanged: this.__onSearchBoxPlaceChange}}
                        options={this.__createMapOptions()}
                        zoom={this.state.zoom}
                        onClick={this.__onMapClick}
                        onGoogleApiLoaded={this.__onApiLoaded}
                        yesIWantToUseGoogleMapApiInternals
                        onChildClick={this.__onMarkerClick}
                    >
                        {this.__renderMarkers()}
                    </GoogleMap>
                </div>
                <div>
                    <a rel="noopener noreferrer" target="_blank" href="https://github.com/istarkov/google-map-react">Read More About GoogleMap ( React.js wrapper )</a><br />
                    <a rel="noopener noreferrer" target="_blank"
                       href="https://developers.google.com/maps/documentation/javascript/tutorial">Read More About GoogleMaps API</a>
                </div>
            </span>
        );
    }

    __onApiLoaded(callback:Object) {
        this.setState({apiParams: callback});
    };

    __createMapOptions():Object {
        return {
            panControl: true,
            mapTypeControl: true,
            scrollwheel: true,
            streetViewControl: true,
            rotateControl: true,
            scaleControl: true
        };
    };

    __onMapClick(callback:Object) {
        this.setState({
            selectedCenter: {
                lat: callback.lat,
                lng: callback.lng
            }
        });
        this.__renderMarkers();
    };

    __renderMarkers():Array {
        let markersArr = [];

        markersArr.push(<BounceMarker key="1"
                                      lat={this.state.selectedCenter.lat}
                                      lng={this.state.selectedCenter.lng}
                                      description={"Sample Text"}/>);

        markersArr.push(<BounceMarker key="2"
                                      lat={41.02654882484799}
                                      lng={28.86640521630852}
                                      description={"Sample Text With TextArea Input"}
                                      inputType="textArea"
                                      inputStyle={{border: 0}}
                                      onChange={this.__popoverInputChange}
                                      overlay
                                      overlayPlacement="left"
        />);

        return markersArr;
    };

    __popoverInputChange(e){
        console.log(e);
    }

    __onMarkerClick(index:any, callback:Object) {
        console.log(index, callback);
    };

    __onSearchBoxPlaceChange(places:Object) {
        this.setState({
            center: {
                lat: places[0].geometry.location.lat(),
                lng: places[0].geometry.location.lng()
            },
            selectedCenter: {
                lat: places[0].geometry.location.lat(),
                lng: places[0].geometry.location.lng()
            },
            zoom: 13
        });
    };


}
