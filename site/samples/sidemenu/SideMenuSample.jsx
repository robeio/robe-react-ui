import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Arrays from "robe-react-commons/lib/utils/Arrays";
import SideMenu from "sidemenu/SideMenu";
import MenuData from "./MenuData.json";


export default class SideMenuSample extends ShallowComponent {


    constructor(props: Object) {
        super(props);
        this.state = {
            value: []
        };
    }

    render(): Object {
        return (
            <div className="SideMenu-wrapper">
                <SideMenu
                    items={MenuData}
                    value={this.state.value}
                    onChange={this.handleChange}
                    ref="checkinput"
                    selectedItem="app/modules/Parameters"
                />
            </div>
        );
    }

    handleChange = (e) => {
        let value = this.state.value;
        let index = Arrays.indexOf(value, e.target.value);
        if (index === -1) {
            value.push(e.target.value[0]);
        } else {
            Arrays.remove(value, e.target.value);
        }
        this.setState({
            value: value
        });
    };

    shouldComponentUpdate(): boolean {
        return true;
    }
}
