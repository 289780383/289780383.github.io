function mxRadialTreeLayout(t){mxCompactTreeLayout.call(this,t,!1)}mxUtils.extend(mxRadialTreeLayout,mxCompactTreeLayout),mxRadialTreeLayout.prototype.angleOffset=.5,mxRadialTreeLayout.prototype.rootx=0,mxRadialTreeLayout.prototype.rooty=0,mxRadialTreeLayout.prototype.levelDistance=120,mxRadialTreeLayout.prototype.nodeDistance=10,mxRadialTreeLayout.prototype.autoRadius=!1,mxRadialTreeLayout.prototype.sortEdges=!1,mxRadialTreeLayout.prototype.rowMinX=[],mxRadialTreeLayout.prototype.rowMaxX=[],mxRadialTreeLayout.prototype.rowMinCenX=[],mxRadialTreeLayout.prototype.rowMaxCenX=[],mxRadialTreeLayout.prototype.rowRadi=[],mxRadialTreeLayout.prototype.row=[],mxRadialTreeLayout.prototype.isVertexIgnored=function(t){return mxGraphLayout.prototype.isVertexIgnored.apply(this,arguments)||0==this.graph.getConnections(t).length},mxRadialTreeLayout.prototype.execute=function(t,e){this.parent=t,this.useBoundingBox=!1,this.edgeRouting=!1,mxCompactTreeLayout.prototype.execute.apply(this,arguments);var o=null,i=this.getVertexBounds(this.root);for(var a in this.centerX=i.x+i.width/2,this.centerY=i.y+i.height/2,this.visited){var r=this.getVertexBounds(this.visited[a]);(o=null!=o?o:r.clone()).add(r)}this.calcRowDims([this.node],0);for(var h=0,s=0,n=0;n<this.row.length;n++){var l=(this.centerX-this.rowMinX[n]-this.nodeDistance)/this.rowRadi[n],x=(this.rowMaxX[n]-this.centerX-this.nodeDistance)/this.rowRadi[n];h=Math.max(h,l),s=Math.max(s,x)}for(n=0;n<this.row.length;n++)for(var d=this.centerX-this.nodeDistance-h*this.rowRadi[n],u=this.centerX+this.nodeDistance+s*this.rowRadi[n]-d,w=0;w<this.row[n].length;w++){var p=(m=this.row[n])[w],y=((r=this.getVertexBounds(p.cell)).x+r.width/2-d)/u,c=2*Math.PI*y;p.theta=c}for(n=this.row.length-2;n>=0;n--){var m=this.row[n];for(w=0;w<m.length;w++){for(var M=(p=m[w]).child,R=0,g=0;null!=M;)g+=M.theta,R++,M=M.next;if(R>0){var X=g/R;if(X>p.theta&&w<m.length-1){var L=m[w+1].theta;p.theta=Math.min(X,L-Math.PI/10)}else if(X<p.theta&&w>0){var f=m[w-1].theta;p.theta=Math.max(X,f+Math.PI/10)}}}}for(n=0;n<this.row.length;n++)for(w=0;w<this.row[n].length;w++){p=(m=this.row[n])[w],r=this.getVertexBounds(p.cell);this.setVertexLocation(p.cell,this.centerX-r.width/2+this.rowRadi[n]*Math.cos(p.theta),this.centerY-r.height/2+this.rowRadi[n]*Math.sin(p.theta))}},mxRadialTreeLayout.prototype.calcRowDims=function(t,e){if(null!=t&&0!=t.length){this.rowMinX[e]=this.centerX,this.rowMaxX[e]=this.centerX,this.rowMinCenX[e]=this.centerX,this.rowMaxCenX[e]=this.centerX,this.row[e]=[];for(var o=!1,i=0;i<t.length;i++)for(var a=null!=t[i]?t[i].child:null;null!=a;){var r=a.cell,h=this.getVertexBounds(r);this.rowMinX[e]=Math.min(h.x,this.rowMinX[e]),this.rowMaxX[e]=Math.max(h.x+h.width,this.rowMaxX[e]),this.rowMinCenX[e]=Math.min(h.x+h.width/2,this.rowMinCenX[e]),this.rowMaxCenX[e]=Math.max(h.x+h.width/2,this.rowMaxCenX[e]),this.rowRadi[e]=h.y-this.getVertexBounds(this.root).y,null!=a.child&&(o=!0),this.row[e].push(a),a=a.next}o&&this.calcRowDims(this.row[e],e+1)}};