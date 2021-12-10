import { determineMessage, determineListHeader } from "./choreHelpers";


describe("choreHelpers ", function () {

    test("determineMessage", function () {
        expect(determineMessage("need-to-do")).toEqual("Nothing to do right now.");
        expect(determineMessage("pending")).toEqual("Nothing in review.");
        expect(determineMessage("approved")).toEqual("You have no recently approved chores.");
    })

    test("determineListHeader", function () {

        let needToDoMarkup = <div className="ChoreList__title">
            <h3 className="ChoreList__list-title ChoreList__list-title--need-to-do">Need to do</h3>
            <div className="ChoreList__divider ChoreList__divider--need-to-do"></div>
        </div>;

        let pendingMarkup = <div className="ChoreList__title">
            <h3 className="ChoreList__list-title ChoreList__list-title--pending">Pending Review</h3>
            <div className="ChoreList__divider ChoreList__divider--pending"></div>
        </div>;

        let approvedMarkup = <div className="ChoreList__title">
            <h3 className="ChoreList__list-title ChoreList__list-title--approved">Approved Recently</h3>
            <div className="ChoreList__divider ChoreList__divider--approved"></div>
        </div>;


        expect(determineListHeader("need-to-do")).toEqual(needToDoMarkup);
        expect(determineListHeader("pending")).toEqual(pendingMarkup);
        expect(determineListHeader("approved")).toEqual(approvedMarkup);
    })

});