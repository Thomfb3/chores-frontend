import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ClaimChoreForm from "./ClaimChoreForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <ClaimChoreForm  />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
