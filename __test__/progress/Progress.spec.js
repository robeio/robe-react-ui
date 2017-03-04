import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react"; // eslint-disable-line import/no-extraneous-dependencies, no-unused-vars
import Progress from "progress/Progress"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("progress/Progress", () => {
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
