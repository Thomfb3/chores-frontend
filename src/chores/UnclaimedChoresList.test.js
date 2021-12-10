import React from "react";
import { render } from "@testing-library/react";
import UnclaimedChoresList from "./UnclaimedChoresList";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <UserProvider>
            <UnclaimedChoresList />
        </UserProvider>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <UserProvider>
            <UnclaimedChoresList />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});
