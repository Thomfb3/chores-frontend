import capitalizeFirstLetter from "./capitalizeFirstLetter";

describe("capitalizeFirstLetter helpers", function () {

    test("capitalizeFirstLetter", function () {
        expect(capitalizeFirstLetter("approved")).toEqual("Approved");
        expect(capitalizeFirstLetter("unknown")).toEqual("Unknown");
        expect(capitalizeFirstLetter("pending")).toEqual("Pending");
    })

});



