// @ts-nocheck
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TheTechnologies from "@/components/TheTechnologies.vue";
import i18n from "@/stores/i18n";

jest.mock("@/stores/i18n");

let localVue = createLocalVue();
localVue.use(Vuex);

describe("TheTechnologies", () => {
  let store;

  beforeAll(() => {
    store = new Vuex.Store({
      modules: {
        i18n
      }
    });
  });

  it("renders list of technologies", () => {
    expect(
      shallowMount(TheTechnologies, {
        localVue,
        store,
        propsData: {
          technologies: ["testA", "testB"]
        }
      })
    ).toMatchSnapshot();
  });

  it("default list of technologies", () => {
    expect(
      shallowMount(TheTechnologies, {
        localVue,
        store
      })
    ).toMatchSnapshot();
  });
});
