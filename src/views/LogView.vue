<template>
  <span>
    logview {{JSON.stringify(logs)}} (type test)
  </span>
</template>

<script>
export default {
  name: "LogView",
  data(){
    return {
      logs: null
    }
  },
  watch : {
    ldTestResult(){
      this.logs.unshift(this.ldTestResult)
    }
  },
  computed: {
    ldTestResult() {
      return this.$store.state.ld.ldTestResult
    },
  }
}
</script>

<style>

</style>
