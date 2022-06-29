<template>
  <div class="home">
    <SocketConnect />
    <TerminalView />
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
  }
}
</script>
