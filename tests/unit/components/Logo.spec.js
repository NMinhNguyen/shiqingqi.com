import { shallowMount } from "@vue/test-utils";
import Logo from "@/components/Logo.vue";

describe("Logo", () => {
  it("renders svg logo", () => {
    expect(shallowMount(Logo)).toMatchSnapshot();
  });

  it("renders logo with different color", () => {
    expect(
      shallowMount(Logo, { propsData: { color: "#878787" } })
    ).toMatchSnapshot();
  });
});
