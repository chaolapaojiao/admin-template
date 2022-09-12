<template>
  <div>
    <el-button
      type="primary"
      v-show="$store.state.user.buttons.indexOf('test.button1') != -1"
      >test3</el-button
    >
    <el-button
      type="primary"
      v-show="$store.state.user.buttons.indexOf('test.button4') != -1"
      >test4</el-button
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>