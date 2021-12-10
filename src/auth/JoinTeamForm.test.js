import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import JoinTeamForm from "./JoinTeamForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <JoinTeamForm  currentTeam={null} />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
