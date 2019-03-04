import _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import changeCase from 'change-case';

const lang_data = {
  en: {
    app: {
      brand: "my application"
    }
  },
  ja: {
    app: {
      brand: "僕のアプリ"
    }
  }
}

Vue.use(VueI18n);

// 各種大文字/小文字切り替え用のfunctionを用意する
Vue.mixin({
  methods: {
    // camelCaseにする
    $tcc(path) {
      return changeCase.camelCase(this.$t(path));
    },
    // 1文字目をupperCaseにする
    $tucf(path) {
      return changeCase.upperCaseFirst(this.$t(path));
    },
    // 1文字目をlowerCaseにする
    $tlcf(path) {
      return changeCase.lowerCaseFirst(this.$t(path));
    },
    // 全部upperCaseにする
    $tuc(path) {
      return changeCase.upperCase(this.$t(path));
    },
    // 全部lowerCaseにする
    $tlc(path) {
      return changeCase.lowerCase(this.$t(path));
    }
  }
});

export default ({
  app,
  req,
  isClient
}) => {
  // 標準はja
  let locale = 'ja';
  if (isClient) {
    // browserから取る場合はnavigator経由で取得
    const navigator = _.get(window, 'navigator', {});
    locale = (_.head(navigator.languages) || navigator.language || navigator.browserLanguage || navigator.userLanguage).substr(0, 2);
  } else if (req) {
    // ssrの場合はrequestから取得
    locale = req.headers['accept-language'].split(',')[0].toLocaleLowerCase().substr(0, 2);
  }
  app.i18n = new VueI18n({
    locale: locale || 'ja',
    fallbackLocale: 'ja',
    messages: {
      'en': lang_data.en,
      'ja': lang_data.ja,
    },
  });
}
