function mxConstraintHandler(t){this.graph=t,this.resetHandler=mxUtils.bind(this,function(t,n){null!=this.currentFocus&&null==this.graph.view.getState(this.currentFocus.cell)?this.reset():this.redraw()}),this.graph.model.addListener(mxEvent.CHANGE,this.resetHandler),this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE,this.resetHandler),this.graph.view.addListener(mxEvent.TRANSLATE,this.resetHandler),this.graph.view.addListener(mxEvent.SCALE,this.resetHandler),this.graph.addListener(mxEvent.ROOT,this.resetHandler)}mxConstraintHandler.prototype.pointImage=new mxImage(GE.imageBasePath+"/point.gif",5,5),mxConstraintHandler.prototype.graph=null,mxConstraintHandler.prototype.enabled=!0,mxConstraintHandler.prototype.highlightColor=mxConstants.DEFAULT_VALID_COLOR,mxConstraintHandler.prototype.isEnabled=function(){return this.enabled},mxConstraintHandler.prototype.setEnabled=function(t){this.enabled=t},mxConstraintHandler.prototype.reset=function(){if(null!=this.focusIcons){for(var t=0;t<this.focusIcons.length;t++)this.focusIcons[t].destroy();this.focusIcons=null}null!=this.focusHighlight&&(this.focusHighlight.destroy(),this.focusHighlight=null),this.currentConstraint=null,this.currentFocusArea=null,this.currentPoint=null,this.currentFocus=null,this.focusPoints=null},mxConstraintHandler.prototype.getTolerance=function(t){return this.graph.getTolerance()},mxConstraintHandler.prototype.getImageForConstraint=function(t,n,e){return this.pointImage},mxConstraintHandler.prototype.isEventIgnored=function(t,n){return!1},mxConstraintHandler.prototype.isStateIgnored=function(t,n){return!1},mxConstraintHandler.prototype.destroyIcons=function(){if(null!=this.focusIcons){for(var t=0;t<this.focusIcons.length;t++)this.focusIcons[t].destroy();this.focusIcons=null,this.focusPoints=null}},mxConstraintHandler.prototype.destroyFocusHighlight=function(){null!=this.focusHighlight&&(this.focusHighlight.destroy(),this.focusHighlight=null)},mxConstraintHandler.prototype.isKeepFocusEvent=function(t){return mxEvent.isShiftDown(t.getEvent())},mxConstraintHandler.prototype.getCellForEvent=function(t,n){var e=t.getCell();if(null!=e||null==n||t.getGraphX()==n.x&&t.getGraphY()==n.y||(e=this.graph.getCellAt(n.x,n.y)),null!=e&&!this.graph.isCellConnectable(e)){var s=this.graph.getModel().getParent(e);this.graph.getModel().isVertex(s)&&this.graph.isCellConnectable(s)&&(e=s)}return this.graph.isCellLocked(e)?null:e},mxConstraintHandler.prototype.update=function(t,n,e,s){if(this.isEnabled()&&!this.isEventIgnored(t)){null==this.mouseleaveHandler&&null!=this.graph.container&&(this.mouseleaveHandler=mxUtils.bind(this,function(){this.reset()}),mxEvent.addListener(this.graph.container,"mouseleave",this.resetHandler));var i=this.getTolerance(t),r=null!=s?s.x:t.getGraphX(),o=null!=s?s.y:t.getGraphY(),h=new mxRectangle(r-i,o-i,2*i,2*i),l=new mxRectangle(t.getGraphX()-i,t.getGraphY()-i,2*i,2*i),a=this.graph.view.getState(this.getCellForEvent(t,s));this.isKeepFocusEvent(t)||null!=this.currentFocusArea&&null!=this.currentFocus&&null==a&&this.graph.getModel().isVertex(this.currentFocus.cell)&&mxUtils.intersects(this.currentFocusArea,l)||a==this.currentFocus||(this.currentFocusArea=null,this.currentFocus=null,this.setFocus(t,a,n)),this.currentConstraint=null,this.currentPoint=null;var u=null;if(null!=this.focusIcons&&null!=this.constraints&&(null==a||this.currentFocus==a))for(var c=l.getCenterX(),g=l.getCenterY(),d=0;d<this.focusIcons.length;d++){var p=c-this.focusIcons[d].bounds.getCenterX(),f=g-this.focusIcons[d].bounds.getCenterY(),m=p*p+f*f;if((this.intersects(this.focusIcons[d],l,n,e)||null!=s&&this.intersects(this.focusIcons[d],h,n,e))&&(null==u||m<u)){if(this.currentConstraint=this.constraints[d],this.currentPoint=this.focusPoints[d],u=m,(m=this.focusIcons[d].bounds.clone()).grow(mxConstants.HIGHLIGHT_SIZE+1),m.width-=1,m.height-=1,null==this.focusHighlight){var C=this.createHighlightShape();C.dialect=this.graph.dialect==mxConstants.DIALECT_SVG?mxConstants.DIALECT_SVG:mxConstants.DIALECT_VML,C.pointerEvents=!1,C.init(this.graph.getView().getOverlayPane()),this.focusHighlight=C;var x=mxUtils.bind(this,function(){return null!=this.currentFocus?this.currentFocus:a});mxEvent.redirectMouseEvents(C.node,this.graph,x)}this.focusHighlight.bounds=m,this.focusHighlight.redraw()}}null==this.currentConstraint&&this.destroyFocusHighlight()}else this.currentConstraint=null,this.currentFocus=null,this.currentPoint=null},mxConstraintHandler.prototype.redraw=function(){if(null!=this.currentFocus&&null!=this.constraints&&null!=this.focusIcons){var t=this.graph.view.getState(this.currentFocus.cell);this.currentFocus=t,this.currentFocusArea=new mxRectangle(t.x,t.y,t.width,t.height);for(var n=0;n<this.constraints.length;n++){var e=this.graph.getConnectionPoint(t,this.constraints[n]),s=this.getImageForConstraint(t,this.constraints[n],e),i=new mxRectangle(Math.round(e.x-s.width/2),Math.round(e.y-s.height/2),s.width,s.height);this.focusIcons[n].bounds=i,this.focusIcons[n].redraw(),this.currentFocusArea.add(this.focusIcons[n].bounds),this.focusPoints[n]=e}}},mxConstraintHandler.prototype.setFocus=function(t,n,e){if(this.constraints=null!=n&&!this.isStateIgnored(n,e)&&this.graph.isCellConnectable(n.cell)?this.isEnabled()&&this.graph.getAllConnectionConstraints(n,e)||[]:null,null!=this.constraints){if(this.currentFocus=n,this.currentFocusArea=new mxRectangle(n.x,n.y,n.width,n.height),null!=this.focusIcons){for(var s=0;s<this.focusIcons.length;s++)this.focusIcons[s].destroy();this.focusIcons=null,this.focusPoints=null}this.focusPoints=[],this.focusIcons=[];for(s=0;s<this.constraints.length;s++){var i=this.graph.getConnectionPoint(n,this.constraints[s]),r=this.getImageForConstraint(n,this.constraints[s],i),o=r.src,h=new mxRectangle(Math.round(i.x-r.width/2),Math.round(i.y-r.height/2),r.width,r.height),l=new mxImageShape(h,o);l.dialect=this.graph.dialect!=mxConstants.DIALECT_SVG?mxConstants.DIALECT_MIXEDHTML:mxConstants.DIALECT_SVG,l.preserveImageAspect=!1,l.init(this.graph.getView().getDecoratorPane()),null!=l.node.previousSibling&&l.node.parentNode.insertBefore(l.node,l.node.parentNode.firstChild);var a=mxUtils.bind(this,function(){return null!=this.currentFocus?this.currentFocus:n});l.redraw(),mxEvent.redirectMouseEvents(l.node,this.graph,a),this.currentFocusArea.add(l.bounds),this.focusIcons.push(l),this.focusPoints.push(i)}this.currentFocusArea.grow(this.getTolerance(t))}else this.destroyIcons(),this.destroyFocusHighlight()},mxConstraintHandler.prototype.createHighlightShape=function(){var t=new mxRectangleShape(null,this.highlightColor,this.highlightColor,mxConstants.HIGHLIGHT_STROKEWIDTH);return t.opacity=mxConstants.HIGHLIGHT_OPACITY,t},mxConstraintHandler.prototype.intersects=function(t,n,e,s){return mxUtils.intersects(t.bounds,n)},mxConstraintHandler.prototype.destroy=function(){this.reset(),null!=this.resetHandler&&(this.graph.model.removeListener(this.resetHandler),this.graph.view.removeListener(this.resetHandler),this.graph.removeListener(this.resetHandler),this.resetHandler=null),null!=this.mouseleaveHandler&&null!=this.graph.container&&(mxEvent.removeListener(this.graph.container,"mouseleave",this.mouseleaveHandler),this.mouseleaveHandler=null)};