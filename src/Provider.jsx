import React from "react";
import Context from "./context";
import invariant from "invariant";

const Provider = ({ client, children }) => {
  invariant(
    client,
    "Provider was not passed a StandardAPI client instance." +
      ' Make sure you pass in your client via the "client" prop.'
  );

  invariant(
    client.constructor && client.constructor.name === "StandardAPIClient",
    "The client passed into the Provider component must be an instance of StandardAPIClient."
  );

  return <Context.Provider value={client}>{children}</Context.Provider>;
};

export default Provider;
