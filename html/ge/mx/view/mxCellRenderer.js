function mxCellRenderer(){}mxCellRenderer.defaultShapes=new Object,mxCellRenderer.prototype.defaultEdgeShape=mxConnector,mxCellRenderer.prototype.defaultVertexShape=mxRectangleShape,mxCellRenderer.prototype.defaultTextShape=mxText,mxCellRenderer.prototype.legacyControlPosition=!0,mxCellRenderer.prototype.legacySpacing=!0,mxCellRenderer.prototype.antiAlias=!0,mxCellRenderer.prototype.minSvgStrokeWidth=1,mxCellRenderer.prototype.forceControlClickHandler=!1,mxCellRenderer.registerShape=function(e,t){mxCellRenderer.defaultShapes[e]=t},mxCellRenderer.registerShape(mxConstants.SHAPE_RECTANGLE,mxRectangleShape),mxCellRenderer.registerShape(mxConstants.SHAPE_ELLIPSE,mxEllipse),mxCellRenderer.registerShape(mxConstants.SHAPE_RHOMBUS,mxRhombus),mxCellRenderer.registerShape(mxConstants.SHAPE_CYLINDER,mxCylinder),mxCellRenderer.registerShape(mxConstants.SHAPE_CONNECTOR,mxConnector),mxCellRenderer.registerShape(mxConstants.SHAPE_ACTOR,mxActor),mxCellRenderer.registerShape(mxConstants.SHAPE_TRIANGLE,mxTriangle),mxCellRenderer.registerShape(mxConstants.SHAPE_HEXAGON,mxHexagon),mxCellRenderer.registerShape(mxConstants.SHAPE_CLOUD,mxCloud),mxCellRenderer.registerShape(mxConstants.SHAPE_LINE,mxLine),mxCellRenderer.registerShape(mxConstants.SHAPE_ARROW,mxArrow),mxCellRenderer.registerShape(mxConstants.SHAPE_ARROW_CONNECTOR,mxArrowConnector),mxCellRenderer.registerShape(mxConstants.SHAPE_DOUBLE_ELLIPSE,mxDoubleEllipse),mxCellRenderer.registerShape(mxConstants.SHAPE_SWIMLANE,mxSwimlane),mxCellRenderer.registerShape(mxConstants.SHAPE_IMAGE,mxImageShape),mxCellRenderer.registerShape(mxConstants.SHAPE_LABEL,mxLabel),mxCellRenderer.prototype.initializeShape=function(e){e.shape.dialect=e.view.graph.dialect,this.configureShape(e),e.shape.init(e.view.getDrawPane())},mxCellRenderer.prototype.createShape=function(e){var t=null;if(null!=e.style){var n=mxStencilRegistry.getStencil(e.style[mxConstants.STYLE_SHAPE]);if(null!=n)t=new mxShape(n);else t=new(this.getShapeConstructor(e))}return t},mxCellRenderer.prototype.createIndicatorShape=function(e){e.shape.indicatorShape=this.getShape(e.view.graph.getIndicatorShape(e))},mxCellRenderer.prototype.getShape=function(e){return null!=e?mxCellRenderer.defaultShapes[e]:null},mxCellRenderer.prototype.getShapeConstructor=function(e){var t=this.getShape(e.style[mxConstants.STYLE_SHAPE]);return null==t&&(t=e.view.graph.getModel().isEdge(e.cell)?this.defaultEdgeShape:this.defaultVertexShape),t},mxCellRenderer.prototype.configureShape=function(e){e.shape.apply(e),e.shape.image=e.view.graph.getImage(e),e.shape.indicatorColor=e.view.graph.getIndicatorColor(e),e.shape.indicatorStrokeColor=e.style[mxConstants.STYLE_INDICATOR_STROKECOLOR],e.shape.indicatorGradientColor=e.view.graph.getIndicatorGradientColor(e),e.shape.indicatorDirection=e.style[mxConstants.STYLE_INDICATOR_DIRECTION],e.shape.indicatorImage=e.view.graph.getIndicatorImage(e),this.postConfigureShape(e)},mxCellRenderer.prototype.postConfigureShape=function(e){null!=e.shape&&(this.resolveColor(e,"indicatorGradientColor",mxConstants.STYLE_GRADIENTCOLOR),this.resolveColor(e,"indicatorColor",mxConstants.STYLE_FILLCOLOR),this.resolveColor(e,"gradient",mxConstants.STYLE_GRADIENTCOLOR),this.resolveColor(e,"stroke",mxConstants.STYLE_STROKECOLOR),this.resolveColor(e,"fill",mxConstants.STYLE_FILLCOLOR))},mxCellRenderer.prototype.checkPlaceholderStyles=function(e){if(null!=e.style)for(var t=["inherit","swimlane","indicated"],n=[mxConstants.STYLE_FILLCOLOR,mxConstants.STYLE_STROKECOLOR,mxConstants.STYLE_GRADIENTCOLOR,mxConstants.STYLE_FONTCOLOR],l=0;l<n.length;l++)if(mxUtils.indexOf(t,e.style[n[l]])>=0)return!0;return!1},mxCellRenderer.prototype.resolveColor=function(e,t,n){var l=n==mxConstants.STYLE_FONTCOLOR?e.text:e.shape;if(null!=l){var a=e.view.graph,s=l[t],i=null;if("inherit"==s?i=a.model.getParent(e.cell):"swimlane"==s?(l[t]=n==mxConstants.STYLE_STROKECOLOR||n==mxConstants.STYLE_FONTCOLOR?"#000000":"#ffffff",i=null!=a.model.getTerminal(e.cell,!1)?a.model.getTerminal(e.cell,!1):e.cell,i=a.getSwimlane(i),n=a.swimlaneIndicatorColorAttribute):"indicated"==s&&null!=e.shape&&(l[t]=e.shape.indicatorColor),null!=i){var r=a.getView().getState(i);if(l[t]=null,null!=r){var o=n==mxConstants.STYLE_FONTCOLOR?r.text:r.shape;l[t]=null!=o&&"indicatorColor"!=t?o[t]:r.style[n]}}}},mxCellRenderer.prototype.getLabelValue=function(e){return e.view.graph.getLabel(e.cell)},mxCellRenderer.prototype.createLabel=function(e,t){var n=e.view.graph;n.getModel().isEdge(e.cell);if(e.style[mxConstants.STYLE_FONTSIZE]>0||null==e.style[mxConstants.STYLE_FONTSIZE]){var l=n.isHtmlLabel(e.cell)||null!=t&&mxUtils.isNode(t);e.text=new this.defaultTextShape(t,new mxRectangle,e.style[mxConstants.STYLE_ALIGN]||mxConstants.ALIGN_CENTER,n.getVerticalAlign(e),e.style[mxConstants.STYLE_FONTCOLOR],e.style[mxConstants.STYLE_FONTFAMILY],e.style[mxConstants.STYLE_FONTSIZE],e.style[mxConstants.STYLE_FONTSTYLE],e.style[mxConstants.STYLE_SPACING],e.style[mxConstants.STYLE_SPACING_TOP],e.style[mxConstants.STYLE_SPACING_RIGHT],e.style[mxConstants.STYLE_SPACING_BOTTOM],e.style[mxConstants.STYLE_SPACING_LEFT],e.style[mxConstants.STYLE_HORIZONTAL],e.style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR],e.style[mxConstants.STYLE_LABEL_BORDERCOLOR],n.isWrapping(e.cell)&&n.isHtmlLabel(e.cell),n.isLabelClipped(e.cell),e.style[mxConstants.STYLE_OVERFLOW],e.style[mxConstants.STYLE_LABEL_PADDING],mxUtils.getValue(e.style,mxConstants.STYLE_TEXT_DIRECTION,mxConstants.DEFAULT_TEXT_DIRECTION)),e.text.opacity=mxUtils.getValue(e.style,mxConstants.STYLE_TEXT_OPACITY,100),e.text.dialect=l?mxConstants.DIALECT_STRICTHTML:e.view.graph.dialect,e.text.style=e.style,e.text.state=e,this.initializeLabel(e,e.text);var a=!1,s=function(t){var l=e;if(a){var s=mxEvent.getClientX(t),i=mxEvent.getClientY(t),r=mxUtils.convertPoint(n.container,s,i);l=n.view.getState(n.getCellAt(r.x,r.y))}return l};mxEvent.addGestureListeners(e.text.node,mxUtils.bind(this,function(t){this.isLabelEvent(e,t)&&(n.fireMouseEvent(mxEvent.MOUSE_DOWN,new mxMouseEvent(t,e)),a=n.dialect!=mxConstants.DIALECT_SVG&&"IMG"==mxEvent.getSource(t).nodeName)}),mxUtils.bind(this,function(t){this.isLabelEvent(e,t)&&n.fireMouseEvent(mxEvent.MOUSE_MOVE,new mxMouseEvent(t,s(t)))}),mxUtils.bind(this,function(t){this.isLabelEvent(e,t)&&(n.fireMouseEvent(mxEvent.MOUSE_UP,new mxMouseEvent(t,s(t))),a=!1)})),n.nativeDblClickEnabled&&mxEvent.addListener(e.text.node,"dblclick",mxUtils.bind(this,function(t){this.isLabelEvent(e,t)&&(n.dblClick(t,e.cell),mxEvent.consume(t))}))}},mxCellRenderer.prototype.initializeLabel=function(e,t){GE.IS_SVG&&GE.NO_FO&&t.dialect!=mxConstants.DIALECT_SVG?t.init(e.view.graph.container):t.init(e.view.getDrawPane())},mxCellRenderer.prototype.createCellOverlays=function(e){var t=e.view.graph.getCellOverlays(e.cell),n=null;if(null!=t){n=new mxDictionary;for(var l=0;l<t.length;l++){var a=null!=e.overlays?e.overlays.remove(t[l]):null;if(null==a){var s=new mxImageShape(new mxRectangle,t[l].image.src);s.dialect=e.view.graph.dialect,s.preserveImageAspect=!1,s.overlay=t[l],this.initializeOverlay(e,s),this.installCellOverlayListeners(e,t[l],s),null!=t[l].cursor&&(s.node.style.cursor=t[l].cursor),n.put(t[l],s)}else n.put(t[l],a)}}null!=e.overlays&&e.overlays.visit(function(e,t){t.destroy()}),e.overlays=n},mxCellRenderer.prototype.initializeOverlay=function(e,t){t.init(e.view.getOverlayPane())},mxCellRenderer.prototype.installCellOverlayListeners=function(e,t,n){var l=e.view.graph;mxEvent.addListener(n.node,"click",function(n){l.isEditing()&&l.stopEditing(!l.isInvokesStopCellEditing()),t.fireEvent(new mxEventObject(mxEvent.CLICK,"event",n,"cell",e.cell))}),mxEvent.addGestureListeners(n.node,function(e){mxEvent.consume(e)},function(t){l.fireMouseEvent(mxEvent.MOUSE_MOVE,new mxMouseEvent(t,e))})},mxCellRenderer.prototype.createControl=function(e){var t=e.view.graph,n=t.getFoldingImage(e);if(t.foldingEnabled&&null!=n){if(null==e.control){var l=new mxRectangle(0,0,n.width,n.height);e.control=new mxImageShape(l,n.src),e.control.preserveImageAspect=!1,e.control.dialect=t.dialect,this.initControl(e,e.control,!0,this.createControlClickHandler(e))}}else null!=e.control&&(e.control.destroy(),e.control=null)},mxCellRenderer.prototype.createControlClickHandler=function(e){var t=e.view.graph;return mxUtils.bind(this,function(n){if(this.forceControlClickHandler||t.isEnabled()){var l=!t.isCellCollapsed(e.cell);t.foldCells(l,!1,[e.cell],null,n),mxEvent.consume(n)}})},mxCellRenderer.prototype.initControl=function(e,t,n,l){var a=e.view.graph;a.isHtmlLabel(e.cell)&&GE.NO_FO&&a.dialect==mxConstants.DIALECT_SVG?(t.dialect=mxConstants.DIALECT_PREFERHTML,t.init(a.container),t.node.style.zIndex=1):t.init(e.view.getOverlayPane());var s=t.innerNode||t.node;if(null==l||GE.IS_IOS||(a.isEnabled()&&(s.style.cursor="pointer"),mxEvent.addListener(s,"click",l)),n){var i=null;mxEvent.addGestureListeners(s,function(t){i=new mxPoint(mxEvent.getClientX(t),mxEvent.getClientY(t)),a.fireMouseEvent(mxEvent.MOUSE_DOWN,new mxMouseEvent(t,e)),mxEvent.consume(t)},function(t){a.fireMouseEvent(mxEvent.MOUSE_MOVE,new mxMouseEvent(t,e))},function(t){a.fireMouseEvent(mxEvent.MOUSE_UP,new mxMouseEvent(t,e)),mxEvent.consume(t)}),null!=l&&GE.IS_IOS&&s.addEventListener("touchend",function(e){if(null!=i){var t=a.tolerance;Math.abs(i.x-mxEvent.getClientX(e))<t&&Math.abs(i.y-mxEvent.getClientY(e))<t&&(l.call(l,e),mxEvent.consume(e))}},!0)}return s},mxCellRenderer.prototype.isShapeEvent=function(e,t){return!0},mxCellRenderer.prototype.isLabelEvent=function(e,t){return!0},mxCellRenderer.prototype.installListeners=function(e){var t=e.view.graph,n=function(n){var l=e;if(t.dialect!=mxConstants.DIALECT_SVG&&"IMG"==mxEvent.getSource(n).nodeName){var a=mxEvent.getClientX(n),s=mxEvent.getClientY(n),i=mxUtils.convertPoint(t.container,a,s);l=t.view.getState(t.getCellAt(i.x,i.y))}return l};mxEvent.addGestureListeners(e.shape.node,mxUtils.bind(this,function(n){this.isShapeEvent(e,n)&&t.fireMouseEvent(mxEvent.MOUSE_DOWN,new mxMouseEvent(n,e))}),mxUtils.bind(this,function(l){this.isShapeEvent(e,l)&&t.fireMouseEvent(mxEvent.MOUSE_MOVE,new mxMouseEvent(l,n(l)))}),mxUtils.bind(this,function(l){this.isShapeEvent(e,l)&&t.fireMouseEvent(mxEvent.MOUSE_UP,new mxMouseEvent(l,n(l)))})),t.nativeDblClickEnabled&&mxEvent.addListener(e.shape.node,"dblclick",mxUtils.bind(this,function(n){this.isShapeEvent(e,n)&&(t.dblClick(n,e.cell),mxEvent.consume(n))}))},mxCellRenderer.prototype.redrawLabel=function(e,t){var n=e.view.graph,l=this.getLabelValue(e),a=n.isWrapping(e.cell),s=n.isLabelClipped(e.cell),i=e.view.graph.isHtmlLabel(e.cell)||null!=l&&mxUtils.isNode(l)?mxConstants.DIALECT_STRICTHTML:e.view.graph.dialect,r=e.style[mxConstants.STYLE_OVERFLOW]||"visible";if(null==e.text||e.text.wrap==a&&e.text.clipped==s&&e.text.overflow==r&&e.text.dialect==i||(e.text.destroy(),e.text=null),null==e.text&&null!=l&&(mxUtils.isNode(l)||l.length>0)?this.createLabel(e,l):null==e.text||null!=l&&0!=l.length||(e.text.destroy(),e.text=null),null!=e.text){t&&(null!=e.text.lastValue&&this.isTextShapeInvalid(e,e.text)&&(e.text.lastValue=null),e.text.resetStyles(),e.text.apply(e),e.text.valign=n.getVerticalAlign(e));var o=this.getLabelBounds(e),x=this.getTextScale(e);if(this.resolveColor(e,"color",mxConstants.STYLE_FONTCOLOR),t||e.text.value!=l||e.text.isWrapping!=a||e.text.overflow!=r||e.text.isClipping!=s||e.text.scale!=x||e.text.dialect!=i||null==e.text.bounds||!e.text.bounds.equals(o)){e.text.dialect=i,e.text.value=l,e.text.bounds=o,e.text.scale=x,e.text.wrap=a,e.text.clipped=s,e.text.overflow=r;var d=e.text.node.style.visibility;this.redrawLabelShape(e.text),e.text.node.style.visibility=d}}},mxCellRenderer.prototype.isTextShapeInvalid=function(e,t){function n(n,l,a){return"spacingTop"==l||"spacingRight"==l||"spacingBottom"==l||"spacingLeft"==l?parseFloat(t[n])-parseFloat(t.spacing)!=(e.style[l]||a):t[n]!=(e.style[l]||a)}return n("fontStyle",mxConstants.STYLE_FONTSTYLE,mxConstants.DEFAULT_FONTSTYLE)||n("family",mxConstants.STYLE_FONTFAMILY,mxConstants.DEFAULT_FONTFAMILY)||n("size",mxConstants.STYLE_FONTSIZE,mxConstants.DEFAULT_FONTSIZE)||n("color",mxConstants.STYLE_FONTCOLOR,"black")||n("align",mxConstants.STYLE_ALIGN,"")||n("valign",mxConstants.STYLE_VERTICAL_ALIGN,"")||n("spacing",mxConstants.STYLE_SPACING,2)||n("spacingTop",mxConstants.STYLE_SPACING_TOP,0)||n("spacingRight",mxConstants.STYLE_SPACING_RIGHT,0)||n("spacingBottom",mxConstants.STYLE_SPACING_BOTTOM,0)||n("spacingLeft",mxConstants.STYLE_SPACING_LEFT,0)||n("horizontal",mxConstants.STYLE_HORIZONTAL,!0)||n("background",mxConstants.STYLE_LABEL_BACKGROUNDCOLOR)||n("border",mxConstants.STYLE_LABEL_BORDERCOLOR)||n("opacity",mxConstants.STYLE_TEXT_OPACITY,100)||n("textDirection",mxConstants.STYLE_TEXT_DIRECTION,mxConstants.DEFAULT_TEXT_DIRECTION)},mxCellRenderer.prototype.redrawLabelShape=function(e){e.redraw()},mxCellRenderer.prototype.getTextScale=function(e){return e.view.scale},mxCellRenderer.prototype.getLabelBounds=function(e){var t=e.view.graph,n=e.view.scale,l=t.getModel().isEdge(e.cell),a=new mxRectangle(e.absoluteOffset.x,e.absoluteOffset.y);if(l){var s=e.text.getSpacing();a.x+=s.x*n,a.y+=s.y*n;var i=t.getCellGeometry(e.cell);null!=i&&(a.width=Math.max(0,i.width*n),a.height=Math.max(0,i.height*n))}else{if(e.text.isPaintBoundsInverted()){var r=a.x;a.x=a.y,a.y=r}a.x+=e.x,a.y+=e.y,a.width=Math.max(1,e.width),a.height=Math.max(1,e.height)}if(e.text.isPaintBoundsInverted()){var o=(e.width-e.height)/2;a.x+=o,a.y-=o;r=a.width;a.width=a.height,a.height=r}if(null!=e.shape){var x=mxUtils.getValue(e.style,mxConstants.STYLE_LABEL_POSITION,mxConstants.ALIGN_CENTER),d=mxUtils.getValue(e.style,mxConstants.STYLE_VERTICAL_LABEL_POSITION,mxConstants.ALIGN_MIDDLE);x==mxConstants.ALIGN_CENTER&&d==mxConstants.ALIGN_MIDDLE&&(a=e.shape.getLabelBounds(a))}var p=mxUtils.getValue(e.style,mxConstants.STYLE_LABEL_WIDTH,null);return null!=p&&(a.width=parseFloat(p)*n),l||this.rotateLabelBounds(e,a),a},mxCellRenderer.prototype.rotateLabelBounds=function(e,t){if(t.y-=e.text.margin.y*t.height,t.x-=e.text.margin.x*t.width,!this.legacySpacing||"fill"!=e.style[mxConstants.STYLE_OVERFLOW]&&"width"!=e.style[mxConstants.STYLE_OVERFLOW]){var n=e.view.scale,l=e.text.getSpacing();t.x+=l.x*n,t.y+=l.y*n;var a=mxUtils.getValue(e.style,mxConstants.STYLE_LABEL_POSITION,mxConstants.ALIGN_CENTER),s=mxUtils.getValue(e.style,mxConstants.STYLE_VERTICAL_LABEL_POSITION,mxConstants.ALIGN_MIDDLE),i=mxUtils.getValue(e.style,mxConstants.STYLE_LABEL_WIDTH,null);t.width=Math.max(0,t.width-(a==mxConstants.ALIGN_CENTER&&null==i?e.text.spacingLeft*n+e.text.spacingRight*n:0)),t.height=Math.max(0,t.height-(s==mxConstants.ALIGN_MIDDLE?e.text.spacingTop*n+e.text.spacingBottom*n:0))}var r=e.text.getTextRotation();if(0!=r&&null!=e&&e.view.graph.model.isVertex(e.cell)){var o=e.getCenterX(),x=e.getCenterY();if(t.x!=o||t.y!=x){var d=r*(Math.PI/180),p=mxUtils.getRotatedPoint(new mxPoint(t.x,t.y),Math.cos(d),Math.sin(d),new mxPoint(o,x));t.x=p.x,t.y=p.y}}},mxCellRenderer.prototype.redrawCellOverlays=function(e,t){if(this.createCellOverlays(e),null!=e.overlays){var n=mxUtils.mod(mxUtils.getValue(e.style,mxConstants.STYLE_ROTATION,0),90),l=mxUtils.toRadians(n),a=Math.cos(l),s=Math.sin(l);e.overlays.visit(function(l,i){var r=i.overlay.getBounds(e);if(!e.view.graph.getModel().isEdge(e.cell)&&null!=e.shape&&0!=n){var o=r.getCenterX(),x=r.getCenterY(),d=mxUtils.getRotatedPoint(new mxPoint(o,x),a,s,new mxPoint(e.getCenterX(),e.getCenterY()));o=d.x,x=d.y,r.x=Math.round(o-r.width/2),r.y=Math.round(x-r.height/2)}!t&&null!=i.bounds&&i.scale==e.view.scale&&i.bounds.equals(r)||(i.bounds=r,i.scale=e.view.scale,i.redraw())})}},mxCellRenderer.prototype.redrawControl=function(e,t){var n=e.view.graph.getFoldingImage(e);if(null!=e.control&&null!=n){var l=this.getControlBounds(e,n.width,n.height),a=this.legacyControlPosition?mxUtils.getValue(e.style,mxConstants.STYLE_ROTATION,0):e.shape.getTextRotation(),s=e.view.scale;!t&&e.control.scale==s&&e.control.bounds.equals(l)&&e.control.rotation==a||(e.control.rotation=a,e.control.bounds=l,e.control.scale=s,e.control.redraw())}},mxCellRenderer.prototype.getControlBounds=function(e,t,n){if(null!=e.control){var l=e.view.scale,a=e.getCenterX(),s=e.getCenterY();if(!e.view.graph.getModel().isEdge(e.cell)&&(a=e.x+t*l,s=e.y+n*l,null!=e.shape)){var i=e.shape.getShapeRotation();if(this.legacyControlPosition)i=mxUtils.getValue(e.style,mxConstants.STYLE_ROTATION,0);else if(e.shape.isPaintBoundsInverted()){var r=(e.width-e.height)/2;a+=r,s-=r}if(0!=i){var o=mxUtils.toRadians(i),x=Math.cos(o),d=Math.sin(o),p=mxUtils.getRotatedPoint(new mxPoint(a,s),x,d,new mxPoint(e.getCenterX(),e.getCenterY()));a=p.x,s=p.y}}return e.view.graph.getModel().isEdge(e.cell),new mxRectangle(Math.round(a-t/2*l),Math.round(s-n/2*l),Math.round(t*l),Math.round(n*l))}return null},mxCellRenderer.prototype.insertStateAfter=function(e,t,n){for(var l=this.getShapesForState(e),a=0;a<l.length;a++)if(null!=l[a]&&null!=l[a].node){var s=l[a].node.parentNode!=e.view.getDrawPane()&&l[a].node.parentNode!=e.view.getOverlayPane(),i=s?n:t;if(null!=i&&i.nextSibling!=l[a].node)null==i.nextSibling?i.parentNode.appendChild(l[a].node):i.parentNode.insertBefore(l[a].node,i.nextSibling);else if(null==i)if(l[a].node.parentNode==e.view.graph.container){for(var r=e.view.canvas;null!=r&&r.parentNode!=e.view.graph.container;)r=r.parentNode;null!=r&&null!=r.nextSibling?r.nextSibling!=l[a].node&&l[a].node.parentNode.insertBefore(l[a].node,r.nextSibling):l[a].node.parentNode.appendChild(l[a].node)}else null!=l[a].node.parentNode&&null!=l[a].node.parentNode.firstChild&&l[a].node.parentNode.firstChild!=l[a].node&&l[a].node.parentNode.insertBefore(l[a].node,l[a].node.parentNode.firstChild);s?n=l[a].node:t=l[a].node}return[t,n]},mxCellRenderer.prototype.getShapesForState=function(e){return[e.shape,e.text,e.control]},mxCellRenderer.prototype.redraw=function(e,t,n){var l=this.redrawShape(e,t,n);null==e.shape||null!=n&&!n||(this.redrawLabel(e,l),this.redrawCellOverlays(e,l),this.redrawControl(e,l))},mxCellRenderer.prototype.redrawShape=function(e,t,n){var l=e.view.graph.model,a=!1;return null!=e.shape&&null!=e.shape.style&&null!=e.style&&e.shape.style[mxConstants.STYLE_SHAPE]!=e.style[mxConstants.STYLE_SHAPE]&&(e.shape.destroy(),e.shape=null),null==e.shape&&null!=e.view.graph.container&&e.cell!=e.view.currentRoot&&(l.isVertex(e.cell)||l.isEdge(e.cell))?(e.shape=this.createShape(e),null!=e.shape&&(e.shape.minSvgStrokeWidth=this.minSvgStrokeWidth,e.shape.antiAlias=this.antiAlias,this.createIndicatorShape(e),this.initializeShape(e),this.createCellOverlays(e),this.installListeners(e),e.view.graph.selectionCellsHandler.updateHandler(e))):t||null==e.shape||mxUtils.equalEntries(e.shape.style,e.style)&&!this.checkPlaceholderStyles(e)||(e.shape.resetStyles(),this.configureShape(e),e.view.graph.selectionCellsHandler.updateHandler(e),t=!0),null!=e.shape&&e.shape.indicatorShape!=this.getShape(e.view.graph.getIndicatorShape(e))&&(null!=e.shape.indicator&&(e.shape.indicator.destroy(),e.shape.indicator=null),this.createIndicatorShape(e),null!=e.shape.indicatorShape&&(e.shape.indicator=new e.shape.indicatorShape,e.shape.indicator.dialect=e.shape.dialect,e.shape.indicator.init(e.node),t=!0)),null!=e.shape&&(this.createControl(e),(t||this.isShapeInvalid(e,e.shape))&&(null!=e.absolutePoints?(e.shape.points=e.absolutePoints.slice(),e.shape.bounds=null):(e.shape.points=null,e.shape.bounds=new mxRectangle(e.x,e.y,e.width,e.height)),e.shape.scale=e.view.scale,null==n||n?this.doRedrawShape(e):e.shape.updateBoundingBox(),a=!0)),a},mxCellRenderer.prototype.doRedrawShape=function(e){e.shape.redraw()},mxCellRenderer.prototype.isShapeInvalid=function(e,t){return null==t.bounds||t.scale!=e.view.scale||null==e.absolutePoints&&!t.bounds.equals(e)||null!=e.absolutePoints&&!mxUtils.equalPoints(t.points,e.absolutePoints)},mxCellRenderer.prototype.destroy=function(e){null!=e.shape&&(null!=e.text&&(e.text.destroy(),e.text=null),null!=e.overlays&&(e.overlays.visit(function(e,t){t.destroy()}),e.overlays=null),null!=e.control&&(e.control.destroy(),e.control=null),e.shape.destroy(),e.shape=null)};