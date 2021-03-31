function mxHierarchicalLayout(t,e,i){mxGraphLayout.call(this,t),this.orientation=null!=e?e:mxConstants.DIRECTION_NORTH,this.deterministic=null==i||i}var mxHierarchicalEdgeStyle={ORTHOGONAL:1,POLYLINE:2,STRAIGHT:3,CURVE:4};mxHierarchicalLayout.prototype=new mxGraphLayout,mxHierarchicalLayout.prototype.constructor=mxHierarchicalLayout,mxHierarchicalLayout.prototype.roots=null,mxHierarchicalLayout.prototype.resizeParent=!1,mxHierarchicalLayout.prototype.maintainParentLocation=!1,mxHierarchicalLayout.prototype.moveParent=!1,mxHierarchicalLayout.prototype.parentBorder=0,mxHierarchicalLayout.prototype.intraCellSpacing=30,mxHierarchicalLayout.prototype.interRankCellSpacing=100,mxHierarchicalLayout.prototype.interHierarchySpacing=60,mxHierarchicalLayout.prototype.parallelEdgeSpacing=10,mxHierarchicalLayout.prototype.orientation=mxConstants.DIRECTION_NORTH,mxHierarchicalLayout.prototype.fineTuning=!0,mxHierarchicalLayout.prototype.tightenToSource=!0,mxHierarchicalLayout.prototype.disableEdgeStyle=!0,mxHierarchicalLayout.prototype.traverseAncestors=!0,mxHierarchicalLayout.prototype.model=null,mxHierarchicalLayout.prototype.edgesCache=null,mxHierarchicalLayout.prototype.edgeSourceTermCache=null,mxHierarchicalLayout.prototype.edgesTargetTermCache=null,mxHierarchicalLayout.prototype.edgeStyle=mxHierarchicalEdgeStyle.POLYLINE,mxHierarchicalLayout.prototype.getModel=function(){return this.model},mxHierarchicalLayout.prototype.execute=function(t,e){this.parent=t;var i=this.graph.model;if(this.edgesCache=new mxDictionary,this.edgeSourceTermCache=new mxDictionary,this.edgesTargetTermCache=new mxDictionary,null==e||e instanceof Array||(e=[e]),null!=e||null!=t){if(this.parentX=null,this.parentY=null,t!=this.root&&null!=i.isVertex(t)&&this.maintainParentLocation)null!=(l=this.graph.getCellGeometry(t))&&(this.parentX=l.x,this.parentY=l.y);if(null!=e){for(var r=[],a=0;a<e.length;a++){(null==t||i.isAncestor(t,e[a]))&&i.isVertex(e[a])&&r.push(e[a])}this.roots=r}i.beginUpdate();try{var l;if(this.run(t),this.resizeParent&&!this.graph.isCellCollapsed(t)&&this.graph.updateGroupBounds([t],this.parentBorder,this.moveParent),null!=this.parentX&&null!=this.parentY)null!=(l=this.graph.getCellGeometry(t))&&((l=l.clone()).x=this.parentX,l.y=this.parentY,i.setGeometry(t,l))}finally{i.endUpdate()}}},mxHierarchicalLayout.prototype.findRoots=function(t,e){var i=[];if(null!=t&&null!=e){var r=this.graph.model,a=null,l=-1e5;for(var n in e){var o=e[n];if(r.isVertex(o)&&this.graph.isCellVisible(o)){for(var s=this.getEdges(o),h=0,c=0,u=0;u<s.length;u++){this.getVisibleTerminal(s[u],!0)==o?h++:c++}0==c&&h>0&&i.push(o);var p=h-c;p>l&&(l=p,a=o)}}0==i.length&&null!=a&&i.push(a)}return i},mxHierarchicalLayout.prototype.getEdges=function(t){var e=this.edgesCache.get(t);if(null!=e)return e;for(var i=this.graph.model,r=[],a=this.graph.isCellCollapsed(t),l=i.getChildCount(t),n=0;n<l;n++){var o=i.getChildAt(t,n);this.isPort(o)?r=r.concat(i.getEdges(o,!0,!0)):!a&&this.graph.isCellVisible(o)||(r=r.concat(i.getEdges(o,!0,!0)))}r=r.concat(i.getEdges(t,!0,!0));var s=[];for(n=0;n<r.length;n++){var h=this.getVisibleTerminal(r[n],!0),c=this.getVisibleTerminal(r[n],!1);(h==c||h!=c&&(c==t&&(null==this.parent||this.isAncestor(this.parent,h,this.traverseAncestors))||h==t&&(null==this.parent||this.isAncestor(this.parent,c,this.traverseAncestors))))&&s.push(r[n])}return this.edgesCache.put(t,s),s},mxHierarchicalLayout.prototype.getVisibleTerminal=function(t,e){var i=this.edgesTargetTermCache;e&&(i=this.edgeSourceTermCache);var r=i.get(t);if(null!=r)return r;var a=this.graph.view.getState(t),l=null!=a?a.getVisibleTerminal(e):this.graph.view.getVisibleTerminal(t,e);return null==l&&(l=null!=a?a.getVisibleTerminal(e):this.graph.view.getVisibleTerminal(t,e)),null!=l&&(this.isPort(l)&&(l=this.graph.model.getParent(l)),i.put(t,l)),l},mxHierarchicalLayout.prototype.run=function(t){var e=[],i=[];if(null==this.roots&&null!=t){var r=Object();this.filterDescendants(t,r),this.roots=[];var a=!0;for(var l in r)if(null!=r[l]){a=!1;break}for(;!a;){for(var n=this.findRoots(t,r),o=0;o<n.length;o++){var s=Object();e.push(s),this.traverse(n[o],!0,null,i,s,e,r)}for(o=0;o<n.length;o++)this.roots.push(n[o]);for(var l in a=!0,r)if(null!=r[l]){a=!1;break}}}else for(o=0;o<this.roots.length;o++){s=Object();e.push(s),this.traverse(this.roots[o],!0,null,i,s,e,null)}var h=0;for(o=0;o<e.length;o++){s=e[o];var c=[];for(var l in s)c.push(s[l]);this.model=new mxGraphHierarchyModel(this,c,this.roots,t,this.tightenToSource),this.cycleStage(t),this.layeringStage(),this.crossingStage(t),h=this.placementStage(h,t)}},mxHierarchicalLayout.prototype.filterDescendants=function(t,e){var i=this.graph.model;if(i.isVertex(t)&&t!=this.parent&&this.graph.isCellVisible(t)&&(e[mxObjectIdentity.get(t)]=t),this.traverseAncestors||t==this.parent&&this.graph.isCellVisible(t))for(var r=i.getChildCount(t),a=0;a<r;a++){var l=i.getChildAt(t,a);this.isPort(l)||this.filterDescendants(l,e)}},mxHierarchicalLayout.prototype.isPort=function(t){return null!=t&&null!=t.geometry&&t.geometry.relative},mxHierarchicalLayout.prototype.getEdgesBetween=function(t,e,i){i=null!=i&&i;for(var r=this.getEdges(t),a=[],l=0;l<r.length;l++){var n=this.getVisibleTerminal(r[l],!0),o=this.getVisibleTerminal(r[l],!1);(n==t&&o==e||!i&&n==e&&o==t)&&a.push(r[l])}return a},mxHierarchicalLayout.prototype.traverse=function(t,e,i,r,a,l,n){if(null!=t&&null!=r){var o=mxObjectIdentity.get(t);if(null!=r[o]||null!=n&&null==n[o]){if(null==a[o])for(p=0;p<l.length;p++){var s=l[p];if(null!=s[o]){for(var h in s)a[h]=s[h];return l.splice(p,1),a}}}else{null==a[o]&&(a[o]=t),null==r[o]&&(r[o]=t),null!==n&&delete n[o];for(var c=this.getEdges(t),u=[],p=0;p<c.length;p++)u[p]=this.getVisibleTerminal(c[p],!0)==t;for(var p=0;p<c.length;p++)if(!e||u[p]){for(var g=this.getVisibleTerminal(c[p],!u[p]),y=1,m=0;m<c.length;m++)if(m!=p){var f=u[m];this.getVisibleTerminal(c[m],!f)==g&&(f?y++:y--)}y>=0&&(a=this.traverse(g,e,c[p],r,a,l,n))}}}return a},mxHierarchicalLayout.prototype.cycleStage=function(t){new mxMinimumCycleRemover(this).execute(t)},mxHierarchicalLayout.prototype.layeringStage=function(){this.model.initialRank(),this.model.fixRanks()},mxHierarchicalLayout.prototype.crossingStage=function(t){new mxMedianHybridCrossingReduction(this).execute(t)},mxHierarchicalLayout.prototype.placementStage=function(t,e){var i=new mxCoordinateAssignment(this,this.intraCellSpacing,this.interRankCellSpacing,this.orientation,t,this.parallelEdgeSpacing);return i.fineTuning=this.fineTuning,i.execute(e),i.limitX+this.interHierarchySpacing};