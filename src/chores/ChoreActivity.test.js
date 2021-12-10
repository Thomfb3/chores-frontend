import React from "react";
import { render } from "@testing-library/react";
import ChoreActivity from "./ChoreActivity";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider, CommentProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <CommentProvider>
                    <ChoreActivity 
                        key="username"
                        user="username"
                        event="chore created"
                        status="Created"
                        date="2021-11-11T19:35:37.000+00:00"
                    />
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
                    <ChoreActivity 
                        key="username"
                        user="username"
                        event="chore created"
                        status="Created"
                        date="2021-11-11T19:35:37.000+00:00"
                    />
                    </CommentProvider>
                </Route>
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
