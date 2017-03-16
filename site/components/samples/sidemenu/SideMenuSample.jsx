import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import MenuData from "./MenuData.json";


export default class SideMenuSample extends ShallowComponent {


    constructor(props: Object) {
        super(props);
        this.state = {
            selectedItem: {
                "text": "Users",
                "path": "app/modules/User"
            }
        };
    }

    render(): Object {
        return (
            <div>
                <SideMenu
                    items={MenuData}
                    onChange={this.handleChange}
                    selectedItem={this.state.selectedItem.path}
                />

                <SideMenu
                    items={MenuData}
                    selectedItem={"app/modules/User"}
                />
            </div>
        );
    }

    handleChange = (item: Object) => {
        this.setState({
            selectedItem: item
        });

        return false;
    };

    shouldComponentUpdate(): boolean {
        return true;
    }
}
