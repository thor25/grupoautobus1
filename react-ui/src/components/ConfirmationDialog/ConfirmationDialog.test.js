import React from "react";

import ReactDOM from "react-dom";

import ConfirmationDialog from "./ConfirmationDialog";

import { Button } from "@material-ui/core";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <ConfirmationDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      content={<div></div>}
      dismissiveAction={<Button color="primary" onClick={onClose}>Cancel</Button>}
      confirmingAction={<Button color="primary" onClick={onClose}>OK</Button>}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
