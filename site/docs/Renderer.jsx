import React from "react";
import { Button, Panel, Table } from "react-bootstrap";
import { Maps } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Highlight from "react-highlight";
import Progress from "progress/Progress";


export default class Renderer extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Component name
         */
        header: React.PropTypes.string,
        /**
         * Component description
         */
        desc: React.PropTypes.string,
        /**
         *
         */
        alternatives: React.PropTypes.object,
        /**
         * Component Props Json
         */
        json: React.PropTypes.object,
        /**
         * Component Sample Code Object
         */
        sample: React.PropTypes.object,
        /**
         * Component Sample Code string
         */
        code: React.PropTypes.string
    };

    static defaultProps = {
        json: {}
    };
    /* eslint no-useless-constructor: 0*/
    constructor(props: Object) {
        super(props);
        this.state = {
            showCode: false
        };
    }

    render(): Object {
        return (
            <div>
                <h3>{this.props.header}</h3>
                <h5>{this.props.desc}</h5>
                <Panel>
                    <this.props.sample.default />
                </Panel>
            </div >);
    }

    componentDidUpdate() {
        Progress.done();
    }
}
