import React from "react";
import { render } from "@testing-library/react";
import ChoreCard from "./ChoreCard";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";


it("matches snapshot", function () {
  
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <ChoreCard
                    id="userid1"
                    key="userid1"
                    title="Clean Bathroom"
                    description="clean the bathroom"
                    points={200}
                    status="approved"
                    assigneeImage="defaultPic.jpeg"
                    choreImage="defaultChore.jpg"
                    assignerID="userid1"
                    assignee="userid1"
                    createdAt="2021-11-05T03:47:24.581+00:00"
                    createdBy="61837e4a9b875f020816b656"
                    currentUser={true}
                    dueDate="2021-11-05T02:24:00.000+00:00"
                    cardType="MyChoreList"
                />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
