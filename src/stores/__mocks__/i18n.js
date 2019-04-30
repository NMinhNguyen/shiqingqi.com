export default {
  state: {
    locale: "en",
    translations: {
      en: {
        test: "test"
      }
    }
  },
  mutations: {
    setLocale: jest.fn(),
    setTranslations: jest.fn()
  },
  actions: {
    fetchTranslations: jest.fn()
  },
  getters: {
    getText: jest.fn(() => () => "")
  }
};
