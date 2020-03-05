import React from "react";
import Context from "./context";
import invariant from "invariant";

const Provider = ({ client, children }) => {
  invariant(
    client,
    "Provider was not passed a StandardAPI client instance." +
      ' Make sure you pass in your client via the "client" prop.'
  );

  return <Context.Provider value={client}>{children}</Context.Provider>;
};

export default Provider;
