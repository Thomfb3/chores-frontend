import React from "react";
import { render } from "@testing-library/react";
import SubmitChoreForm from "./SubmitChoreForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  const { asFragment } = render(
      <UserProvider>
        <SubmitChoreForm />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
