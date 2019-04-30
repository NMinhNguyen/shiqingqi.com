import Vue from "vue";

export const state = {
  locale: "en",
  /** @type {{[locale:string]: {[key:string]: string}}} */
  translations: {}
};

export const mutations = {
  /**
   * @param {typeof state} state State object
   * @param {string} locale Locale code
   */
  setLocale(state, locale) {
    state.locale = locale;
  },

  /**
   * @param {typeof state} state State object.
   * @param {{lang: string, translations: object}} payload New translations.
   */
  setTranslations(state, { lang, translations }) {
    Vue.set(state.translations, lang, {
      ...state.translations[lang],
      ...translations
    });
  }
};

export const actions = {
  /**
   * @param {import("vuex").ActionContext<typeof state, {}>} context
   * @param {string} lang Language code.
   * @returns {Promise}
   */
  async fetchTranslations({ commit }, lang) {
    /** @type {{default: object}} */
    const module = await import(`@/constants/translations/${lang}.json`);
    commit("setTranslations", { lang, translations: module.default });
  }
};

export const getters = {
  /**
   * @param {typeof state} state
   * @returns {(key: string, params: {[key:string]: string}) => string}
   */
  getText: state => (key, params) => {
    const translations = state.translations[state.locale];

    // Return empty string if translation doesn't exist
    if (!translations || !translations[key]) return "";

    // Return translation if no params provided
    if (!params) return translations[key];

    // Replace the params
    let text = translations[key];
    for (let name in params) {
      text = text.replace(`{{${name}}}`, params[name]);
    }
    return text;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
