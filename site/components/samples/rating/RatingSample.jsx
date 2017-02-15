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
                    <Rating currentValue={8}
                            onChange={this.__handleChange} 
                            onMouseOver={this.__handleMouseOver}
                            label="With Custom Size And Current Value"
                    />
                 </div>
                <div style={{marginBottom: 10}}>
                    <Rating size={2} 
                            currentValue={6}
                            onChange={this.__handleChange}
                            disabled
                            label="With Different Size And Disabled"
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <Rating size={1}
                            iconCount={5} 
                            initialIcon="fa-heart-o" 
                            selectedIcon="fa-heart"
                            onChange={this.__handleChange}
                            label="With Different Icons"
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <Rating label="Custom"/>
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
