<template>
  <div>
    <div id="graph" width="100px" ref="graph">Loading graph...</div>
    <ToolBar />
    
  </div>
</template>

<script>
export default {
  name: 'GraphView',
  components: {
    'ToolBar': ()=>import('@/views/graph/ToolBar')
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
