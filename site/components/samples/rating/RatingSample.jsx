import React from "react";
import Rating from "robe-react-ui/lib/rating/Rating";
import {ControlLabel} from "react-bootstrap";
import {Application, ShallowComponent} from "robe-react-commons";

export default class RatingSample extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
        };
    }

    render():Object {
        return (
            <span>
                <div style={{marginBottom: 10}}>
                    <ControlLabel>{Application.i18n(RatingSample, "rating.RatingSample", "ratingOne")}</ControlLabel><br/>
                    <Rating currentValue={8}
                            onChange={this.__handleChange} 
                            onMouseOver={this.__handleMouseOver}
                    />
                 </div>
                <div style={{marginBottom: 10}}>
                    <ControlLabel>{Application.i18n(RatingSample, "rating.RatingSample", "ratingTwo")}</ControlLabel><br/>
                    <Rating size={2} 
                            currentValue={4.5}
                            onChange={this.__handleChange}
                            disabled
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <ControlLabel>{Application.i18n(RatingSample, "rating.RatingSample", "ratingThree")}</ControlLabel><br/>
                    <Rating size={1}
                            iconCount={5}
                            initialIcon="fa-heart-o" 
                            selectedIcon="fa-heart"
                            style={{color: "red"}}
                            onChange={this.__handleChange}
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <ControlLabel>{Application.i18n(RatingSample, "rating.RatingSample", "ratingFour")}</ControlLabel><br/>
                    <Rating/>
                </div>
            </span>
        );
    }

    __handleMouseOver(hoveredKey) {
        console.log(hoveredKey);
    }

    __handleChange(clickedKey) {
        console.log(clickedKey);
    };
}
