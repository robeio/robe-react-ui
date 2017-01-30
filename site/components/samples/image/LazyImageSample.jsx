import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import LazyImage from "robe-react-ui/lib/image/LazyImage";
import { Grid, Row, Col } from "react-bootstrap";

export default class FaIconSample extends ShallowComponent {


    render(): Object {
        return (
            <div>
                <Row>
                    <Col xs={12} md={3}>
                        <LazyImage src="http://placehold.it/150x150?text=normal" width="150px" height="150px" />
                    </Col>
                    <Col xs={12} md={3}>
                        <LazyImage src="http://placehold.it/150x150?text=rounded" width="150px" height="150px" rounded />
                    </Col>
                    <Col xs={12} md={3}>
                        <LazyImage src="http://placehold.it/150x150?text=circle" width="150px" height="150px" circle />
                    </Col>
                    <Col xs={12} md={3}>
                        <LazyImage src="http://placehold.it/150x150?text=thumbnail" width="150px" height="150px" thumbnail />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={12}>
                        <LazyImage src="http://placehold.it/3000x150?text=responsive" responsive />
                    </Col>
                </Row>
            </div>
        );
    }
}
