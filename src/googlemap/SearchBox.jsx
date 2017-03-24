import React, { PropTypes } from "react";
import {
    ShallowComponent,
    Application
} from "robe-react-commons";
import TextInput from "../inputs/TextInput";

export default class SearchBox extends ShallowComponent {

    static propTypes = {
        placeholder: React.PropTypes.string,
        apiParams: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        placeholder: Application.i18n(SearchBox, "googlemap.SearchBox", "placeholder")
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            searchedValue: ""
        };
    }

    render(): Object {
        return (<span>
            <TextInput
                id="searchBoxInput"
                name="searchedValue"
                type="text"
                placeholder={this.props.placeholder}
                value={this.state.searchedValue}
                onChange={this.__handleChange} />
        </span>);
    }

    onPlacesChanged(): Object {
        if (this.props.onPlacesChanged)
            this.props.onPlacesChanged(this.searchBox.getPlaces());
    };

    __handleChange(e: Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);

        if (this.props.onChange)
            this.props.onChange(state);
    };

    componentDidMount() {
        if (this.props.apiParams) {
            var input = document.getElementById("searchBoxInput");
            this.searchBox = new this.props.apiParams.maps.places.SearchBox(input);
            this.searchBox.addListener("places_changed", this.onPlacesChanged);
        }
        else
            console.warn("Please be sure that apiParams prop is a not undefined")
    }

    componentWillUnmount() {
        this.props.apiParams.maps.event.clearInstanceListeners(this.searchBox);
    }
}
