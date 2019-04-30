// @ts-nocheck
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TheHeader from "@/components/TheHeader.vue";
import i18n from "@/stores/i18n";

jest.mock("@/stores/i18n");

let localVue = createLocalVue();
localVue.use(Vuex);

describe("TheHeader", () => {
  let store;

  beforeAll(() => {
    store = new Vuex.Store({
      modules: {
        i18n
      }
    });
  });

  it("renders the header", () => {
    expect(
      shallowMount(TheHeader, {
        localVue,
        store
      })
    ).toMatchSnapshot();
  });
});
