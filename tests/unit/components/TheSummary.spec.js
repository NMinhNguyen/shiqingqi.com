// @ts-nocheck
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TheSummary from "@/components/TheSummary.vue";
import i18n from "@/stores/i18n";

jest.mock("@/stores/i18n");

let localVue = createLocalVue();
localVue.use(Vuex);

describe("TheSummary", () => {
  let store;

  beforeAll(() => {
    store = new Vuex.Store({
      modules: {
        i18n
      }
    });
  });

  it("renders paragraphs", () => {
    expect(
      shallowMount(TheSummary, {
        localVue,
        store
      })
    ).toMatchSnapshot();
  });
});
