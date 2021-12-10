import React from "react";
import { render } from "@testing-library/react";
import TeamChoresList from "./TeamChoresList";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <UserProvider>
            <TeamChoresList />
        </UserProvider>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <UserProvider>
            <TeamChoresList />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});
