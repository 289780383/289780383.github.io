mxCodecRegistry.register(function(){var t=new mxObjectCodec(new mxGraphView);return t.encode=function(t,e){return this.encodeCell(t,e,e.graph.getModel().getRoot())},t.encodeCell=function(t,e,r){var l=e.graph.getModel(),n=e.getState(r),u=l.getParent(r);if(null==u||null!=n){var o=l.getChildCount(r),a=e.graph.getCellGeometry(r),i=null;if(u==l.getRoot()?i="layer":null==u?i="graph":l.isEdge(r)?i="edge":o>0&&null!=a?i="group":l.isVertex(r)&&(i="vertex"),null!=i){var h=t.document.createElement(i);if(null!=e.graph.getLabel(r)&&(h.setAttribute("label",e.graph.getLabel(r)),e.graph.isHtmlLabel(r)&&h.setAttribute("html",!0)),null==u){var d=e.getGraphBounds();null!=d&&(h.setAttribute("x",Math.round(d.x)),h.setAttribute("y",Math.round(d.y)),h.setAttribute("width",Math.round(d.width)),h.setAttribute("height",Math.round(d.height))),h.setAttribute("scale",e.scale)}else if(null!=n&&null!=a){for(var s in n.style){var g=n.style[s];"function"==typeof g&&"object"==typeof g&&(g=mxStyleRegistry.getName(g)),null!=g&&"function"!=typeof g&&"object"!=typeof g&&h.setAttribute(s,g)}var b=n.absolutePoints;if(null!=b&&b.length>0){var y=Math.round(b[0].x)+","+Math.round(b[0].y);for(s=1;s<b.length;s++)y+=" "+Math.round(b[s].x)+","+Math.round(b[s].y);h.setAttribute("points",y)}else h.setAttribute("x",Math.round(n.x)),h.setAttribute("y",Math.round(n.y)),h.setAttribute("width",Math.round(n.width)),h.setAttribute("height",Math.round(n.height));var f=n.absoluteOffset;null!=f&&(0!=f.x&&h.setAttribute("dx",Math.round(f.x)),0!=f.y&&h.setAttribute("dy",Math.round(f.y)))}for(s=0;s<o;s++){var c=this.encodeCell(t,e,l.getChildAt(r,s));null!=c&&h.appendChild(c)}}}return h},t}());