import React from "react";
import { render } from "@testing-library/react";
import CreateChoreForm from "./CreateChoreForm";
import { UserProvider } from "../testUtils";


it("renders without crashing", function () {
    render(
          <UserProvider>
            <CreateChoreForm />
          </UserProvider>
    );
  });
