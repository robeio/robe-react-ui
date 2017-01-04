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
        this.configure({ showSpinner: false });
    }

    /**
     * Give a new configuration to the indicator.
     */
    configure(configuration: Map) {
        NProgress.configure(configuration);
    }


    /**
     * Starts a progress indicator with an animation.
     */
    start() {
        NProgress.start();
    }

    /**
     * Completes the progress indicator.
     */
    done() {
        NProgress.done();
    }

    /**
     * current instance of NProgress
     * @returns NProgress
     */

    instance(): NProgress {
        return NProgress;
    }
}

export default new Progress();
