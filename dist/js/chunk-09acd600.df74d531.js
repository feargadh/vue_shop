(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09acd600"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("d3b7"),r("e6cf");function a(t,e,r,a,n,i,o){try{var s=t[i](o),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(a,n)}function n(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var o=t.apply(e,r);function s(t){a(o,n,i,s,c,"next",t)}function c(t){a(o,n,i,s,c,"throw",t)}s(void 0)}))}}},"7f6a":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/Home"}}},[t._v("首页")]),r("el-breadcrumb-item",[t._v("商品管理")]),r("el-breadcrumb-item",[t._v("商品分类")])],1),r("el-card",[r("el-row",[r("el-col",{attrs:{span:1}},[r("el-button",{attrs:{type:"primary"},on:{click:t.showAddCateDialog}},[t._v("添加分类")])],1)],1),r("tree-table",{attrs:{data:t.cateList,columns:t.columns,"selection-type":!1,"expand-type":!1,"show-index":!0,"index-text":"#",border:!0,"show-row-hover":!1},scopedSlots:t._u([{key:"isOk",fn:function(t){return[t.row.cat_deleted?r("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}}):r("i",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}})]}},{key:"order",fn:function(e){return[0===e.row.cat_level?r("el-tag",{attrs:{size:"mini"}},[t._v("一级")]):t._e(),1===e.row.cat_level?r("el-tag",{attrs:{type:"success",size:"mini"}},[t._v("二级")]):t._e(),2===e.row.cat_level?r("el-tag",{attrs:{type:"warning",size:"mini"}},[t._v("三级")]):t._e()]}},{key:"opt",fn:function(e){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(r){return t.showEditDialog(e.row.cat_id)}}},[t._v("编辑")]),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(r){return t.removeCate(e.row.cat_id)}}},[t._v("删除")])]}}])}),r("el-pagination",{attrs:{"current-page":t.queryInfo.pagenum,"page-sizes":[5,10,15,20],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),r("el-dialog",{attrs:{title:"添加分类",visible:t.addCateVisible,width:"50%"},on:{"update:visible":function(e){t.addCateVisible=e},close:t.addCateDialogClosed}},[r("el-form",{ref:"addCateFormRef",staticClass:"demo-ruleForm",attrs:{model:t.addCateForm,"label-width":"100px",rules:t.addCateFormRules}},[r("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[r("el-input",{model:{value:t.addCateForm.cat_name,callback:function(e){t.$set(t.addCateForm,"cat_name",e)},expression:"addCateForm.cat_name"}})],1),r("el-form-item",{attrs:{label:"父级分类"}},[r("el-cascader",{attrs:{"props.expandTrigger":"hover",options:t.parentsCateList,props:t.cascaderProps,clearable:""},on:{change:t.parentsCateChanged},model:{value:t.selectKeys,callback:function(e){t.selectKeys=e},expression:"selectKeys"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.addCateVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.addCate}},[t._v("确 定")])],1)],1),r("el-dialog",{attrs:{title:"编辑分类",visible:t.editCateDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editCateDialogVisible=e},close:t.editCateDialogClosed}},[r("el-form",{ref:"editCateFormRef",staticClass:"demo-ruleForm",attrs:{model:t.editCateForm,rules:t.addCateFormRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"活动名称",prop:"cat_name"}},[r("el-input",{model:{value:t.editCateForm.cat_name,callback:function(e){t.$set(t.editCateForm,"cat_name",e)},expression:"editCateForm.cat_name"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.editCateDialogVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.editCate}},[t._v("确 定")])],1)],1)],1)},n=[],i=(r("96cf"),r("1da1")),o={data:function(){return{queryInfo:{type:3,pagenum:1,pagesize:5},cateList:[],total:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",type:"template",template:"isOk"},{label:"排序",type:"template",template:"order"},{label:"操作",type:"template",template:"opt"}],addCateVisible:!1,addCateForm:{cat_name:"",cat_pid:0,cat_level:0},addCateFormRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},parentsCateList:[],cascaderProps:{value:"cat_id",label:"cat_name",children:"children",expandTrigger:"hover",checkStrictly:!0},selectKeys:[],editCateDialogVisible:!1,editCateForm:{}}},created:function(){this.getCateList()},methods:{getCateList:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("categories",{params:t.queryInfo});case 2:if(r=e.sent,a=r.data,200===a.meta.status){e.next=6;break}return e.abrupt("return",t.$message.error("获取分类列表失败"));case 6:t.cateList=a.data.result,t.total=a.data.total;case 8:case"end":return e.stop()}}),e)})))()},handleSizeChange:function(t){this.queryInfo.pagesize=t,this.getCateList()},handleCurrentChange:function(t){this.queryInfo.pagenum=t,this.getCateList()},showAddCateDialog:function(){this.getParentsCateList(),this.addCateVisible=!0},getParentsCateList:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("categories",{params:{type:2}});case 2:if(r=e.sent,a=r.data,200===a.meta.status){e.next=6;break}return e.abrupt("return",t.$message.error("获取父级分类失败"));case 6:t.parentsCateList=a.data;case 7:case"end":return e.stop()}}),e)})))()},parentsCateChanged:function(){if(this.selectKeys.length>0)return this.addCateForm.cat_pid=this.selectKeys[this.selectKeys.length-1],void(this.addCateForm.cat_level=this.selectKeys.length);this.addCateForm.cat_pid=0,this.addCateForm.cat_level=0},addCate:function(){var t=this;this.$refs.addCateFormRef.validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.$http.post("categories",t.addCateForm);case 4:if(a=e.sent,n=a.data,201===n.meta.status){e.next=8;break}return e.abrupt("return",t.$message.error("添加分类失败"));case 8:t.$message.success("添加分类成功"),t.addCateVisible=!1,t.getCateList();case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},addCateDialogClosed:function(){this.$refs.addCateFormRef.resetFields(),this.selectKeys=[],this.addCateForm.cat_level=0,this.addCateForm.cat_pid=0},showEditDialog:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.get("categories/"+t);case 2:if(a=r.sent,n=a.data,200===n.meta.status){r.next=6;break}return r.abrupt("return",e.$message.error("获取分类信息失败"));case 6:e.editCateForm=n.data,e.editCateDialogVisible=!0;case 8:case"end":return r.stop()}}),r)})))()},editCateDialogClosed:function(){this.$refs.editCateFormRef.resetFields(),this.editCateForm={}},editCate:function(){var t=this;this.$refs.editCateFormRef.validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.$http.put("categories/"+t.editCateForm.cat_id,{cat_name:t.editCateForm.cat_name});case 4:if(a=e.sent,n=a.data,200===n.meta.status){e.next=8;break}return e.abrupt("return",t.$message.error("修改分类失败"));case 8:t.$message.success("修改分类成功"),t.getCateList(),t.editCateDialogVisible=!1;case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},removeCate:function(t){var e=this;this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.delete("categories/"+t);case 2:if(a=r.sent,n=a.data,200===n.meta.status){r.next=6;break}return r.abrupt("return",e.$message.error("删除失败"));case 6:e.$message({type:"success",message:"删除成功!"}),e.getCateList(),e.editCateDialogVisible=!1;case 9:case"end":return r.stop()}}),r)})))).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}}},s=o,c=(r("9704"),r("2877")),u=Object(c["a"])(s,a,n,!1,null,"18b9fc0c",null);e["default"]=u.exports},8190:function(t,e,r){},"96cf":function(t,e,r){var a=function(t){"use strict";var e,r=Object.prototype,a=r.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},i=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",s=n.toStringTag||"@@toStringTag";function c(t,e,r,a){var n=e&&e.prototype instanceof m?e:m,i=Object.create(n.prototype),o=new $(a||[]);return i._invoke=L(t,r,o),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(a){return{type:"throw",arg:a}}}t.wrap=c;var l="suspendedStart",d="suspendedYield",h="executing",f="completed",p={};function m(){}function g(){}function v(){}var y={};y[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(R([])));w&&w!==r&&a.call(w,i)&&(y=w);var C=v.prototype=m.prototype=Object.create(y);function _(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function x(t,e){function r(n,i,o,s){var c=u(t[n],t,i);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"===typeof d&&a.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,o,s)}),(function(t){r("throw",t,o,s)})):e.resolve(d).then((function(t){l.value=t,o(l)}),(function(t){return r("throw",t,o,s)}))}s(c.arg)}var n;function i(t,a){function i(){return new e((function(e,n){r(t,a,e,n)}))}return n=n?n.then(i,i):i()}this._invoke=i}function L(t,e,r){var a=l;return function(n,i){if(a===h)throw new Error("Generator is already running");if(a===f){if("throw"===n)throw i;return O()}r.method=n,r.arg=i;while(1){var o=r.delegate;if(o){var s=k(o,r);if(s){if(s===p)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===l)throw a=f,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=h;var c=u(t,e,r);if("normal"===c.type){if(a=r.done?f:d,c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(a=f,r.method="throw",r.arg=c.arg)}}}function k(t,r){var a=t.iterator[r.method];if(a===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var n=u(a,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,p;var i=n.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function F(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(F,this),this.reset(!0)}function R(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){while(++n<t.length)if(a.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:O}}function O(){return{value:e,done:!0}}return g.prototype=C.constructor=v,v.constructor=g,v[s]=g.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(C),t},t.awrap=function(t){return{__await:t}},_(x.prototype),x.prototype[o]=function(){return this},t.AsyncIterator=x,t.async=function(e,r,a,n,i){void 0===i&&(i=Promise);var o=new x(c(e,r,a,n),i);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(C),C[s]="Generator",C[i]=function(){return this},C.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var a=e.pop();if(a in t)return r.value=a,r.done=!1,r}return r.done=!0,r}},t.values=R,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&a.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(a,n){return s.type="throw",s.arg=t,r.next=a,n&&(r.method="next",r.arg=e),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=a.call(o,"catchLoc"),u=a.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var a=r.completion;if("throw"===a.type){var n=a.arg;E(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,a){return this.delegate={iterator:R(t),resultName:r,nextLoc:a},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=a}catch(n){Function("r","regeneratorRuntime = r")(a)}},9704:function(t,e,r){"use strict";var a=r("8190"),n=r.n(a);n.a}}]);
//# sourceMappingURL=chunk-09acd600.df74d531.js.map