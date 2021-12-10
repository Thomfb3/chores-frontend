import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateTeamForm from "./CreateTeamForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <CreateTeamForm  currentTeam={null} />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
