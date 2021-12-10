import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignupForm from "./SignupForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider  currentUser={null}>
                <SignupForm  />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
