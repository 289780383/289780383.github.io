function mxEventSource(e){this.setEventSource(e)}mxEventSource.prototype.eventListeners=null,mxEventSource.prototype.eventsEnabled=!0,mxEventSource.prototype.eventSource=null,mxEventSource.prototype.isEventsEnabled=function(){return this.eventsEnabled},mxEventSource.prototype.setEventsEnabled=function(e){this.eventsEnabled=e},mxEventSource.prototype.getEventSource=function(){return this.eventSource},mxEventSource.prototype.setEventSource=function(e){this.eventSource=e},mxEventSource.prototype.addListener=function(e,t){null==this.eventListeners&&(this.eventListeners=[]),this.eventListeners.push(e),this.eventListeners.push(t)},mxEventSource.prototype.removeListener=function(e){if(null!=this.eventListeners)for(var t=0;t<this.eventListeners.length;)this.eventListeners[t+1]==e?this.eventListeners.splice(t,2):t+=2},mxEventSource.prototype.fireEvent=function(e,t){if(null!=this.eventListeners&&this.isEventsEnabled()){null==e&&(e=new mxEventObject),null==t&&(t=this.getEventSource()),null==t&&(t=this);for(var n=[t,e],s=0;s<this.eventListeners.length;s+=2){var r=this.eventListeners[s];null!=r&&r!=e.getName()||this.eventListeners[s+1].apply(this,n)}}};