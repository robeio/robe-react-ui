import NProgress from "nprogress";
import "nprogress/nprogress.css";

// read more fore configuration https://github.com/rstacruz/nprogress
class Progress {
    constructor() {
        NProgress.configure({ showSpinner: false });
    }

    start = () => {
        NProgress.start();
    };

    done = () => {
        NProgress.done();
    };
}

export default new Progress();
