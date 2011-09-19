YUI.add("BG",function(Y){
    function Event(){
        Event.superclass.constructor.apply(this,arguments);
    }

	Event.NAME = "BG";

	Event.ATTRS = {
		UI: {
			value: undefined
		},
		backgrounds: {
			value: {}
		}
	}

    Y.extend(Event, Y.VN.Event, {
		initializer: function(){
		},
		addToUI: function(UI){
			this.set("UI",UI);
		},
		removeFromUI: function(){
		},
		addToList: function(EventList){
			EventList.registerEvent("background",this);
		},
		removeFromList: function(){
		},
		destroy: function(){
		},
		hasFinished: function(){
			return false;
		},
		loadBackground: function(name,file){
			Y.log("Adding "+name);
			var n = Y.Node.create("<img src='"+file+"' class='bg' style='position: absolute;top:0px; left: 0px; z-index: 0;' />");
			var bg = this.get("backgrounds");
			bg[name] = n;
			this.set("backgrounds",bg);
		},
		changeBackground: function(bg){
			var ui = this.get("UI");
			var c = ui.get("contentBox");
			//Y.log(bg);
			//c.append(this.get("backgrounds")[bg]);
			var o = c.one(".bg");
			var n = this.get("backgrounds."+bg);
			//Y.log(o);
			//Y.log(n);
			//Y.log(c);
			if(n != undefined)
				c.append(n);
			if(o != null)
				o.remove();
			//c.setStyle("background","url("+bg+")");
		}
    });

    Y.namespace("VNEvent").BG = Event;

	function Event2(){
        Event2.superclass.constructor.apply(this,arguments);
    }

	Event2.ATTRS = {
		bg: {
			value: undefined
		}
	}

	Event2.NAME = "BG2";

    Y.extend(Event2, Y.VN.Event, {
		addToList: function(evt){
			var bg = evt.get("registeredEvents")["background"];
			Y.bind(bg.changeBackground(this.get("bg")),bg);
		},
		hasFinished: function(){
			return true;
		}
    });

	Y.namespace("VNEvent").BG2 = Event2;

	function Event3(){
        Event3.superclass.constructor.apply(this,arguments);
    }

	Event3.ATTRS = {
		name: {
			value: undefined
		},
		file: {
			value: undefined
		}
	}

	Event3.NAME = "PreloadBG";

    Y.extend(Event3, Y.VN.Event, {
		addToList: function(evt){
			var bg = evt.get("registeredEvents")["background"];
			Y.bind(bg.loadBackground,bg)(this.get("name"),this.get("file"));
		},
		hasFinished: function(){
			return true;
		}
    });

	Y.namespace("VNEvent").PreloadBG = Event3;


},"0.0.1",{requires:["vn-event"]});