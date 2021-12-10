import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ClaimRewardForm from "./ClaimRewardForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <ClaimRewardForm  />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
