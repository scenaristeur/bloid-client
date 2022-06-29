<template>
  <div class="home">
    <SocketConnect />

    <b-row>
      <b-col md="6">
        <TerminalView />
      </b-col>
      <b-col md="6">
        <GraphView />

      </b-col>
    </b-row>


    <CrudHistory />
    <CrudLet />
    <LogView />
    <!-- config to select bloid server -->
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    'SocketConnect': ()=>import('@/views/socket/SocketConnect'),
    'TerminalView': ()=>import('@/views/TerminalView'),
    'LogView': ()=>import('@/views/LogView'),
    'CrudLet': ()=>import('@/views/crud/CrudLet'),
    'CrudHistory': ()=>import('@/views/crud/CrudHistory'),
    'GraphView': ()=>import('@/views/graph/GraphView'),
  }
}
</script>
