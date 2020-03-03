import React from "react";
import { shallow } from "enzyme";
import { useRead, StandardAPIProvider } from "../src";
import StandardAPIClient from "standardapi-client";

const testClient = new StandardAPIClient({
  baseUrl: "https://test.com"
});

const TestComponent = () => {
  const { loading, error, data, count } = useRead("availabilities", {
    limit: 10
  });
  return <div>{loading ? "loading..." : count}</div>;
};

describe("useRead Test Suite", () => {
  it("Renders without crashing", () => {
    shallow(
      <StandardAPIProvider client={testClient}>
        <TestComponent />
      </StandardAPIProvider>
    );
  });
});
