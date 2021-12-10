import { formatDate, formatShortDate, formatDay } from "./formatDate";

describe("formatDate helpers", function () {

    test("formatDay", function () {
        let testDate = "2021-12-09T02:24:00.000+00:00";
        expect(formatDay(testDate)).toEqual("Wednesday");
    })

    test("formatShortDate", function () {
        let testDate = "2021-12-09T02:24:00.000+00:00";
        expect(formatShortDate(testDate)).toEqual("12/8/2021");
    })

    test("formatDate", function () {
        let testDate = "2021-12-09T02:24:00.000+00:00";
        expect(formatDate(testDate)).toEqual("Wednesday, December 8, 2021 - 9:24 PM");
    })

});



