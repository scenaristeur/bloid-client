"use strict";(self["webpackChunkbloid_client"]=self["webpackChunkbloid_client"]||[]).push([[311],{8311:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-modal",{attrs:{id:"modal-crudlet",title:"Let",size:"lg","ok-disabled":void 0==t.thing.name||0==t.thing.name.length,"ok-variant":void 0==t.thing.name||0==t.thing.name.length?"secondary":"success"},on:{ok:t.save,cancel:t.onCancel}},[i("div",{staticClass:"scroll"},[i("b-checkbox",{attrs:{size:"sm",disabled:""}},[t._v("use wikidata")]),t._l(t.thing,(function(e,s){return i("div",{key:s},[s.startsWith("@")?t._e():i("b-row",{staticClass:"my-1"},[i("b-col",{attrs:{sm:"3"}},[i("label",{attrs:{for:"field-"+s}},[t._v(t._s(s))])]),i("b-col",{attrs:{sm:"9"}},[Array.isArray(t.thing[s])?i("div",[t._v(" Multiple"),i("br"),t._l(t.thing[s],(function(e,s){return i("b-button",{key:s,attrs:{size:"sm",variant:t.thingVariant(e)}},[t._v(t._s(e.name||e.text)+" ("+t._s(e.description)+")("+t._s(e["https://www.wikidata.org/wiki/Q3523102"])+")")])}))],2):t._e(),"name"==s?i("b-form-input",{attrs:{id:"field-"+s,autofocus:"",state:null!=t.thing[s]&&t.thing[s].length>0,placeholder:"{"+s+"}"},model:{value:t.thing[s],callback:function(e){t.$set(t.thing,s,e)},expression:"thing[k]"}}):i("div",[i("KTag",{attrs:{thing:t.thing,k:s}})],1)],1)],1)],1)}))],2),i("b-row",{staticClass:"my-1"},[i("b-col",{attrs:{sm:"6"}},[i("b-form-input",{attrs:{id:"add_filed",placeholder:"new field",size:"sm"},model:{value:t.new_field,callback:function(e){t.new_field=e},expression:"new_field"}})],1),i("b-col",{attrs:{sm:"3"}},[i("b-form-input",{attrs:{placeholder:"type",disabled:"",size:"sm"}})],1),i("b-col",{attrs:{sm:"3"}},[i("b-button",{attrs:{disabled:null==t.new_field||0==t.new_field.length,size:"sm",variant:null==t.new_field||0==t.new_field.length?"secondary":"success"},on:{click:t.add}},[t._v("Add field")])],1)],1)],1)},n=[],a=i(905),l={name:"CrudLet",components:{KTag:()=>i.e(872).then(i.bind(i,1872))},data(){return{thing:{},new_field:null}},methods:{save(){console.log("save ",this.thing);let t=this.$store.state.crud.currentThingExtraProps;console.log(t);for(const[i,s]of Object.entries(t)){console.log(`${i}: ${s}`);let t=this.thing[i];console.log(t),null==t||0==t.length?this.thing[i]=s:Array.isArray(t)?t.push(s):(this.thing[i]=[this.thing[i]],this.thing[i].push(s))}let e={action:"create",thing:this.thing,start:Date.now()};this.new_field="",this.$io_ld_crud(e),this.$store.commit("crud/resetCurrentThingExtraProps")},thingVariant(t){let e="outline-secondary";switch(t["https://www.wikidata.org/wiki/Q3523102"]){case"wikidata":e="outline-success";break;case"local":e="outline-warnig";break;default:console.log("no variant for ",t["https://www.wikidata.org/wiki/Q3523102"])}return e},onCancel(){console.log("todo cancel")},add(){this.new_field.length>0&&(void 0==this.thing[this.new_field]?this.thing[this.new_field]="":alert("already exist")),console.log(this.thing),this.new_field=""}},watch:{createParams(){let t={"@context":{"@vocab":"https://scenaristeur/github.io/bloid/",name:"https://www.wikidata.org/wiki/Q82799",type:"https://www.wikidata.org/wiki/Q21146257",description:"https://www.wikidata.org/wiki/Q1200750",version:"https://www.wikidata.org/wiki/Q20826013",creator:"https://www.wikidata.org/wiki/Q2500638",source:"https://www.wikidata.org/wiki/Q3523102"},"@id":"{@id}",name:null,type:null,description:null,version:null,creator:null};this.thing=t,this.thing["@id"]="http://local/base/"+(0,a.Z)();let e=this.createParams.array.shift(),i=this.createParams.array;console.log(e,i),1==i.length&&void 0==i[0].split("=")[1]?this.thing.name=i[0]:i.forEach(((t,e)=>{let i=t.split("=");console.log(e,t,i),this.thing[i[0]]=i[1]})),console.log(this.thing)},currentNode(){console.log("current",this.currentNode),this.thing=this.currentNode,this.$bvModal.show("modal-crudlet")}},computed:{createParams(){return this.$store.state.crud.createParams},currentNode(){return this.$store.state.graph.currentNode}}},r=l,o=i(1001),h=(0,o.Z)(r,s,n,!1,null,null,null),c=h.exports}}]);
//# sourceMappingURL=311.2f88541c.js.map