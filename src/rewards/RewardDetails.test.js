import React from "react";
import { render } from "@testing-library/react";
import RewardDetails from "./RewardDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                    <RewardDetails />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter initialEntries={["/reward/123"]}>
            <UserProvider>
                <Route path="/reward/:handle">
                        <RewardDetails />
                </Route>
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
