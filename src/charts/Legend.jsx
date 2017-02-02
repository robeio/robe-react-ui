import React from "react";
import {ShallowComponent, Generator, Class, Arrays, Maps} from "robe-react-commons";
import "./Legend.css"
import ThumbnailGroup from "../layouts/ThumbnailGroup";
import ThumbnailItem from "../layouts/ThumbnailItem";

export default class Legend extends ShallowComponent {

    static propTypes = {
        className: React.PropTypes.string,
        width: React.PropTypes.number,
        data: React.PropTypes.array
    };

    static defaultProps = {
        width: 500,
        data: []
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className={this.props.className}
                style={{width:this.props.width,marginTop:20}}>
                <ThumbnailGroup>
                    {this.__renderLegend()}
                </ThumbnailGroup>
            </div>
        )
    }

    __renderLegend() {
        let legends = this.props.data, arr = [];
        for (let key in legends) {
            if (legends.hasOwnProperty(key)) {
                let lengend = legends[key];

                arr.push(
                    <ThumbnailItem
                        key={key}
                        className="legend-item">
                        <div style={{borderColor:lengend.fill,color:lengend.fill}}>
                            {lengend.label}
                        </div>
                    </ThumbnailItem>)
            }
        }
        return arr;
    }

}