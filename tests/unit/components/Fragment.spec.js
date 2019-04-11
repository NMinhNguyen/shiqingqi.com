import { mount } from "@vue/test-utils";
import Fragment from "@/components/Fragment.vue";

/** @type {(slot: string) => ({components: any, template: string})} */
const FragmentContainer = slot => ({
  components: { Fragment },
  template: `<div><Fragment>${slot}</Fragment></div>`
});

describe("Fragment.vue", () => {
  it("renders text without a wrapper", () => {
    const wrapper = mount(FragmentContainer("test"));

    expect(wrapper.html()).toBe("<div>test</div>");
  });

  it("renders element without a wrapper", () => {
    const wrapper = mount(FragmentContainer("<p>hello</p>"));

    expect(wrapper.html()).toBe("<div><p>hello</p></div>");
  });

  it("renders multiple elements without a wrapper", () => {
    const wrapper = mount(FragmentContainer("<p>hello</p><span>world</span>"));

    expect(wrapper.html()).toBe("<div><p>hello</p><span>world</span></div>");
  });
});
