import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import TestUtils from "../TestUtils";
import DatePicker from "inputs/datepicker/DatePicker";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("inputs/datepicker/DatePicker", () => {
    const assert = chai.assert;
    
    it("render", () => {
        let node = TestUtils.mount({}, DatePicker);
        let thNodes = node.find("th");
        assert.equal(thNodes.length, 9, "Headers must be 9. SelectInputs and days.");
        let daysEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (let i = 2; i < thNodes.length; i++) {
            assert.equal(thNodes.get(i).innerText, daysEn[i - 2], "Wrong day name");
        }
        node = TestUtils.mount({ locale: "tr" }, DatePicker);
        let value = new Date();
        thNodes = node.find("th");
        let daysTr = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
        for (let i = 2; i < thNodes.length; i++) {
            assert.equal(thNodes.get(i).innerText, daysTr[i - 2], "Wrong day name");
        }
        assert.equal(node.find(".DatePicker-day-selected").text(), value.getDate(), "Selected day must be same with the value provided.");
        let yearAndMonth = node.find("select");
        assert.equal(yearAndMonth.get(0).value, value.getFullYear(), "Selected year must be same with the value provided.");
        assert.equal(yearAndMonth.get(1).value, value.getMonth(), "Selected month must be same with the value provided.");
    });
    it("onChange - year", (done) => {

        let node = TestUtils.mount({
            onChange: (e) => {
                let value = new Date(e.target.parsedValue);
                assert.equal(value.getFullYear(), 2018, "Selected year must be same with the value provided.");
                done();
            }
        }, DatePicker);
        let value = new Date();
        let yearAndMonth = node.find("select");
        yearAndMonth.at(0).simulate("change", { target: { selectedOptions: [{ value: "2018" }] } });
    });

    it("onChange - month", (done) => {
        let node = TestUtils.mount({
            onChange: (e) => {
                let value = new Date(e.target.parsedValue);
                assert.equal(value.getMonth(), 2, "Selected month must be same with the value provided.");
                done();
            }
        }, DatePicker);
        let value = new Date();
        let yearAndMonth = node.find("select");
        yearAndMonth.at(1).simulate("change", { target: { selectedOptions: [{ value: "2" }] } });
    });
    
    it("onChange - day", (done) => {
        let today = new Date();
        let node = TestUtils.mount({
            onChange: (e) => {
                let value = new Date(e.target.parsedValue);
                assert.equal(value.getDate(), today.getDate(), "Selected day must be same with the value provided.");
                done();
            }
        }, DatePicker);
        let selected = node.find(".DatePicker-day-selected");
        selected.simulate("click", { target: { innerText: selected.text() } });
    });
});
