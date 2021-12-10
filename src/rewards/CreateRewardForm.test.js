import React from "react";
import { render } from "@testing-library/react";
import CreateRewardForm from "./CreateRewardForm";
import { UserProvider } from "../testUtils";


it("renders without crashing", function () {
    render(
          <UserProvider>
            <CreateRewardForm />
          </UserProvider>
    );
  });
