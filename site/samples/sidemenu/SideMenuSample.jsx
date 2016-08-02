import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
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
            <div>
                <div className="SideMenu-wrapper">
                    <SideMenu
                        items={MenuData}
                        value={this.state.value}
                        onChange={this.handleChange}
                        ref="checkinput"
                        selectedItem="app/modules/Parameters"
                    />
                </div>
                <span>Selected Item: {this.state.selectedItem}</span>
            </div>
        );
    }

    handleChange = (item: Object) => {
        this.setState({
            selectedItem: item.text
        });
    };

    shouldComponentUpdate(): boolean {
        return true;
    }
}
