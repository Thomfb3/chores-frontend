import setChoreStatus from "./setChoreStatus";

describe("setChoreStatus helpers", function () {

    test("setChoreStatus", function () {
        expect(setChoreStatus("open")).toEqual("Submit For Review");
        expect(setChoreStatus("created")).toEqual("Submit For Review");
        expect(setChoreStatus("pending")).toEqual("Pending Manager's Review");
        expect(setChoreStatus("rejected")).toEqual("Resubmit for Review");
        expect(setChoreStatus("approved")).toEqual("Chore Completed.");
        expect(setChoreStatus("something else")).toEqual("Unknown Status");
    })

});
