<template>
  <div>

    <div v-if="user== null">
      please install <a href="https://github.com/scenaristeur/bloid" target="_blank">bloid server</a> on your local machine.
      <br>

      <code style="text-align:left" variant="success">
        <pre>
          git clone https://github.com/scenaristeur/bloid.git
          cd bloid
          // git submodule update --recursive --remote for later updates
          git submodule update --init --recursive
          npm install
          npm run start

        </pre>
      </code>
      <hr>
      if your Bloid server is not running on http://localhost:5000 please update the config below :
      <b-input  v-model="h" placeholder="http://localhost" />
      <b-input  type="number" v-model="p" placeholder="5000" />
      <b-button @click="connect" variant="secondary">Test</b-button>
    </div>
    <div v-else>
      connected to server ;-)
    </div>
  </div>
</template>

<script>
export default {
  name: "SocketConnect",
  data(){
    return {
      p: this.$store.state.vatch.port,
      h: this.$store.state.vatch.host
    }
  },
  created(){
    console.log(window.location.href=="https://scenaristeur.github.io/bloid-client/")
    this.h = window.location.href=="https://scenaristeur.github.io/bloid-client/" ? "http://localhost" : "http://"+window.location.hostname

    this.connect()
  },
  methods:{
    connect(){
      // console.log(this.h, this.p, this.host, this.port)
      this.$store.commit('vatch/setServer', {host:this.h, port:this.p})
      this.$socket_connect()
    }
  },
  watch:{
    port(){
      this.p = this.port
    },
    host(){
      this.h = this.host
    }
  },
  computed: {
    user() {
      return this.$store.state.vatch.user
    },
    host() {
      return this.$store.state.vatch.host
    },
    port() {
      return this.$store.state.vatch.port
    },
  }
}
</script>

<style>

</style>
