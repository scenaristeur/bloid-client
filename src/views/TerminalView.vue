<template>
  <div>
    <vue-command class="scroll"
    id="term-std"
    ref="term-std"
    :autocompletion-resolver="autocompletionResolver"
    :built-in="builtIn"
    :commands="commands"
    :cursor.sync="cursor"
    :history.sync="history"
    :help-timeout="1250"
    :prompt="prompt"
    title="user@local"
    :stdin.sync="stdin"
    show-help/>
    <!-- <b-button @click="close">X</b-button> -->
  </div>
</template>

<script>
// source https://github.com/ndabAP/vue-command/blob/master/src/hosted/App.vue
import VueCommand, {  createStdout, createStderr, createDummyStdout } from 'vue-command'
import 'vue-command/dist/vue-command.css'
import NanoEditor from '@/views/NanoEditor.vue'

const PROMPT = ':#/'

export default {
  name: "TerminalView",
  components: {
    VueCommand
  },

  data: () => ({
    autocompletionResolver: () => undefined,
    builtIn: undefined,
    commands: {
      // Navigate to home, self and back
      cd: undefined,
      // Clear terminals history
      clear: undefined,
      // Returns the parsed object to test parsing
      // E. g.: echo --x="one two three" --y="one two" --z="one" --test="okay" --x1 --y2 --t=ok -dash
      echo: _ => createStdout(JSON.stringify(_, null, 2)),
      // Show help
      help: () => createStdout(`
        !!!!!!!! see <b><i><a href="https://github.com/scenaristeur/bloid" target="_blank">
        <u>https://github.com/scenaristeur/bloid</u></a></i></b> for more details<br>
        Available programms:<br><br>

        -working :<br>
        &nbsp;test<br>
        &nbsp;let  <br>
        &emsp; # for creating a new thing <br>
        &emsp;&emsp;eg: 'let' -> create a blank new thing<br>
        &emsp;&emsp;&emsp;or 'let thingName' <br>
        &emsp;&emsp;&emsp;or 'let fieldOne fieldTwo'<br>
        &emsp;&emsp;&emsp;or 'let field1=value1 field2=value2'<br>
        &nbsp;get  &emsp; get all things<br>
        &nbsp;get fada  &emsp; get all things with fada in subject or prop or object<br>

        &nbsp;ls&emsp; list files /folders<br>

        &nbsp;cd [dir]<br>
        &nbsp;clear<br>

        <br>
        - work in progress :<br>

        &nbsp;config     &emsp;# config<br>
        &nbsp;ld         &emsp;       <span STYLE="padding:0 0 0 40px;"># mode data/jsonld</span><br>
        &nbsp;files      &emsp;       <span STYLE="padding:0 0 0 40px;"># mode file</span><br>

        &nbsp;new<br>
        &nbsp;find<br>
        &nbsp;user<br>
        &nbsp;import<br>
        &nbsp;media &emsp;<span STYLE="padding:0 0 0 40px;"># mode media (video, sound, image... )</span><br>
        &nbsp;collab &emsp;#mode collaborative<br>

        &nbsp;echo<br>
        &nbsp;nano<br>
        &nbsp;pwd<br>
        `),
        // help: () => createStdout(`Available programms:<br><br>
        //   &nbsp;cd [dir]<br>
        //   &nbsp;clear<br>
        //   &nbsp;echo<br>
        //   &nbsp;hello-world<br>
        //   &nbsp;klieh<br>
        //   &nbsp;loading [--amount n] [--timeout n]<br>
        //   &nbsp;nano<br>
        //   &nbsp;norris<br>
        //   &nbsp;pokedex pokemon --color<br>
        //   &nbsp;pwd<br>
        //   &nbsp;reverse text<br>
        // `),
        // Return simple text
        // 'hello-world': () => createStdout('Hello world'),
        // Show an animation
        //  klieh: () => KliehParty,
        // Simulate a loading animation
        //loading: () => LoadingAnimation,
        // Nano editor available in many shells
        nano: () => NanoEditor,
        // Return a Chuck Norris joke
        //norris: () => ChuckNorris,
        // Return color for Pokemon Pikachu
        // pokedex: ({ color, _ }) => {
        //   if (color && _[1] === 'pikachu') {
        //     return createStdout('yellow')
        //   }
        //   // Return help since no match
        //   return createStderr(`Usage: pokedex pokemon [option | -h]<br><br>
        //     Example: pokedex pikachu --color
        //   `)
        // },
        // Show current path
        pwd: () => undefined
      },
      // Terminal cursor position
      cursor: 0,
      history: [],
      options: {
        long: {
          pokedex: ['color'],
          loading: ['amount', 'timeout']
        },
        short: {
          pokedex: ['h']
        }
      },
      prompt: PROMPT,
      stdin: ''
    }),

    methods:{
      close(){
        this.$store.commit('terminal/toggleTerminal')
      }
    },
    created () {
      let app = this
      let coreStore = this.$store.state.vatch
      this.commands.ls = ({ _ }) => {
        let localResources = coreStore.localResources
        console.log(localResources)
        let names = localResources.map(n => {return n.path})
        names.sort()



        return createStdout("ls "+_[1] + JSON.stringify(names, null, 2))
      }

      this.commands.mk = ({ _ }) => {
        return createStdout("make "+_)
      }


      this.commands.test = async function(_) {
        let params = {start: Date.now(), data: _ }
        let result = await app.$io_ld_test(params)
        return createStdout("test "+_[1] + " ## "+ _+" -- "+JSON.stringify(result))
      }


      this.commands.ld = ({ _ }) => {
        return createStdout("switching to jsonld/data mode "+ _[1])
      }

      this.commands.files = ({ _ }) => {
        return createStdout("switching to files mode "+ _[1])
      }

      this.commands.let = ({_}) =>{
        this.$store.commit('crud/setCreateParams', _)
        this.$bvModal.show('modal-crudlet')
        return createStdout("let done "+ _[1] + " " +_)
      }
      this.commands.get = ({_}) =>{
        console.log("get",_.length, _[1])
        if (_.length < 3){
          let crud = {
            action: "get",
            what: _[1],
            limit:26, // return the last 25 things created
            start: Date.now()
          }
          console.log(crud)
          this.$io_ld_crud(crud)
        }else{
          this.$bvModal.show('modal-crudlet')
        }
        // this.$store.commit('crud/setCreateParams', _)
        // this.$bvModal.show('modal-crudget')
        return createStdout("get done "+ _[1] + " " +_)
      }


      this.commands.clear = () => {
        this.history = []
        // Push dummy Stdout to show Stdin
        return createDummyStdout()
      }
      this.commands.cd = ({ _ }) => {
        if ((_[1] === 'home' || _[1] === 'home/') && this.prompt === PROMPT) {
          this.prompt = `${PROMPT}home`
          return createDummyStdout()
        }
        // Navigate from home to root
        if ((_[1] === '../' || _[1] === '..') && this.prompt === `${PROMPT}home`) {
          this.prompt = PROMPT
          return createDummyStdout()
        }
        // Navigate to self
        if (_[1] === '.' || _[1] === './' || typeof _[1] === 'undefined') {
          return createDummyStdout()
        }
        return createStderr(`cd: ${_[1]}: No such file or directory`)
      }
      this.commands.pwd = () => {
        // Take current prompt into account
        if (this.prompt === ':#/') {
          return createStdout('/')
        } else {
          return createStdout('/home')
        }
      }
      this.builtIn = (stdin, terminal) => {
        // Check for application
        if (stdin.trim().split(' ')[0] !== 'reverse') {
          terminal.commandNotFound(stdin)
          return
        }
        stdin = stdin.trim()
        // Get second argument
        const argument = stdin.split(' ').slice(1).join(' ').replace(/"/g, '')
        // Do nothing if no argument given
        if (!argument) {
          return
        }
        // Reverse argument
        this.stdin = argument.split('').reverse().join('')
      }
      this.autocompletionResolver = () => {
        // Preserve cursor position
        const cursor = this.cursor
        // Reverse concatenate autocompletable according to cursor
        let pointer = this.cursor
        let autocompleteableStdin = ''
        while (this.stdin[pointer - 1] !== ' ' && pointer - 1 > 0) {
          pointer--
          autocompleteableStdin = `${this.stdin[pointer]}${autocompleteableStdin}`
        }
        // Divide by arguments
        const command = this.stdin.split(' ')
        // Autocompleteable is program
        if (command.length === 1) {
          const autocompleteableProgram = command[0]
          // Collect all autocompletion candidates
          const candidates = []
          const programs = [...Object.keys(this.commands), 'reverse'].sort()
          programs.forEach(program => {
            if (program.startsWith(autocompleteableProgram)) {
              candidates.push(program)
            }
          })
          // Autocompletion resolved into multiple results
          if (this.stdin !== '' && candidates.length > 1) {
            this.history.push({
              // Build table programmatically
              render: createElement => {
                const columns = candidates.length < 5 ? candidates.length : 4
                const rows = candidates.length < 5 ? 1 : Math.ceil(candidates.length / columns)
                let index = 0
                const table = []
                for (let i = 0; i < rows; i++) {
                  const row = []
                  for (let j = 0; j < columns; j++) {
                    row.push(createElement('td', candidates[index]))
                    index++
                  }
                  table.push(createElement('tr', [row]))
                }
                return createElement('table', { style: { width: '100%' } }, [table])
              }
            })
          }
          // Autocompletion resolved into one result
          if (candidates.length === 1) {
            // Mutating Stdin mutates the cursor, so we've to wait to push it to the end
            const unwatch = this.$watch(() => this.cursor, () => {
              this.cursor = cursor + (candidates[0].length - autocompleteableStdin.length + 0)
              unwatch()
            })
            this.stdin = candidates[0]
          }
          return
        }
        // Check if option might be completed already or option is last tokens
        if ((this.stdin[cursor] !== '' && this.stdin[cursor] !== ' ') && typeof this.stdin[cursor] !== 'undefined') {
          return
        }
        // Get the executable
        const program = command[0]
        // Check if any autocompleteable exists
        if (typeof this.options.long[program] === 'undefined' && typeof this.options.short[program] === 'undefined') {
          return
        }
        // Autocompleteable is long option
        if (autocompleteableStdin.substring(0, 2) === '--') {
          const candidates = []
          this.options.long[program].forEach(option => {
            // If only dashes are presents, user requests all options
            if (`--${option}`.startsWith(autocompleteableStdin) || autocompleteableStdin === '--') {
              candidates.push(option)
            }
          })
          // Autocompletion resolved into one result
          if (candidates.length === 1) {
            const autocompleted = `${this.stdin.substring(0, pointer - 1)} --${candidates[0]}`
            const rest = `${this.stdin.substring(this.cursor)}`
            // Mutating Stdin mutates the cursor, so we've to wait to push it to the end
            const unwatch = this.$watch(() => this.cursor, () => {
              this.cursor = cursor + (candidates[0].length - autocompleteableStdin.length + 2)
              unwatch()
            })
            this.stdin = `${autocompleted}${rest}`
            return
          }
          // Autocompletion resolved into multiple result
          if (autocompleteableStdin === '--' || candidates.length > 1) {
            this.history.push({
              // Build table programmatically
              render: createElement => {
                const columns = candidates.length < 5 ? candidates.length : 4
                const rows = candidates.length < 5 ? 1 : Math.ceil(candidates.length / columns)
                let index = 0
                const table = []
                for (let i = 0; i < rows; i++) {
                  const row = []
                  for (let j = 0; j < columns; j++) {
                    row.push(createElement('td', `--${candidates[index]}`))
                    index++
                  }
                  table.push(createElement('tr', [row]))
                }
                return createElement('table', { style: { width: '100%' } }, [table])
              }
            })
          }
          return
        }
        // Autocompleteable is option
        if (autocompleteableStdin.substring(0, 1) === '-') {
          const candidates = []
          this.options.short[program].forEach(option => {
            // If only one dash is present, user requests all options
            if (`-${option}`.startsWith(autocompleteableStdin) || autocompleteableStdin === '-') {
              candidates.push(option)
            }
          })
          // Autocompletion resolved into one result
          if (candidates.length === 1) {
            const autocompleted = `${this.stdin.substring(0, pointer - 1)} -${candidates[0]}`
            const rest = `${this.stdin.substring(this.cursor)}`
            // Mutating Stdin mutates the cursor, so we've to wait to push it to the end
            const unwatch = this.$watch(() => this.cursor, () => {
              this.cursor = cursor + (candidates[0].length - autocompleteableStdin.length + 1)
              unwatch()
            })
            this.stdin = `${autocompleted}${rest}`
            return
          }
          // Autocompletion resolved into multiple result
          if (autocompleteableStdin === '-' || candidates.length > 1) {
            this.history.push({
              // Build table programmatically
              render: createElement => {
                const columns = candidates.length < 5 ? candidates.length : 4
                const rows = candidates.length < 5 ? 1 : Math.ceil(candidates.length / columns)
                let index = 0
                const table = []
                for (let i = 0; i < rows; i++) {
                  const row = []
                  for (let j = 0; j < columns; j++) {
                    row.push(createElement('td', `-${candidates[index]}`))
                    index++
                  }
                  table.push(createElement('tr', [row]))
                }
                return createElement('table', { style: { width: '100%' } }, [table])
              }
            })
          }
        }
      }
    }

  }
  </script>

  <style lang="scss">
  $border-radius: 8px;
  body {
    /*  display: grid;
    place-items: center;
    height: 95vh;
    margin: 0;
    main {
    margin: 1rem;
    max-width: 400px;
    width: calc(100% - 2rem);
  } */
  h1,
  h2,
  h3 {
    font-family: "Inconsolata", monospace;
  }
  p {
    font-family: "Montserrat", sans-serif;
  }
  pre {
    width: 100%;
    padding: 0;
    margin-top: 1em;
    overflow: auto;
    overflow-y: hidden;
    code {
      padding: 10px;
      color: #333;
      margin: 5px;
    }
  }
  .vue-command {
    -webkit-border-bottom-left-radius: $border-radius;
    -webkit-border-bottom-right-radius: $border-radius;
    -moz-border-bottom-left-radius: $border-radius;
    -moz-border-bottom-right-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #252525;
    }
    ::-webkit-scrollbar-thumb {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #333;
    }
    .term-bar {
      -webkit-border-top-left-radius: $border-radius;
      -webkit-border-top-right-radius: $border-radius;
      -moz-border-top-right-radius: $border-radius;
      -moz-border-top-left-radius: $border-radius;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
    .term-std {
      min-height: 312px;
      max-height: 312px;
      overflow-y: scroll;
    }
  }
}
</style>
<style>
.scroll{
  max-height: 60vh;
  margin-bottom: 10px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
