(function(){var t;t=function(){function t(t){this.configs=t,this.FULL_WIDTH=910,this.LARGE_WIDTH=768,this.MEDIUM_WIDTH=525,this.SMALL_WIDTH=400,this.widget=$("#"+this.configs.widgetId),this.expand=this.configs.expandOption||"first_open",this.cpnsUrl=this.configs.cpnsUrl,this.clientUrn=this.configs.clientUrn,this.table=this.widget.find(".directory-table"),this.headers=this.widget.find(".directory-heading"),this.initResize(),this.initHeaders(),this.initPhones(),this.initIE(),this.openHeaders()}return t.prototype.initHeaders=function(){return this.headers.on("click",function(t){var e,i,s,n;return e=$(t.currentTarget),i=e.hasClass("open"),n=e.next(".directory-locations"),i?(e.removeClass("open"),n.removeClass("open"),n.css({"max-height":0})):(e.addClass("open"),n.addClass("open"),s=n.find("table").height(),n.css({"max-height":s+100}))})},t.prototype.openHeaders=function(){if(this.headers&&this.headers.length){if("first_open"===this.expand)return this.headers[0].click();if("all_open"===this.expand)return this.headers.each(function(){return $(this).click()})}},t.prototype.initResize=function(){return $(window).on("resize orientationchange",function(t){return function(){return t.resize()}}(this)),this.resize()},t.prototype.resize=function(){var t,e;return t=this.table.parent(".widget"),e=t.width(),e>=this.FULL_WIDTH?this.setSizeClass("full"):e>=this.LARGE_WIDTH?this.setSizeClass("large"):e>=this.MEDIUM_WIDTH?this.setSizeClass("medium"):e>=this.SMALL_WIDTH?this.setSizeClass("small"):this.setSizeClass("tiny"),this.resizeHeaders()},t.prototype.resizeHeaders=function(){return this.headers.each(function(t,e){var i,s;i=$(e),i.hasClass("open")&&(s=i.next(".directory-locations"),s.css({"max-height":"none"}))})},t.prototype.setSizeClass=function(t){if(!this.table.hasClass(t))return this.clearSizeClasses(),this.table.addClass(t)},t.prototype.clearSizeClasses=function(){return this.table.removeClass("tiny").removeClass("small").removeClass("medium").removeClass("large").removeClass("full")},t.prototype.initPhones=function(){return this.phoneNumber=new PhoneNumber(this.getPhoneConfigs())},t.prototype.getPhoneConfigs=function(){var t;return t={cpnsUrl:this.cpnsUrl,clientUrn:this.clientUrn,locationUrns:this.locationUrns()}},t.prototype.locationUrns=function(){return this.widget.find(".directory-row").map(function(t){return function(t,e){var i;return i=$(e).attr("data-location-urn"),{urn:i,scope:"tr[data-location-urn="+i+"]"}}}(this))},t.prototype.initIE=function(){if(this.isIE())return this.table.addClass("isIE")},t.prototype.isIE=function(){var t;return t=navigator.userAgent,!!(t.match(/iemobile/i)||t.match(/msie/i)||t.match(/trident/i))},t}(),G5.loadWidgetConfigs(".directory .config",t)}).call(this);