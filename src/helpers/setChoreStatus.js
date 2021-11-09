    // Open: "Submit For Review",
    // Assigned: "Submit For Review",
    // Pending: "Pending Manager's Review",
    // Approved: "Chore Completed",
    // Rejected: "Resubmit for Review"

const setChoreStatusButton = (currentStatus) => {
    if (currentStatus === "open" || currentStatus === "assigned") return "Submit For Review";
    if (currentStatus === "pending") return "Pending Manager's Review";
    if (currentStatus === "rejected") return "Resubmit for Review";
    if (currentStatus === "approved") return "Chore Completed.";
    return "Unknown Status";
};


export default setChoreStatusButton;

