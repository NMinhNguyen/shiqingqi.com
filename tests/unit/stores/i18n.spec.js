// @ts-nocheck
import { mutations, actions, getters } from "@/stores/i18n";

jest.mock("@/constants/translations/zh", () => ({
  test: "bob"
}));

describe("i18n", () => {
  describe("mutations", () => {
    it("setLocale", () => {
      const state = { locale: "test" };
      mutations.setLocale(state, "en");
      expect(state.locale).toEqual("en");
    });

    it("setTranslations zh", () => {
      const state = { locale: "zh", translations: {} };
      mutations.setTranslations(state, {
        lang: "zh",
        translations: { test: "test" }
      });
      expect(state.translations).toEqual({ zh: { test: "test" } });
    });

    it("setTranslations en", () => {
      const state = { locale: "en", translations: {} };
      mutations.setTranslations(state, {
        lang: "en",
        translations: { test: "test" }
      });
      expect(state.translations).toEqual({ en: { test: "test" } });
    });
  });

  describe("actions", () => {
    it("fetchTranslations", async () => {
      const commit = jest.fn();
      await actions.fetchTranslations({ commit }, "zh");
      expect(commit).toHaveBeenCalledWith("setTranslations", {
        lang: "zh",
        translations: { test: "bob" }
      });
    });
  });

  describe("getters", () => {
    describe("getText", () => {
      const state = {
        locale: "zh",
        translations: {
          zh: {
            test: "test",
            hasParam: "hello {{name}}",
            multiple: "{{1}}{{2}}"
          }
        }
      };
      const get = getters.getText(state);

      it("returns ??key?? if key doesn't exist", () => {
        expect(get("blah")).toEqual("??blah??");
      });

      it("returns translation without param", () => {
        expect(get("test")).toEqual("test");
        expect(get("hasParam")).toEqual("hello {{name}}");
      });

      it("returns with param replaced", () => {
        expect(get("hasParam", { name: "qi" })).toEqual("hello qi");
      });

      it("inserts multiple params", () => {
        expect(get("multiple", { 1: "a", 2: "b" })).toEqual("ab");
      });
    });
  });
});
