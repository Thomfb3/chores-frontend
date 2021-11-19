export  const determineMessage = (status) => {
    if (status === "need-to-do") return "Nothing to do right now.";
    if (status === "pending") return "Nothing in review.";
    if (status === "approved") return "You have no recently approved chores.";
 }

export const determineListHeader = (status) => {
    if (status === "need-to-do") {
      return (
        <div className="ChoreList__title">
          <h3 className="ChoreList__list-title ChoreList__list-title--need-to-do">Need to do</h3>
          <div className="ChoreList__divider ChoreList__divider--need-to-do"></div>
        </div>)
    }
    if (status === "pending") {
      return (
        <div className="ChoreList__title">
          <h3 className="ChoreList__list-title ChoreList__list-title--pending">Pending Review</h3>
          <div className="ChoreList__divider ChoreList__divider--pending"></div>
        </div>)
    }
    if (status === "approved") {
      return (
        <div className="ChoreList__title">
          <h3 className="ChoreList__list-title ChoreList__list-title--approved">Approved Recently</h3>
          <div className="ChoreList__divider ChoreList__divider--approved"></div>
        </div>)
    }
  }

