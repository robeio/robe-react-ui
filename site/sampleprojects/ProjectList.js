class ProjectList {
    getList(): Array {
        let components = [];

        components.push({
            header: "robe-react-admin",
            desc: "A skeleton application. Login, Menu, CRUDs...",
            image: "robe-admin-ui.png",
            link: "https://github.com/robeio/robe-react-admin",
            features: ["Router", "DataGrid", "Charts"]
        });

        components.push({
            header: "robe-chat-ui",
            desc: "Here is a working simple chat application.",
            image: "robe-chat-ui.png",
            link: "https://github.com/robeio/robe-examples/tree/master/robe-chat-ui",
            features: ["WebSocket", "Router"]
        });

        return components;
    }

}

export default new ProjectList().getList();
