"use strict";(self["webpackChunkbloid_client"]=self["webpackChunkbloid_client"]||[]).push([[153],{9153:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v(" uu"+t._s(t.disabled)+"pp "),a("b-button-group",[a("b-button",{attrs:{variant:"outline-secondary",size:"sm",disabled:t.disabled},on:{click:t.stash}},[t._v("stash")]),a("b-button",{attrs:{variant:"outline-warning",size:"sm",disabled:t.disabled},on:{click:t.init_clear}},[t._v("clear")])],1)],1)},l=[],o={name:"ToolBar",data(){return{disabled:!0}},created(){this.disabled=this.$store.state.graph.toolbar_disabled},methods:{stash(){console.log("stash");let t=prompt("what is the name of this stash ?",Date.now()),e=prompt("where do you want to stash ?","local");null!=t&&null!=e&&this.$store.commit("graph/stash",{name:t,where:e})},init_clear(){console.log("stash");let t=confirm("Are you sure you want to clear all nodes ?");null!=t&&this.$store.commit("graph/clear")}},watch:{toolbar_disabled(){this.disabled=this.toolbar_disabled}},computed:{toolbar_disabled(){return this.$store.state.graph.toolbar_disabled}}},i=o,r=a(1001),n=(0,r.Z)(i,s,l,!1,null,null,null),d=n.exports}}]);
//# sourceMappingURL=153.4ccc24ed.js.map