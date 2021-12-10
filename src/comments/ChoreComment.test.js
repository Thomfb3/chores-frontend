import React from "react";
import { render } from "@testing-library/react";
import ChoreComment from "./ChoreComment";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  
    const { asFragment } = render(
            <UserProvider>
                <ChoreComment
                    id="userid1"
                    key="userid1"
                    user="userid1"
                    comment="I'm commenting on the chore"
                    date="2021-11-05T02:24:00.000+00:00"
                />
            </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});
