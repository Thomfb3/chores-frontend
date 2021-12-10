import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginForm from "./LoginForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider  currentUser={null}>
                <LoginForm  />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
