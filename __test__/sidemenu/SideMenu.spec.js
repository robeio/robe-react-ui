import TestUtils from "../TestUtils";
import SideMenu from "sidemenu/SideMenu"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("sidemenu/SideMenu", () => {
    const props = {
        items: [
            {
                text: "Manager",
                path: "Manager",
                module: "Manager",
                icon: "fa-cogs",
                items: [
                    {
                        text: "Dashboard",
                        path: "app/modules/Dashboard",
                        module: "Dashboard",
                        icon: "fa-tachometer"
                    },
                    {
                        text: "Mail Templates",
                        path: "app/modules/MailTemplate",
                        module: "MailTemplate",
                        icon: "fa-envelope"
                    }
                ],
            },
            {
                text: "Guest",
                path: "Guest",
                index: 1,
                module: "Guest",
                icon: "fa-cogs"
            }
        ],
        onChange: () => {
        }
    };
    const menu = TestUtils.mount(props, SideMenu, props);

    it("render", () => {
        //todo
    });
});
