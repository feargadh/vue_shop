(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccfb0d8a"],{1276:function(e,t,a){"use strict";var n=a("d784"),r=a("44e7"),i=a("825a"),s=a("1d80"),l=a("4840"),o=a("8aa5"),c=a("50c4"),u=a("14c3"),d=a("9263"),p=a("d039"),f=[].push,m=Math.min,g=4294967295,b=!p((function(){return!RegExp(g,"y")}));n("split",2,(function(e,t,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var n=String(s(this)),i=void 0===a?g:a>>>0;if(0===i)return[];if(void 0===e)return[n];if(!r(e))return t.call(n,e,i);var l,o,c,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),m=0,b=new RegExp(e.source,p+"g");while(l=d.call(b,n)){if(o=b.lastIndex,o>m&&(u.push(n.slice(m,l.index)),l.length>1&&l.index<n.length&&f.apply(u,l.slice(1)),c=l[0].length,m=o,u.length>=i))break;b.lastIndex===l.index&&b.lastIndex++}return m===n.length?!c&&b.test("")||u.push(""):u.push(n.slice(m)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:t.call(this,e,a)}:t,[function(t,a){var r=s(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,r,a):n.call(String(r),t,a)},function(e,r){var s=a(n,e,this,r,n!==t);if(s.done)return s.value;var d=i(e),p=String(this),f=l(d,RegExp),h=d.unicode,v=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(b?"y":"g"),x=new f(b?d:"^(?:"+d.source+")",v),y=void 0===r?g:r>>>0;if(0===y)return[];if(0===p.length)return null===u(x,p)?[p]:[];var w=0,_=0,k=[];while(_<p.length){x.lastIndex=b?_:0;var R,E=u(x,b?p:p.slice(_));if(null===E||(R=m(c(x.lastIndex+(b?0:_)),p.length))===w)_=o(p,_,h);else{if(k.push(p.slice(w,_)),k.length===y)return k;for(var C=1;C<=E.length-1;C++)if(k.push(E[C]),k.length===y)return k;_=w=R}}return k.push(p.slice(w)),k}]}),!b)},"14c3":function(e,t,a){var n=a("c6b6"),r=a("9263");e.exports=function(e,t){var a=e.exec;if("function"===typeof a){var i=a.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(e,t)}},"385e":function(e,t,a){},"3b0d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/Home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("分类参数")])],1),a("el-card",[a("el-alert",{attrs:{title:"注意：只允许为第三级分类设置相关参数！",type:"warning",closable:!1,"show-icon":""}}),a("el-row",[a("el-col",{attrs:{span:8}},[a("span",[e._v("选择商品分类：")]),a("el-cascader",{attrs:{options:e.cateList,props:e.cateProps},on:{change:e.handleChange},model:{value:e.selectCateKeys,callback:function(t){e.selectCateKeys=t},expression:"selectCateKeys"}})],1)],1),a("el-tabs",{on:{"tab-click":e.handleTabClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.isBtnDisable},on:{click:e.showAddDialog}},[e._v("添加参数")]),a("el-table",{attrs:{data:e.manyTableData,border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row.attr_vals,(function(n,r){return a("el-tag",{key:r,attrs:{closable:""},on:{close:function(a){return e.handleClosed(r,t.row)}}},[e._v(e._s(n))])})),t.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return e.handleInputConfirm(t.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.handleInputConfirm(t.row)}},model:{value:t.row.inputValue,callback:function(a){e.$set(t.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return e.showInput(t.row)}}},[e._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return e.showEditDialog(t.row.attr_id)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.removeParams(t.row.attr_id)}}},[e._v("删除")])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.isBtnDisable},on:{click:e.showAddDialog}},[e._v("添加属性")]),a("el-table",{attrs:{data:e.onlyTableData,border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row.attr_vals,(function(n,r){return a("el-tag",{key:r,attrs:{closable:""},on:{close:function(a){return e.handleClosed(r,t.row)}}},[e._v(e._s(n))])})),t.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return e.handleInputConfirm(t.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.handleInputConfirm(t.row)}},model:{value:t.row.inputValue,callback:function(a){e.$set(t.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return e.showInput(t.row)}}},[e._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"属性名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return e.showEditDialog(t.row.attr_id)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.removeParams(t.row.attr_id)}}},[e._v("删除")])]}}])})],1)],1)],1)],1),a("el-dialog",{attrs:{title:e.addTitleText,visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addDialogClosed}},[a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:e.addFormNameLabel,prop:"attr_name"}},[a("el-input",{model:{value:e.addForm.attr_name,callback:function(t){e.$set(e.addForm,"attr_name",t)},expression:"addForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addParams}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:e.addTitleText,visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editDialogClosed}},[a("el-form",{ref:"editFormRef",attrs:{model:e.editForm,rules:e.addFormRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:e.addFormNameLabel,prop:"attr_name"}},[a("el-input",{model:{value:e.editForm.attr_name,callback:function(t){e.$set(e.editForm,"attr_name",t)},expression:"editForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.editParams}},[e._v("确 定")])],1)],1)],1)},r=[],i=(a("99af"),a("4160"),a("a15b"),a("a434"),a("ac1f"),a("1276"),a("498a"),a("159b"),a("96cf"),a("1da1")),s={data:function(){return{cateList:[],cateProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},selectCateKeys:[],activeName:"many",manyTableData:[],onlyTableData:[],addDialogVisible:!1,addForm:{attr_name:""},addFormRules:{attr_name:[{required:!0,message:"参数名称不能为空",trigger:"blur"}]},editDialogVisible:!1,editForm:[],inputVisible:!1,inputValue:""}},created:function(){this.getCateList()},methods:{getCateList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("categories",{params:{type:3}});case 2:if(a=t.sent,n=a.data,200===n.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取分类列表失败"));case 6:e.cateList=n.data;case 7:case"end":return t.stop()}}),t)})))()},handleChange:function(){3===this.selectCateKeys.length?this.getParamsList():this.selectCateKeys=[]},handleTabClick:function(){this.getParamsList()},getParamsList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("categories/".concat(e.cateId,"/attributes"),{params:{sel:e.activeName}});case 2:if(a=t.sent,n=a.data,200===n.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取动态参数/静态属性失败"));case 6:n.data.forEach((function(e){e.attr_vals=e.attr_vals?e.attr_vals.split(" "):[],e.inputVisible=!1,e.inputValue=""})),"many"===e.activeName?(e.manyTableData=n.data,e.onlyTableData=[]):(e.manyTableData=[],e.onlyTableData=n.data);case 8:case"end":return t.stop()}}),t)})))()},showAddDialog:function(){this.addDialogVisible=!0},addDialogClosed:function(){this.$refs.addFormRef.resetFields()},addParams:function(){var e=this;this.$refs.addFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.post("categories/".concat(e.cateId,"/attributes"),{attr_name:e.addForm.attr_name,attr_sel:e.activeName});case 4:if(n=t.sent,r=n.data,201===r.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error(e.addTitleText+"失败"));case 8:e.$message.success(e.addTitleText+"成功"),e.getParamsList(),e.addDialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},showEditDialog:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("categories/".concat(t.cateId,"/attributes/").concat(e),{params:{sel:t.activeName}});case 2:if(n=a.sent,r=n.data,200===r.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("获取参数失败"));case 6:t.editForm=r.data,t.editDialogVisible=!0;case 8:case"end":return a.stop()}}),a)})))()},editDialogClosed:function(){this.$refs.editFormRef.resetFields(),this.editForm={}},editParams:function(){var e=this;this.$refs.editFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.put("categories/".concat(e.cateId,"/attributes/").concat(e.editForm.attr_id),{attr_name:e.editForm.attr_name,attr_sel:e.activeName});case 4:if(n=t.sent,r=n.data,200===r.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("编辑参数失败"));case 8:e.$message.success("编辑参数成功"),e.getParamsList(),e.editDialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},removeParams:function(e){var t=this;this.$confirm("此操作将永久删除该参数, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.delete("categories/".concat(t.cateId,"/attributes/").concat(e));case 2:if(n=a.sent,r=n.data,200===r.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("删除参数失败"));case 6:t.$message({type:"success",message:"删除成功!"}),t.getParamsList();case 8:case"end":return a.stop()}}),a)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},handleInputConfirm:function(e){if(0===e.inputValue.trim().length)return e.inputValue="",void(e.inputVisible=!1);e.attr_vals.push(e.inputValue.trim()),e.inputValue="",e.inputVisible=!1,this.saveAttrVals(e)},saveAttrVals:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.put("categories/".concat(t.cateId,"/attributes/").concat(e.attr_id),{attr_name:e.attr_name,attr_sel:e.attr_sel,attr_vals:e.attr_vals.join(" ")});case 2:if(n=a.sent,r=n.data,200===r.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("添加参数失败"));case 6:t.$message.success("修改参数成功");case 7:case"end":return a.stop()}}),a)})))()},showInput:function(e){var t=this;e.inputVisible=!0,this.$nextTick((function(e){t.$refs.saveTagInput.$refs.input.focus()}))},handleClosed:function(e,t){t.attr_vals.splice(e,1),this.saveAttrVals(t)}},computed:{isBtnDisable:function(){return 3!==this.selectCateKeys.length},cateId:function(){return 3===this.selectCateKeys.length?this.selectCateKeys[2]:null},addTitleText:function(){return"many"===this.activeName?"添加动态参数":"添加静态属性"},addFormNameLabel:function(){return"many"===this.activeName?"参数名称":"属性名称"}}},l=s,o=(a("54f6"),a("2877")),c=Object(o["a"])(l,n,r,!1,null,"f56a6820",null);t["default"]=c.exports},"44e7":function(e,t,a){var n=a("861d"),r=a("c6b6"),i=a("b622"),s=i("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==r(e))}},"498a":function(e,t,a){"use strict";var n=a("23e7"),r=a("58a8").trim,i=a("c8d2");n({target:"String",proto:!0,forced:i("trim")},{trim:function(){return r(this)}})},"54f6":function(e,t,a){"use strict";var n=a("385e"),r=a.n(n);r.a},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var n=a("1d80"),r=a("5899"),i="["+r+"]",s=RegExp("^"+i+i+"*"),l=RegExp(i+i+"*$"),o=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(s,"")),2&e&&(a=a.replace(l,"")),a}};e.exports={start:o(1),end:o(2),trim:o(3)}},"8aa5":function(e,t,a){"use strict";var n=a("6547").charAt;e.exports=function(e,t,a){return t+(a?n(e,t).length:1)}},9263:function(e,t,a){"use strict";var n=a("ad6d"),r=a("9f7f"),i=RegExp.prototype.exec,s=String.prototype.replace,l=i,o=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=r.UNSUPPORTED_Y||r.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=o||u||c;d&&(l=function(e){var t,a,r,l,d=this,p=c&&d.sticky,f=n.call(d),m=d.source,g=0,b=e;return p&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),b=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(m="(?: "+m+")",b=" "+b,g++),a=new RegExp("^(?:"+m+")",f)),u&&(a=new RegExp("^"+m+"$(?!\\s)",f)),o&&(t=d.lastIndex),r=i.call(p?a:d,b),p?r?(r.input=r.input.slice(g),r[0]=r[0].slice(g),r.index=d.lastIndex,d.lastIndex+=r[0].length):d.lastIndex=0:o&&r&&(d.lastIndex=d.global?r.index+r[0].length:t),u&&r&&r.length>1&&s.call(r[0],a,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(r[l]=void 0)})),r}),e.exports=l},"9f7f":function(e,t,a){"use strict";var n=a("d039");function r(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=n((function(){var e=r("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=r("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},a434:function(e,t,a){"use strict";var n=a("23e7"),r=a("23cb"),i=a("a691"),s=a("50c4"),l=a("7b0b"),o=a("65f0"),c=a("8418"),u=a("1dde"),d=a("ae40"),p=u("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,g=Math.min,b=9007199254740991,h="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!p||!f},{splice:function(e,t){var a,n,u,d,p,f,v=l(this),x=s(v.length),y=r(e,x),w=arguments.length;if(0===w?a=n=0:1===w?(a=0,n=x-y):(a=w-2,n=g(m(i(t),0),x-y)),x+a-n>b)throw TypeError(h);for(u=o(v,n),d=0;d<n;d++)p=y+d,p in v&&c(u,d,v[p]);if(u.length=n,a<n){for(d=y;d<x-n;d++)p=d+n,f=d+a,p in v?v[f]=v[p]:delete v[f];for(d=x;d>x-n+a;d--)delete v[d-1]}else if(a>n)for(d=x-n;d>y;d--)p=d+n-1,f=d+a-1,p in v?v[f]=v[p]:delete v[f];for(d=0;d<a;d++)v[d+y]=arguments[d+2];return v.length=x-n+a,u}})},ac1f:function(e,t,a){"use strict";var n=a("23e7"),r=a("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},c8d2:function(e,t,a){var n=a("d039"),r=a("5899"),i="​᠎";e.exports=function(e){return n((function(){return!!r[e]()||i[e]()!=i||r[e].name!==e}))}},d784:function(e,t,a){"use strict";a("ac1f");var n=a("6eeb"),r=a("d039"),i=a("b622"),s=a("9263"),l=a("9112"),o=i("species"),c=!r((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=i("replace"),p=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),f=!r((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));e.exports=function(e,t,a,d){var m=i(e),g=!r((function(){var t={};return t[m]=function(){return 7},7!=""[e](t)})),b=g&&!r((function(){var t=!1,a=/a/;return"split"===e&&(a={},a.constructor={},a.constructor[o]=function(){return a},a.flags="",a[m]=/./[m]),a.exec=function(){return t=!0,null},a[m](""),!t}));if(!g||!b||"replace"===e&&(!c||!u||p)||"split"===e&&!f){var h=/./[m],v=a(m,""[e],(function(e,t,a,n,r){return t.exec===s?g&&!r?{done:!0,value:h.call(t,a,n)}:{done:!0,value:e.call(a,t,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),x=v[0],y=v[1];n(String.prototype,e,x),n(RegExp.prototype,m,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}d&&l(RegExp.prototype[m],"sham",!0)}}}]);
//# sourceMappingURL=chunk-ccfb0d8a.a358ed5d.js.map