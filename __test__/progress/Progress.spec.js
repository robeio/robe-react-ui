import chai from "chai";
import React from "react";
import Progress from "progress/Progress";

describe("inputs/Progress", () => {
    it("Progress", () => {
        chai.assert.equal(Progress.instance().isStarted(), false);
        Progress.start();
        chai.assert.equal(Progress.instance().isStarted(), true);
        chai.assert.equal(Progress.instance().settings.showSpinner, false);

        Progress.configure({ showSpinner: true });
        chai.assert.equal(Progress.instance().settings.showSpinner, true);

        Progress.done();
        chai.assert.equal(Progress.instance().isStarted(), false);
    });
});