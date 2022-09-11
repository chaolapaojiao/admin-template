<template>
  <div>
    <Card />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./Card/index.vue";
export default {
  name: "Dashboard",
  components: { Card },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
