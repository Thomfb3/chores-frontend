import React from "react";
import { render } from "@testing-library/react";
import MyChoresList from "./MyChoresList";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <UserProvider>
            <MyChoresList />
        </UserProvider>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <UserProvider>
            <MyChoresList />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});
