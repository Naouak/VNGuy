YUI.add("Text",function(Y){
    function Event(){
        Event.superclass.constructor.apply(this,arguments);
    }

	Event.NAME = "Text";

	Event.ATTRS = {
		UI: {
			value: undefined
		},
		textArea: {
			value: undefined
		},
		texttoadd: {
			value: ""
		}
	}

    Y.extend(Event, Y.VN.Event, {
		initializer: function(){
		},
		addToUI: function(UI){
			this.set("UI",UI);
			cb = UI.get("contentBox");
			Y.log(cb);
			var txtarea = Y.Node.create(
				"<div style='z-index: 5000; border-radius: 10px; background: RGBA(0,0,0,0.7);color: white;padding: 10px; width: 90%; height: 10%; font-family: sans-serif;position: absolute; top: 85%; left: 5%; right: 5%;font-size: 120%;'></div>"
			);
			Y.log(txtarea);
			this.set("textArea",txtarea);
			cb.append(txtarea);
		},
		removeFromUI: function(){
		},
		addToList: function(EventList){
			EventList.registerEvent("text",this);
			EventList.get("registeredEvents")["action"].on("clickAction",Y.bind(this.endText,this));
		},
		removeFromList: function(){
		},
		destroy: function(){
		},
		hasFinished: function(){
			return false;
		},
		addText: function(str){
			this.set("texttoadd",this.get("texttoadd")+str);
		},
		clearText: function(){
			this.set("texttoadd","");
			this.get("textArea").setContent("");
		},
		endText: function(){
			var str = (this.get("textArea").getContent()+this.get("texttoadd"));
			this.get("textArea").setContent(str);
			this.set("texttoadd","");
		},
		think: function(){
			var str = this.get("texttoadd");
			if(str.length == 0)
				return;

			var txt = this.get("textArea");
			txt.setContent(txt.getContent()+this.getNextChar());

		},
		getNextChar: function(){
			var str = this.get("texttoadd");
			var ret = str.substr(0,1);
			str = str.substr(1);
			this.set("texttoadd",str);

			if(ret == " "){
				ret+=this.getNextChar();
			}
			return ret;
		},
		isBlocking: function(){
			if(this.get("texttoadd").length == 0)
				return false;
			return true;
		}
    });

    Y.namespace("VNEvent").Text = Event;

	function Event2(){
        Event2.superclass.constructor.apply(this,arguments);
    }

	Event2.ATTRS = {
		text: {
			value: undefined
		}
	}

	Event2.NAME = "Text2";

    Y.extend(Event2, Y.VN.Event, {
		addToList: function(evt){
			var t = evt.get("registeredEvents")["text"];
			Y.log(this.get("text"));
			Y.bind(t.addText(this.get("text")),t);
		},
		hasFinished: function(){
			return true;
		}
    });

	Y.namespace("VNEvent").AddText = Event2;

	function Event3(){
        Event3.superclass.constructor.apply(this,arguments);
    }

	Event3.ATTRS = {
	}

	Event3.NAME = "Text2";

    Y.extend(Event3, Y.VN.Event, {
		addToList: function(evt){
			var t = evt.get("registeredEvents")["text"];
			Y.bind(t.clearText,t)();
		},
		hasFinished: function(){
			return true;
		}
    });

	Y.namespace("VNEvent").ClearText = Event3;


},"0.0.1",{requires:["vn-event"]});