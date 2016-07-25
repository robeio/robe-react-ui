import NProgress from "nprogress";
import "nprogress/nprogress.css";
/**
 * A singleton process indicator wrapper component.
 * @see https://github.com/rstacruz/nprogress
 * @class Progress
 */
class Progress {
    /**
     * Creates an instance of Progress.
     */
    constructor() {
        NProgress.configure({ showSpinner: false });
    }

    /**
     * Give a new configuration to the indicator.
     */
    configure = () => {
        NProgress.start();
    };


    /**
     * Starts a progress indicator with an animation.
     */
    start = () => {
        NProgress.start();
    };

    /**
     * Completes the progress indicator.
     */
    done = () => {
        NProgress.done();
    };
}

export default new Progress();
