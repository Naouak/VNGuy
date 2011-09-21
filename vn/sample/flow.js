YUI.add("Flow",function(Y){
    function Event(){
        Event.superclass.constructor.apply(this,arguments);
    }

	Event.NAME = "CallScript";

	Event.ATTRS = {
		script: {
			value: undefined
		},
		done: {
			value: false
		}
	}

    Y.extend(Event, Y.VN.Event, {
		initializer: function(){
		},
		addToUI: function(UI){
		},
		removeFromUI: function(){
		},
		addToList: function(EventList){
			EventList.once("scriptLoaded",Y.bind(function(){
				Y.log("Hey Listen !");
				this.set("done",true);
			},this));
			Y.bind(EventList.stackScript,EventList)(this.get("script"));
		},
		removeFromList: function(){
		},
		destroy: function(){
		},
		hasFinished: function(){
			return this.get("done");
		},
		isBlocking: function(){
			return !this.get("done");
		}
    });

    Y.namespace("VNEvent").CallScript = Event;


},"0.0.1",{requires:["vn-event"]});