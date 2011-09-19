YUI.add("vn-event",function(Y){
    function Event(){
        Event.superclass.constructor.apply(this,arguments);
    }

    Y.extend(Event, Y.Base, {
		initializer: function(){
		},
		addToUI: function(UI){
		},
		removeFromUI: function(){
		},
		addToList: function(EventList){
		},
		removeFromList: function(){
		},
		destroy: function(){
		},
		hasFinished: function(){
		},
		isBlocking: function(){
			return false;
		},
		think: function(){

		}
    });

    Y.namespace("VN").Event = Event;
},"0.0.1",{requires:["base"]});