import React from "react";
import { render } from "@testing-library/react";
import ChoreCommentForm from "./ChoreCommentForm";
import { UserProvider, CommentProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <UserProvider>
            <CommentProvider>
                <ChoreCommentForm />
            </CommentProvider>
        </UserProvider>
    );
});
