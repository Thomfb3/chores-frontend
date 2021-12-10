import React from "react";
import { render } from "@testing-library/react";
import ChoreDetails from "./ChoreDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider, CommentProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <CommentProvider>
                    <ChoreDetails />
                </CommentProvider>
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter initialEntries={["/chore/123"]}>
            <UserProvider>
                <Route path="/chore/:handle">
                    <CommentProvider>
                        <ChoreDetails />
                    </CommentProvider>
                </Route>
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
