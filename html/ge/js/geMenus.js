GE.Menus=function(e){this.editorUi=e,this.menus=new Object,this.init(),GE.IS_SVG||((new Image).src=this.checkmarkImage)},GE.Menus.prototype.defaultFont="宋体",GE.Menus.prototype.defaultFontSize="12",GE.Menus.prototype.defaultMenuItems=["file","edit","view","arrange","extras"],GE.Menus.prototype.defaultFonts=["宋体","黑体","微软雅黑","微软正黑体","新宋体","新细明体","细明体","标楷体","仿宋","楷体","仿宋_GB2312","楷体_GB2312","Helvetica","Verdana","Times New Roman","Garamond","Comic Sans MS","Courier New","Georgia","Lucida Console","Tahoma"],GE.Menus.prototype.init=function(){var e=this.editorUi.editor.graph,t=mxUtils.bind(e,e.isEnabled);this.customFonts=[],this.customFontSizes=[],this.put("fontFamily",new GE.Menu(mxUtils.bind(this,function(t,n){for(var i=mxUtils.bind(this,function(i){this.styleChange(t,i,[mxConstants.STYLE_FONTFAMILY],[i],null,n,function(){document.execCommand("fontname",!1,i)},function(){e.updateLabelElements(e.getSelectionCells(),function(t){t.removeAttribute("face"),t.style.fontFamily=null,"PRE"==t.nodeName&&e.replaceElement(t,"div")})}).firstChild.nextSibling.style.fontFamily=i}),o=0;o<this.defaultFonts.length;o++)i(this.defaultFonts[o]);if(t.addSeparator(n),this.customFonts.length>0){for(o=0;o<this.customFonts.length;o++)i(this.customFonts[o]);t.addSeparator(n),t.addItem(mxResources.get("reset"),null,mxUtils.bind(this,function(){this.customFonts=[],this.editorUi.fireEvent(new mxEventObject("customFontsChanged"))}),n),t.addSeparator(n)}this.promptChange(t,mxResources.get("custom")+"...","",mxConstants.DEFAULT_FONTFAMILY,mxConstants.STYLE_FONTFAMILY,n,!0,mxUtils.bind(this,function(e){mxUtils.indexOf(this.customFonts,e)<0&&(this.customFonts.push(e),this.editorUi.fireEvent(new mxEventObject("customFontsChanged")))}))}))),this.put("formatBlock",new GE.Menu(mxUtils.bind(this,function(t,n){function i(i,o){return t.addItem(i,null,mxUtils.bind(this,function(){null!=e.cellEditor.textarea&&(e.cellEditor.textarea.focus(),document.execCommand("formatBlock",!1,"<"+o+">"))}),n)}i(mxResources.get("normal"),"p"),i("","h1").firstChild.nextSibling.innerHTML='<h1 style="margin:0px;">'+mxResources.get("heading")+" 1</h1>",i("","h2").firstChild.nextSibling.innerHTML='<h2 style="margin:0px;">'+mxResources.get("heading")+" 2</h2>",i("","h3").firstChild.nextSibling.innerHTML='<h3 style="margin:0px;">'+mxResources.get("heading")+" 3</h3>",i("","h4").firstChild.nextSibling.innerHTML='<h4 style="margin:0px;">'+mxResources.get("heading")+" 4</h4>",i("","h5").firstChild.nextSibling.innerHTML='<h5 style="margin:0px;">'+mxResources.get("heading")+" 5</h5>",i("","h6").firstChild.nextSibling.innerHTML='<h6 style="margin:0px;">'+mxResources.get("heading")+" 6</h6>",i("","pre").firstChild.nextSibling.innerHTML='<pre style="margin:0px;">'+mxResources.get("formatted")+"</pre>",i("","blockquote").firstChild.nextSibling.innerHTML='<blockquote style="margin-top:0px;margin-bottom:0px;">'+mxResources.get("blockquote")+"</blockquote>"}))),this.put("fontSize",new GE.Menu(mxUtils.bind(this,function(t,n){for(var i=[6,8,9,10,11,12,14,18,24,36,48,72],o=mxUtils.bind(this,function(i){this.styleChange(t,i,[mxConstants.STYLE_FONTSIZE],[i],null,n,function(){if(null!=e.cellEditor.textarea){document.execCommand("fontSize",!1,"3");for(var t=e.cellEditor.textarea.getElementsByTagName("font"),n=0;n<t.length;n++)if("3"==t[n].getAttribute("size")){t[n].removeAttribute("size"),t[n].style.fontSize=i+"px";break}}})}),l=0;l<i.length;l++)o(i[l]);if(t.addSeparator(n),this.customFontSizes.length>0){for(l=0;l<this.customFontSizes.length;l++)o(this.customFontSizes[l]);t.addSeparator(n),t.addItem(mxResources.get("reset"),null,mxUtils.bind(this,function(){this.customFontSizes=[]}),n),t.addSeparator(n)}this.promptChange(t,mxResources.get("custom")+"...","(pt)","12",mxConstants.STYLE_FONTSIZE,n,!0,mxUtils.bind(this,function(e){this.customFontSizes.push(e)}))}))),this.put("direction",new GE.Menu(mxUtils.bind(this,function(t,n){t.addItem(mxResources.get("flipH"),null,function(){e.toggleCellStyles(mxConstants.STYLE_FLIPH,!1)},n),t.addItem(mxResources.get("flipV"),null,function(){e.toggleCellStyles(mxConstants.STYLE_FLIPV,!1)},n),this.addMenuItems(t,["-","rotation"],n)}))),this.put("align",new GE.Menu(mxUtils.bind(this,function(t,n){t.addItem(mxResources.get("leftAlign"),null,function(){e.alignCells(mxConstants.ALIGN_LEFT)},n),t.addItem(mxResources.get("center"),null,function(){e.alignCells(mxConstants.ALIGN_CENTER)},n),t.addItem(mxResources.get("rightAlign"),null,function(){e.alignCells(mxConstants.ALIGN_RIGHT)},n),t.addSeparator(n),t.addItem(mxResources.get("topAlign"),null,function(){e.alignCells(mxConstants.ALIGN_TOP)},n),t.addItem(mxResources.get("middle"),null,function(){e.alignCells(mxConstants.ALIGN_MIDDLE)},n),t.addItem(mxResources.get("bottomAlign"),null,function(){e.alignCells(mxConstants.ALIGN_BOTTOM)},n)}))),this.put("distribute",new GE.Menu(mxUtils.bind(this,function(t,n){t.addItem(mxResources.get("horizontal"),null,function(){e.distributeCells(!0)},n),t.addItem(mxResources.get("vertical"),null,function(){e.distributeCells(!1)},n)}))),this.put("layout",new GE.Menu(mxUtils.bind(this,function(t,n){var i=mxUtils.bind(this,function(e,t){var n=new GE.FilenameDialog(this.editorUi,e,mxResources.get("apply"),function(e){t(parseFloat(e))},mxResources.get("spacing"));this.editorUi.showDialog(n.container,300,80,!0,!0),n.init()});t.addItem(mxResources.get("horizontalFlow"),null,mxUtils.bind(this,function(){var t=new mxHierarchicalLayout(e,mxConstants.DIRECTION_WEST);this.editorUi.executeLayout(function(){var n=e.getSelectionCells();t.execute(e.getDefaultParent(),0==n.length?null:n)},!0)}),n),t.addItem(mxResources.get("verticalFlow"),null,mxUtils.bind(this,function(){var t=new mxHierarchicalLayout(e,mxConstants.DIRECTION_NORTH);this.editorUi.executeLayout(function(){var n=e.getSelectionCells();t.execute(e.getDefaultParent(),0==n.length?null:n)},!0)}),n),t.addSeparator(n),t.addItem(mxResources.get("horizontalTree"),null,mxUtils.bind(this,function(){var t=e.getSelectionCell(),n=null;if(null==t||0==e.getModel().getChildCount(t)?0==e.getModel().getEdgeCount(t)&&(n=e.findTreeRoots(e.getDefaultParent())):n=e.findTreeRoots(t),null!=n&&n.length>0&&(t=n[0]),null!=t){var o=new mxCompactTreeLayout(e,!0);o.edgeRouting=!1,o.levelDistance=30,i(o.levelDistance,mxUtils.bind(this,function(n){o.levelDistance=n,this.editorUi.executeLayout(function(){o.execute(e.getDefaultParent(),t)},!0)}))}}),n),t.addItem(mxResources.get("verticalTree"),null,mxUtils.bind(this,function(){var t=e.getSelectionCell(),n=null;if(null==t||0==e.getModel().getChildCount(t)?0==e.getModel().getEdgeCount(t)&&(n=e.findTreeRoots(e.getDefaultParent())):n=e.findTreeRoots(t),null!=n&&n.length>0&&(t=n[0]),null!=t){var o=new mxCompactTreeLayout(e,!1);o.edgeRouting=!1,o.levelDistance=30,i(o.levelDistance,mxUtils.bind(this,function(n){o.levelDistance=n,this.editorUi.executeLayout(function(){o.execute(e.getDefaultParent(),t)},!0)}))}}),n),t.addItem(mxResources.get("radialTree"),null,mxUtils.bind(this,function(){var t=e.getSelectionCell(),n=null;if(null==t||0==e.getModel().getChildCount(t)?0==e.getModel().getEdgeCount(t)&&(n=e.findTreeRoots(e.getDefaultParent())):n=e.findTreeRoots(t),null!=n&&n.length>0&&(t=n[0]),null!=t){var o=new mxRadialTreeLayout(e,!1);o.levelDistance=80,o.autoRadius=!0,i(o.levelDistance,mxUtils.bind(this,function(n){o.levelDistance=n,this.editorUi.executeLayout(function(){o.execute(e.getDefaultParent(),t),e.isSelectionEmpty()||(t=e.getModel().getParent(t),e.getModel().isVertex(t)&&e.updateGroupBounds([t],2*e.gridSize,!0))},!0)}))}}),n),t.addSeparator(n),t.addItem(mxResources.get("organic"),null,mxUtils.bind(this,function(){var t=new mxFastOrganicLayout(e);i(t.forceConstant,mxUtils.bind(this,function(n){t.forceConstant=n,this.editorUi.executeLayout(function(){var n=e.getSelectionCell();null!=n&&0!=e.getModel().getChildCount(n)||(n=e.getDefaultParent()),t.execute(n),e.getModel().isVertex(n)&&e.updateGroupBounds([n],2*e.gridSize,!0)},!0)}))}),n),t.addItem(mxResources.get("circle"),null,mxUtils.bind(this,function(){var t=new mxCircleLayout(e);this.editorUi.executeLayout(function(){var n=e.getSelectionCell();null!=n&&0!=e.getModel().getChildCount(n)||(n=e.getDefaultParent()),t.execute(n),e.getModel().isVertex(n)&&e.updateGroupBounds([n],2*e.gridSize,!0)},!0)}),n)}))),this.put("navigation",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,["home","-","exitGroup","enterGroup","-","expand","collapse","-","collapsible"],t)}))),this.put("arrange",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,["toFront","toBack","-"],t),this.addSubmenu("direction",e,t),this.addMenuItems(e,["turn","-"],t),this.addSubmenu("align",e,t),this.addSubmenu("distribute",e,t),e.addSeparator(t),this.addSubmenu("navigation",e,t),this.addSubmenu("insert",e,t),this.addSubmenu("layout",e,t),this.addMenuItems(e,["-","group","ungroup","removeFromGroup","-","clearWaypoints","autosize"],t)}))).isEnabled=t,this.put("insert",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,["insertImage"],t)}))),this.put("view",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,(null!=this.editorUi.format?["formatPanel"]:[]).concat(["outline","layers","-","pageScale","-","scrollbars","tooltips","-","grid","guides","-","splitWay","connectionArrows","connectionPoints","-","resetView","zoomIn","zoomOut"],t))}))),this.put("viewPanels",new GE.Menu(mxUtils.bind(this,function(e,t){null!=this.editorUi.format&&this.addMenuItems(e,["formatPanel"],t),this.addMenuItems(e,["outline","layers"],t)}))),this.put("viewZoom",new GE.Menu(mxUtils.bind(this,function(t,n){this.addMenuItems(t,["resetView","-"],n);for(var i=[.25,.5,.75,1,1.25,1.5,2,3,4],o=0;o<i.length;o++)!function(i){t.addItem(100*i+"%",null,function(){e.zoomTo(i)},n)}(i[o]);this.addMenuItems(t,["-","fitWindow","fitPageWidth","fitPage","fitTwoPages","-","customZoom"],n)}))),this.put("file",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,["save","saveAndReturn","nosaveAndReturn","-","import","export"],t)}))),this.put("edit",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,["undo","redo","-","cut","copy","paste","delete","-","duplicate","-","bindProperties","-","edit","-","selectVertices","selectEdges","selectAll","selectNone","-","lockUnlock"])}))),this.put("extras",new GE.Menu(mxUtils.bind(this,function(e,t){this.addMenuItems(e,["copyConnect","collapseExpand","-","editDiagram","version"])})))},GE.Menus.prototype.put=function(e,t){return this.menus[e]=t,t},GE.Menus.prototype.get=function(e){return this.menus[e]},GE.Menus.prototype.addSubmenu=function(e,t,n,i){var o=this.get(e);if(null!=o){var l=o.isEnabled();if(t.showDisabled||l){var s=t.addItem(i||mxResources.get(e),null,null,n,null,l);this.addMenu(e,t,s)}}},GE.Menus.prototype.addMenu=function(e,t,n){var i=this.get(e);null!=i&&(t.showDisabled||i.isEnabled())&&this.get(e).execute(t,n)},GE.Menus.prototype.addInsertTableCellItem=function(e,t){var n=this.editorUi.editor.graph;this.addInsertTableItem(e,mxUtils.bind(this,function(e,t,i){var o=mxEvent.isControlDown(e)||mxEvent.isMetaDown(e)?n.createCrossFunctionalSwimlane(t,i):n.createTable(t,i,null,null,mxEvent.isShiftDown(e)?"Table":null),l=mxEvent.isAltDown(e)?n.getFreeInsertPoint():n.getCenterInsertPoint(n.getBoundingBoxFromGeometry([o],!0)),s=n.importCells([o],l.x,l.y);null!=s&&s.length>0&&(n.scrollCellToVisible(s[0]),n.setSelectionCells(s))}),t)},GE.Menus.prototype.addInsertTableItem=function(e,t,n){t=null!=t?t:mxUtils.bind(this,function(e,t,n){var i=this.editorUi.editor.graph,o=i.getParentByName(mxEvent.getSource(e),"TD");if(null!=o&&null!=i.cellEditor.textarea){i.getParentByName(o,"TR");for(var l=i.cellEditor.textarea.getElementsByTagName("table"),s=[],r=0;r<l.length;r++)s.push(l[r]);i.container.focus(),i.pasteHtmlAtCaret(function(e,t){for(var n=["<table>"],i=0;i<e;i++){n.push("<tr>");for(var o=0;o<t;o++)n.push("<td><br></td>");n.push("</tr>")}return n.push("</table>"),n.join("")}(t,n));var u=i.cellEditor.textarea.getElementsByTagName("table");if(u.length==s.length+1)for(r=u.length-1;r>=0;r--)if(0==r||u[r]!=s[r-1]){i.selectNode(u[r].rows[0].cells[0]);break}}});var i=this.editorUi.editor.graph,o=null,l=null;var s=e.addItem("",null,null,n,null,null,null,!0);s.firstChild.innerHTML="";var r=function(e,t){var n=document.createElement("table");n.setAttribute("border","1"),n.style.borderCollapse="collapse",n.style.borderStyle="solid",n.setAttribute("cellPadding","8");for(var i=0;i<e;i++)for(var o=n.insertRow(i),l=0;l<t;l++)o.insertCell(-1);return n}(5,5);s.firstChild.appendChild(r);var u=document.createElement("div");function a(e){var t=!1;if(null!=(l=i.getParentByName(mxEvent.getSource(e),"TD"))){o=i.getParentByName(l,"TR");var n=mxEvent.isMouseEvent(e)?2:4;!function(e,t,n){for(var i=e.rows.length;i<t;i++)for(var o=e.insertRow(i),l=0;l<e.rows[0].cells.length;l++)o.insertCell(-1);for(i=0;i<e.rows.length;i++)for(l=(o=e.rows[i]).cells.length;l<n;l++)o.insertCell(-1)}(r,Math.min(20,o.sectionRowIndex+n),Math.min(20,l.cellIndex+n)),u.innerHTML=l.cellIndex+1+"x"+(o.sectionRowIndex+1);for(var s=0;s<r.rows.length;s++)for(var a=r.rows[s],d=0;d<a.cells.length;d++){var c=a.cells[d];s==o.sectionRowIndex&&d==l.cellIndex&&(t="blue"==c.style.backgroundColor),s<=o.sectionRowIndex&&d<=l.cellIndex?c.style.backgroundColor="blue":c.style.backgroundColor="transparent"}}return mxEvent.consume(e),t}u.style.padding="4px",u.style.fontSize=GE.Menus.prototype.defaultFontSize+"px",u.innerHTML="1x1",s.firstChild.appendChild(u),mxEvent.addGestureListeners(r,null,null,mxUtils.bind(this,function(e){var n=a(e);null!=l&&null!=o&&n&&(t(e,o.sectionRowIndex+1,l.cellIndex+1),window.setTimeout(mxUtils.bind(this,function(){this.editorUi.hideCurrentMenu()}),0))})),mxEvent.addListener(r,"mouseover",a)},GE.Menus.prototype.edgeStyleChange=function(e,t,n,i,o,l,s){return e.addItem(t,null,mxUtils.bind(this,function(){var e=this.editorUi.editor.graph;e.stopEditing(!1),e.getModel().beginUpdate();try{for(var t=e.getSelectionCells(),o=[],l=0;l<t.length;l++){var r=t[l];if(e.getModel().isEdge(r)){if(s){var u=e.getCellGeometry(r);null!=u&&((u=u.clone()).points=null,e.getModel().setGeometry(r,u))}for(var a=0;a<n.length;a++)e.setCellStyles(n[a],i[a],[r]);o.push(r)}}this.editorUi.fireEvent(new mxEventObject("styleChanged","keys",n,"values",i,"cells",o))}finally{e.getModel().endUpdate()}}),l,o)},GE.Menus.prototype.styleChange=function(e,t,n,i,o,l,s,r){var u=this.createStyleChangeFunction(n,i);return e.addItem(t,null,mxUtils.bind(this,function(){var e=this.editorUi.editor.graph;null!=s&&e.cellEditor.isContentEditing()?s():u(r)}),l,o)},GE.Menus.prototype.createStyleChangeFunction=function(e,t){return mxUtils.bind(this,function(n){var i=this.editorUi.editor.graph;i.stopEditing(!1),i.getModel().beginUpdate();try{for(var o=i.getSelectionCells(),l=0;l<e.length;l++)if(i.setCellStyles(e[l],t[l],o),e[l]==mxConstants.STYLE_ALIGN&&i.updateLabelElements(o,function(e){e.removeAttribute("align"),e.style.textAlign=null}),e[l]==mxConstants.STYLE_FONTFAMILY)for(l=0;l<o.length;l++)0==i.model.getChildCount(o[l])&&i.autoSizeCell(o[l],!1);null!=n&&n(),this.editorUi.fireEvent(new mxEventObject("styleChanged","keys",e,"values",t,"cells",o))}finally{i.getModel().endUpdate()}})},GE.Menus.prototype.promptChange=function(e,t,n,i,o,l,s,r,u){return e.addItem(t,null,mxUtils.bind(this,function(){var e=this.editorUi.editor.graph,t=i,l=e.getView().getState(e.getSelectionCell());null!=l&&(t=l.style[o]||t);var s=new GE.FilenameDialog(this.editorUi,t,mxResources.get("apply"),mxUtils.bind(this,function(t){if(null!=t&&t.length>0){e.getModel().beginUpdate();try{e.stopEditing(!1),e.setCellStyles(o,t)}finally{e.getModel().endUpdate()}null!=r&&r(t)}}),mxResources.get("enterValue")+(n.length>0?" "+n:""));this.editorUi.showDialog(s.container,300,80,!0,!0),s.init()}),l,u,s)},GE.Menus.prototype.pickColor=function(e,t,n){var i=this.editorUi.editor.graph,o=226+17*(Math.ceil(GE.ColorDialog.prototype.presetColors.length/12)+Math.ceil(GE.ColorDialog.prototype.defaultColors.length/12));if(null!=t&&i.cellEditor.isContentEditing()){var l=i.cellEditor.saveSelection(),s=new GE.ColorDialog(this.editorUi,n||"000000",mxUtils.bind(this,function(e){i.cellEditor.restoreSelection(l),document.execCommand(t,!1,e!=mxConstants.NONE?e:"transparent")}),function(){i.cellEditor.restoreSelection(l)});this.editorUi.showDialog(s.container,230,o,!0,!0),s.init()}else{null==this.colorDialog&&(this.colorDialog=new GE.ColorDialog(this.editorUi)),this.colorDialog.currentColorKey=e;var r=i.getView().getState(i.getSelectionCell()),u="none";null!=r&&(u=r.style[e]||u),"none"==u?(u="ffffff",this.colorDialog.picker.fromString("ffffff"),this.colorDialog.colorInput.value="none"):this.colorDialog.picker.fromString(u),this.editorUi.showDialog(this.colorDialog.container,230,o,!0,!0),this.colorDialog.init()}},GE.Menus.prototype.toggleStyle=function(e,t){var n=this.editorUi.editor.graph,i=n.toggleCellStyles(e,t);this.editorUi.fireEvent(new mxEventObject("styleChanged","keys",[e],"values",[i],"cells",n.getSelectionCells()))},GE.Menus.prototype.addMenuItem=function(e,t,n,i,o,l){var s=this.editorUi.actions.get(t);if(null!=s&&(e.showDisabled||s.isEnabled())&&s.visible){var r=e.addItem(l||s.label,null,function(){s.funct(i)},n,o,s.isEnabled());return s.toggleAction&&s.isSelected()&&e.addCheckmark(r,GE.Editor.checkmarkImage),this.addShortcut(r,s),r}return null},GE.Menus.prototype.addShortcut=function(e,t){if(null!=t.shortcut){var n=e.firstChild.nextSibling.nextSibling,i=document.createElement("span");i.style.color="gray",mxUtils.write(i,t.shortcut),n.appendChild(i)}},GE.Menus.prototype.addMenuItems=function(e,t,n,i,o){for(var l=0;l<t.length;l++)"-"==t[l]?e.addSeparator(n):this.addMenuItem(e,t[l],n,i,null!=o?o[l]:null)},GE.Menus.prototype.createPopupMenu=function(e,t,n){e.smartSeparators=!0,this.addPopupMenuHistoryItems(e,t,n),this.addPopupMenuEditItems(e,t,n),this.addPopupMenuStyleItems(e,t,n),this.addPopupMenuArrangeItems(e,t,n),this.addPopupMenuCellItems(e,t,n),this.addPopupMenuSelectionItems(e,t,n)},GE.Menus.prototype.addPopupMenuHistoryItems=function(e,t,n){this.editorUi.editor.graph.isSelectionEmpty()&&this.addMenuItems(e,["undo","redo"],null,n)},GE.Menus.prototype.addPopupMenuEditItems=function(e,t,n){if(this.editorUi.editor.graph.isSelectionEmpty())this.addMenuItems(e,["pasteHere"],null,n);else{const t=this.editorUi.editor.graph.getSelectionCount();1===t?this.addMenuItems(e,["bindProperties","-","delete","-","cut","copy","-","duplicate"],null,n):t>1&&this.addMenuItems(e,["delete","-","cut","copy","-","duplicate"],null,n)}},GE.Menus.prototype.addPopupMenuStyleItems=function(e,t,n){1==this.editorUi.editor.graph.getSelectionCount()?this.addMenuItems(e,["-","setAsDefaultStyle"],null,n):this.editorUi.editor.graph.isSelectionEmpty()&&this.addMenuItems(e,["-","clearDefaultStyle"],null,n)},GE.Menus.prototype.addPopupMenuArrangeItems=function(e,t,n){var i=this.editorUi.editor.graph;i.isSelectionEmpty()||this.addMenuItems(e,["-","toFront","toBack"],null,n),i.getSelectionCount()>1?this.addMenuItems(e,["-","group"],null,n):1==i.getSelectionCount()&&!i.getModel().isEdge(t)&&!i.isSwimlane(t)&&i.getModel().getChildCount(t)>0&&this.addMenuItems(e,["-","ungroup"],null,n)},GE.Menus.prototype.addPopupMenuCellItems=function(e,t,n){var i=this.editorUi.editor.graph;t=i.getSelectionCell();var o=i.view.getState(t);if(e.addSeparator(),null!=o){var l=!1;if(i.getModel().isEdge(t)&&"entityRelationEdgeStyle"!=mxUtils.getValue(o.style,mxConstants.STYLE_EDGE,null)&&"arrow"!=mxUtils.getValue(o.style,mxConstants.STYLE_SHAPE,null)){var s=i.selectionCellsHandler.getHandler(t),r=!1;if(s instanceof mxEdgeHandler&&null!=s.bends&&s.bends.length>2){var u=s.getHandleForEvent(i.updateMouseEvent(new mxMouseEvent(n))),a=this.editorUi.actions.get("removeWaypoint");a.handler=s,a.index=u,r=u>0&&u<s.bends.length-1}e.addSeparator(),this.addMenuItem(e,"turn",null,n,null,mxResources.get("reverse")),this.addMenuItems(e,[r?"removeWaypoint":"addWaypoint"],null,n);var d=i.getModel().getGeometry(t);l=null!=d&&null!=d.points&&d.points.length>0}1==i.getSelectionCount()&&(l||i.getModel().isVertex(t)&&i.getModel().getEdgeCount(t)>0)&&this.addMenuItems(e,["-","clearWaypoints"],null,n),1==i.getSelectionCount()&&i.getModel().isVertex(t)&&null!=mxUtils.getValue(o.style,mxConstants.STYLE_IMAGE,null)&&(e.addSeparator(),this.addMenuItem(e,"image",null,n).firstChild.nextSibling.innerHTML=mxResources.get("editImage")+"...")}},GE.Menus.prototype.addPopupMenuSelectionItems=function(e,t,n){this.editorUi.editor.graph.isSelectionEmpty()&&this.addMenuItems(e,["-","selectVertices","selectEdges","selectAll"],null,n)},GE.Menus.prototype.createMenubar=function(e){for(var t=new GE.Menubar(this.editorUi,e),n=this.defaultMenuItems,i=0;i<n.length;i++)mxUtils.bind(this,function(e){var o=t.addMenu(mxResources.get(n[i]),mxUtils.bind(this,function(){e.funct.apply(this,arguments)}));this.menuCreated(e,o)})(this.get(n[i]));return t},GE.Menus.prototype.menuCreated=function(e,t,n){null!=t&&(n=null!=n?n:"geItem",e.addListener("stateChanged",function(){t.enabled=e.enabled,e.enabled?t.className=n:t.className=n+" mxDisabled"}))},GE.Menubar=function(e,t){this.editorUi=e,this.container=t},GE.Menubar.prototype.hideMenu=function(){this.editorUi.hideCurrentMenu()},GE.Menubar.prototype.addMenu=function(e,t,n){var i=document.createElement("a");return i.className="geItem",mxUtils.write(i,e),this.addMenuHandler(i,t),null!=n?this.container.insertBefore(i,n):this.container.appendChild(i),i},GE.Menubar.prototype.addMenuHandler=function(e,t){if(null!=t){var n=!0,i=mxUtils.bind(this,function(i){if(n&&null==e.enabled||e.enabled){this.editorUi.editor.graph.popupMenuHandler.hideMenu();var o=new mxPopupMenu(t);o.div.className+=" geMenubarMenu",o.smartSeparators=!0,o.showDisabled=!0,o.autoExpand=!0,o.hideMenu=mxUtils.bind(this,function(){mxPopupMenu.prototype.hideMenu.apply(o,arguments),this.editorUi.resetCurrentMenu(),o.destroy()});var l=mxUtils.getOffset(e);o.popup(l.x,l.y+e.offsetHeight,null,i),this.editorUi.setCurrentMenu(o,e)}mxEvent.consume(i)});mxEvent.addListener(e,"mousemove",mxUtils.bind(this,function(t){null!=this.editorUi.currentMenu&&this.editorUi.currentMenuElt!=e&&(this.editorUi.hideCurrentMenu(),i(t))})),mxEvent.addListener(e,GE.IS_POINTER?"pointerdown":"mousedown",mxUtils.bind(this,function(t){n=this.currentElt!=e,t.preventDefault()})),mxEvent.addListener(e,"click",mxUtils.bind(this,function(e){i(e),n=!0}))}},GE.Menubar.prototype.destroy=function(){},GE.Menu=function(e,t){mxEventSource.call(this),this.funct=e,this.enabled=null==t||t},mxUtils.extend(GE.Menu,mxEventSource),GE.Menu.prototype.isEnabled=function(){return this.enabled},GE.Menu.prototype.setEnabled=function(e){this.enabled!=e&&(this.enabled=e,this.fireEvent(new mxEventObject("stateChanged")))},GE.Menu.prototype.execute=function(e,t){this.funct(e,t)},GE.EditorUi.prototype.createMenus=function(){return new GE.Menus(this)};