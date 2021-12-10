import React from "react";
import { render } from "@testing-library/react";
import RewardsList from "./RewardsList";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <UserProvider>
            <RewardsList />
        </UserProvider>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <UserProvider>
            <RewardsList />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});
