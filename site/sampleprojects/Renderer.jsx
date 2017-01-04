import React from "react";
import { Col, Thumbnail, Label } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";


export default class Renderer extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {

        header: React.PropTypes.string,

        desc: React.PropTypes.string,

        image: React.PropTypes.string,

        link: React.PropTypes.string,

        features: React.PropTypes.array
    };

    render(): Object {
        let image = require(`./${this.props.image}`);
        return (
            <Col xs={12} sm={6} md={4}>
                <Thumbnail src={`./${image}`}>
                    <a href={this.props.link} target="_blank">
                        <h3>{this.props.header} <FaIcon code="fa-external-link" /></h3>
                    </a>
                    <p>{this.props.desc}</p>
                    {this.renderFeatures()}

                </Thumbnail>
            </Col >);
    }

    renderFeatures(): Object {
        let labels = [];
        for (let i = 0; i < this.props.features.length; i++) {
            labels.push(<span><Label key={i}>{this.props.features[i]}</Label> &nbsp;</span>);
        }
        return labels;
    }

}
