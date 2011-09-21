YUI.add("Choice",function(Y){
    function Event(){
        Event.superclass.constructor.apply(this,arguments);
    }

	Event.NAME = "CallScript";

	Event.ATTRS = {
		ui: {
			value: undefined
		},
		choices: {
			value: []
		},
		text: {
			value: undefined
		},
		done: {
			value: false
		},
		EventList: {
			value: undefined
		}
	}

    Y.extend(Event, Y.VN.Event, {
		initializer: function(){
		},
		addToUI: function(UI){
			this.set("ui",UI);
			var node = Y.Node.create("<ul class='choice'><h1>"+this.get("text")+"</h1></ul>");
			node.setStyle("z-index","10001");
			node.setStyle("position","absolute");
			node.setStyle("top","10%");
			node.setStyle("left","40%");
			node.setStyle("width","20%");
			node.setStyle("background","white");
			var c = this.get("choices");
			for(var i =0;i < c.length;i++){
				//(function(i){
					var n = Y.Node.create("<li>"+c[i].text+"</li>");
					n.setData("id",i);
					node.append(n);
					n.on("click",Y.bind(this.choiceSelected,this));
				//})(i);
			}
			UI.get("contentBox").append(node);
		},
		removeFromUI: function(){
		},
		addToList: function(EventList){
			this.set("EventList",EventList);
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
		},
		choiceSelected: function(e){
			var i = e.currentTarget.getData("id");
			var c = this.get("choices");

			e.currentTarget.get("parentNode").remove();

			this.set("done",true);
			this.get("EventList").newEvent(new Y.VNEvent.Goto({script:c[i].script}));
		}
    });

    Y.namespace("VNEvent").Choice = Event;


},"0.0.1",{requires:["Flow","vn-event"]});