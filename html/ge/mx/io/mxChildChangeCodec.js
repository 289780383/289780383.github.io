mxCodecRegistry.register(function(){var e=new mxObjectCodec(new mxChildChange,["model","child","previousIndex"],["parent","previous"]);return e.isReference=function(e,i,n,t){return!("child"!=i||t&&!e.model.contains(e.previous))||mxUtils.indexOf(this.idrefs,i)>=0},e.isExcluded=function(e,i,n,t){return mxObjectCodec.prototype.isExcluded.apply(this,arguments)||t&&null!=n&&("previous"==i||"parent"==i)&&!e.model.contains(n)},e.afterEncode=function(e,i,n){return this.isReference(i,"child",i.child,!0)?n.setAttribute("child",e.getId(i.child)):e.encodeCell(i.child,n),n},e.beforeDecode=function(e,i,n){if(null!=i.firstChild&&i.firstChild.nodeType==mxConstants.NODETYPE_ELEMENT){var t=(i=i.cloneNode(!0)).firstChild;n.child=e.decodeCell(t,!1);var r=t.nextSibling;for(t.parentNode.removeChild(t),t=r;null!=t;){if(r=t.nextSibling,t.nodeType==mxConstants.NODETYPE_ELEMENT){var l=t.getAttribute("id");null==e.lookup(l)&&e.decodeCell(t)}t.parentNode.removeChild(t),t=r}}else{var d=i.getAttribute("child");n.child=e.getObject(d)}return i},e.afterDecode=function(e,i,n){return null!=n.child&&(null!=n.child.parent&&null!=n.previous&&n.child.parent!=n.previous&&(n.previous=n.child.parent),n.child.parent=n.previous,n.previous=n.parent,n.previousIndex=n.index),n},e}());