function mxArrow(t,n,o,i,s,e,l){mxShape.call(this),this.points=t,this.fill=n,this.stroke=o,this.strokewidth=null!=i?i:1,this.arrowWidth=null!=s?s:mxConstants.ARROW_WIDTH,this.spacing=null!=e?e:mxConstants.ARROW_SPACING,this.endSize=null!=l?l:mxConstants.ARROW_SIZE}mxUtils.extend(mxArrow,mxShape),mxArrow.prototype.augmentBoundingBox=function(t){mxShape.prototype.augmentBoundingBox.apply(this,arguments);var n=Math.max(this.arrowWidth,this.endSize);t.grow((n/2+this.strokewidth)*this.scale)},mxArrow.prototype.paintEdgeShape=function(t,n){var o=mxConstants.ARROW_SPACING,i=mxConstants.ARROW_WIDTH,s=mxConstants.ARROW_SIZE,e=n[0],l=n[n.length-1],a=l.x-e.x,h=l.y-e.y,r=Math.sqrt(a*a+h*h),x=r-2*o-s,m=a/r,p=h/r,A=x*m,R=x*p,d=i*p/3,u=-i*m/3,S=e.x-d/2+o*m,W=e.y-u/2+o*p,g=S+d,w=W+u,T=g+A,y=w+R,C=T+d,c=y+u,I=C-3*d,O=c-3*u;t.begin(),t.moveTo(S,W),t.lineTo(g,w),t.lineTo(T,y),t.lineTo(C,c),t.lineTo(l.x-o*m,l.y-o*p),t.lineTo(I,O),t.lineTo(I+d,O+u),t.close(),t.fillAndStroke()};