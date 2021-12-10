import React from "react";
import { render } from "@testing-library/react";
import TeamUserList from "./TeamUserList";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <UserProvider>
            <TeamUserList />
        </UserProvider>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <UserProvider>
            <TeamUserList />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});
