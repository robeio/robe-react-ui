export default (path: string): Promise => {
    return new Promise((resolve, reject) => {
        System.import("./assets/" + path).then(resolve).catch(reject);
    });
};

