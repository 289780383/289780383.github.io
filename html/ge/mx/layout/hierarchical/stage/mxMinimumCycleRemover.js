function mxMinimumCycleRemover(e){this.layout=e}mxMinimumCycleRemover.prototype=new mxHierarchicalLayoutStage,mxMinimumCycleRemover.prototype.constructor=mxMinimumCycleRemover,mxMinimumCycleRemover.prototype.layout=null,mxMinimumCycleRemover.prototype.execute=function(e){for(var t=this.layout.getModel(),o=new Object,n=t.vertexMapper.getValues(),r=new Object,c=0;c<n.length;c++)r[n[c].id]=n[c];var i=null;if(null!=t.roots){var s=t.roots;i=[];for(c=0;c<s.length;c++)i[c]=t.vertexMapper.get(s[c])}t.visit(function(e,t,n,c,i){t.isAncestor(e)&&(n.invert(),mxUtils.remove(n,e.connectsAsSource),e.connectsAsTarget.push(n),mxUtils.remove(n,t.connectsAsTarget),t.connectsAsSource.push(n)),o[t.id]=t,delete r[t.id]},i,!0,null);var m=mxUtils.clone(o,null,!0);t.visit(function(e,t,n,c,i){t.isAncestor(e)&&(n.invert(),mxUtils.remove(n,e.connectsAsSource),t.connectsAsSource.push(n),e.connectsAsTarget.push(n),mxUtils.remove(n,t.connectsAsTarget)),o[t.id]=t,delete r[t.id]},r,!0,m)};