<template>
  <div class="navbar-header">
    <p>{{$t('app')}}</p>
    <button @click="toggleLang()">クリック！</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleLang() {
      if (this.$i18n.locale === "ja") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "ja";
      }
    }
  }
};
</script>