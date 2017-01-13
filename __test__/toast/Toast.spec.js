import chai from "chai";
import React from "react";
import Toast from "toast/Toast"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("toast/Toast", () => {
    it("Toast", () => {
        chai.assert.equal(Toast.getPosition(), 'top-right');
        Toast.configuration({position: 'top-left'});
        chai.assert.equal(Toast.getPosition(), 'top-left');

        chai.assert.equal(Toast.getNumMaxVisible(), 5);
        Toast.configuration({numMaxVisible: 10});
        chai.assert.equal(Toast.getNumMaxVisible(), 10);
    });
});