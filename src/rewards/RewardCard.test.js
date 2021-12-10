import React from "react";
import { render } from "@testing-library/react";
import RewardCard from "./RewardCard";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";


it("matches snapshot", function () {
  
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <RewardCard
                    id="rewardid1"
                    key="rewardid1"
                    title="Fried Chicken"
                    description="bucket of fried chicken"
                    points={1000}
                    status="available"
                    sponser="userid1"
                    createdBy="userid1"
                    createdAt="2021-11-05T03:47:24.581+00:00"
                />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
