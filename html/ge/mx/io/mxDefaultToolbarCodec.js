var mxDefaultToolbarCodec=mxCodecRegistry.register(function(){var e=new mxObjectCodec(new mxDefaultToolbar);return e.encode=function(e,t){return null},e.decode=function(e,t,l){if(null!=l){var n=l.editor;for(t=t.firstChild;null!=t;){if(t.nodeType==mxConstants.NODETYPE_ELEMENT&&!this.processInclude(e,t,l))if("separator"==t.nodeName)l.addSeparator();else if("br"==t.nodeName)l.toolbar.addBreak();else if("hr"==t.nodeName)l.toolbar.addLine();else if("add"==t.nodeName){var a=t.getAttribute("as");a=mxResources.get(a)||a;var o=t.getAttribute("icon"),r=t.getAttribute("pressedIcon"),i=t.getAttribute("action"),d=t.getAttribute("mode"),u=t.getAttribute("template"),s="0"!=t.getAttribute("toggle"),m=mxUtils.getTextContent(t),g=null;if(null!=i)g=l.addItem(a,o,i,r);else if(null!=d){var c=mxDefaultToolbarCodec.allowEval?mxUtils.eval(m):null;g=l.addMode(a,o,d,r,c)}else if(null!=u||null!=m&&m.length>0){var f=n.templates[u],b=t.getAttribute("style");null!=f&&null!=b&&(f=n.graph.cloneCell(f)).setStyle(b);var v=null;null!=m&&m.length>0&&mxDefaultToolbarCodec.allowEval&&(v=mxUtils.eval(m)),g=l.addPrototype(a,o,f,r,v,s)}else{var x=mxUtils.getChildNodes(t);if(x.length>0)if(null==o)for(var p=l.addActionCombo(a),A=0;A<x.length;A++){if("separator"==(N=x[A]).nodeName)l.addOption(p,"---");else if("add"==N.nodeName){var C=N.getAttribute("as"),h=N.getAttribute("action");l.addActionOption(p,C,h)}}else{var y=null,E=l.addPrototype(a,o,function(){var e=n.templates[y.value];if(null!=e){var t=e.clone(),l=y.options[y.selectedIndex].cellStyle;return null!=l&&t.setStyle(l),t}return mxLog.warn("Template "+e+" not found"),null},null,null,s);y=l.addCombo(),mxEvent.addListener(y,"change",function(){l.toolbar.selectMode(E,function(e){var t=mxUtils.convertPoint(n.graph.container,mxEvent.getClientX(e),mxEvent.getClientY(e));return n.addVertex(null,c(),t.x,t.y)}),l.toolbar.noReset=!1});for(A=0;A<x.length;A++){var N;if("separator"==(N=x[A]).nodeName)l.addOption(y,"---");else if("add"==N.nodeName){C=N.getAttribute("as");var T=N.getAttribute("template");l.addOption(y,C,T||u).cellStyle=N.getAttribute("style")}}}}if(null!=g){var w=t.getAttribute("id");null!=w&&w.length>0&&g.setAttribute("id",w)}}t=t.nextSibling}}return l},e}());mxDefaultToolbarCodec.allowEval=!0;