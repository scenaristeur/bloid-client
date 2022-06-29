<template>
  <div>
    <div id="graph" width="100px" ref="graph">Loading graph...</div>
    <!-- config to select bloid server -->
  </div>
</template>

<script>
export default {
  name: 'GraphView',
  components: {
    // 'SocketConnect': ()=>import('@/views/socket/SocketConnect'),
    // 'TerminalView': ()=>import('@/views/TerminalView'),
    // 'LogView': ()=>import('@/views/LogView'),
    // 'CrudLet': ()=>import('@/views/crud/CrudLet'),
    // 'CrudHistory': ()=>import('@/views/crud/CrudHistory'),
  },
  mounted(){
    this.$graphInit({domElement: this.$refs.graph})
  },
}
</script>

<style>
.node-label {
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.5);
  user-select: none;
}
</style>
