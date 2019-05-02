import { shallowMount } from "@vue/test-utils";
import ScrollIndicator from "@/components/ScrollIndicator.vue";

describe("ScrollIndicator", () => {
  it("renders arrows", () => {
    expect(shallowMount(ScrollIndicator)).toMatchSnapshot();
  });
});
