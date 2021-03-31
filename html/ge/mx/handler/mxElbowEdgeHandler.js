function mxElbowEdgeHandler(t){mxEdgeHandler.call(this,t)}mxUtils.extend(mxElbowEdgeHandler,mxEdgeHandler),mxElbowEdgeHandler.prototype.flipEnabled=!0,mxElbowEdgeHandler.prototype.doubleClickOrientationResource="none"!=GE.language?"doubleClickOrientation":"",mxElbowEdgeHandler.prototype.createBends=function(){var t=[],e=this.createHandleShape(0);return this.initBend(e),e.setCursor(mxConstants.CURSOR_TERMINAL_HANDLE),t.push(e),t.push(this.createVirtualBend(mxUtils.bind(this,function(t){!mxEvent.isConsumed(t)&&this.flipEnabled&&(this.graph.flipEdge(this.state.cell,t),mxEvent.consume(t))}))),this.points.push(new mxPoint(0,0)),e=this.createHandleShape(2),this.initBend(e),e.setCursor(mxConstants.CURSOR_TERMINAL_HANDLE),t.push(e),t},mxElbowEdgeHandler.prototype.createVirtualBend=function(t){var e=this.createHandleShape();return this.initBend(e,t),e.setCursor(this.getCursorForBend()),this.graph.isCellBendable(this.state.cell)||(e.node.style.display="none"),e},mxElbowEdgeHandler.prototype.getCursorForBend=function(){return this.state.style[mxConstants.STYLE_EDGE]==mxEdgeStyle.TopToBottom||this.state.style[mxConstants.STYLE_EDGE]==mxConstants.EDGESTYLE_TOPTOBOTTOM||(this.state.style[mxConstants.STYLE_EDGE]==mxEdgeStyle.ElbowConnector||this.state.style[mxConstants.STYLE_EDGE]==mxConstants.EDGESTYLE_ELBOW)&&this.state.style[mxConstants.STYLE_ELBOW]==mxConstants.ELBOW_VERTICAL?"row-resize":"col-resize"},mxElbowEdgeHandler.prototype.getTooltipForNode=function(t){var e=null;return null==this.bends||null==this.bends[1]||t!=this.bends[1].node&&t.parentNode!=this.bends[1].node||(e=this.doubleClickOrientationResource,e=mxResources.get(e)||e),e},mxElbowEdgeHandler.prototype.convertPoint=function(t,e){var n=this.graph.getView().getScale(),s=this.graph.getView().getTranslate(),a=this.state.origin;return e&&(t.x=this.graph.snap(t.x),t.y=this.graph.snap(t.y)),t.x=Math.round(t.x/n-s.x-a.x),t.y=Math.round(t.y/n-s.y-a.y),t},mxElbowEdgeHandler.prototype.redrawInnerBends=function(t,e){var n=this.graph.getModel().getGeometry(this.state.cell),s=this.state.absolutePoints,a=null;s.length>1?(t=s[1],e=s[s.length-2]):null!=n.points&&n.points.length>0&&(a=s[0]),a=null==a?new mxPoint(t.x+(e.x-t.x)/2,t.y+(e.y-t.y)/2):new mxPoint(this.graph.getView().scale*(a.x+this.graph.getView().translate.x+this.state.origin.x),this.graph.getView().scale*(a.y+this.graph.getView().translate.y+this.state.origin.y));var i=this.bends[1].bounds,o=i.width,l=i.height,r=new mxRectangle(Math.round(a.x-o/2),Math.round(a.y-l/2),o,l);this.manageLabelHandle?this.checkLabelHandle(r):null==this.handleImage&&this.labelShape.visible&&mxUtils.intersects(r,this.labelShape.bounds)&&(o=mxConstants.HANDLE_SIZE+3,l=mxConstants.HANDLE_SIZE+3,r=new mxRectangle(Math.floor(a.x-o/2),Math.floor(a.y-l/2),o,l)),this.bends[1].bounds=r,this.bends[1].redraw(),this.manageLabelHandle&&this.checkLabelHandle(this.bends[1].bounds)};