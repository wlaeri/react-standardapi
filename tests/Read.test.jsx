import React from "react";
import { shallow } from "enzyme";
import { Read, StandardAPIProvider } from "../src";
import StandardAPIClient from "standardapi-client";

const testClient = new StandardAPIClient({
  baseUrl: "https://test.com"
});

function setup() {
  const props = {
    baseModel: "availabilities",
    params: {
      limit: 10
    }
  };
  const wrapper = shallow(
    <StandardAPIProvider client={testClient}>
      <Read />
    </StandardAPIProvider>
  );
  return { wrapper, props };
}

describe("Read Test Suite", () => {
  it("Renders without crashing", () => {
    shallow(
      <StandardAPIProvider client={testClient}>
        <Read baseModel="availabilities" />
      </StandardAPIProvider>
    );
  });
});
