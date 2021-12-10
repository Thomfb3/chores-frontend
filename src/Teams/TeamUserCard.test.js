import React from "react";
import { render } from "@testing-library/react";
import TeamUserCard from "./TeamUserCard";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";


it("matches snapshot", function () {

    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <TeamUserCard
                    id="rewardid1"
                    key="rewardid1"
                    isCurrentUser={true}
                    position={1}
                    profileImage="defaultPic.jpeg"
                    username="userid1"
                    firstName="tester"
                    isAdmin={true}
                    currentPoints={500}
                    allTimePoints={1500}
                />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
