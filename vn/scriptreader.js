YUI.add("vn-scriptreader",function(Y){
	function ScriptReader(){
		ScriptReader.superclass.constructor.apply(this, arguments);
	}

	ScriptReader.ATTRS = {
		events: {
			value: undefined
		}
	}

	Y.extend(ScriptReader,Y.Base,{
		initializer: function(){
			this.publish("newEvent",{
				emitFacade: false
			});

			this.set("events",[
				new Y.VNEvent.Action(),
				new Y.VNEvent.BG(),
				new Y.VNEvent.PreloadBG({
					name: "bg1",
					file: "background/bg1.jpg"
				}),
				new Y.VNEvent.PreloadBG({
					name: "bg2",
					file: "background/bg2.jpg"
				}),
				new Y.VNEvent.Text(),
				new Y.VNEvent.BG2({
					bg: "bg1"
				}),
				new Y.VNEvent.AddText({
					text: "Ici j'ai mis un premier texte de test, tu vois. Histoire de voir comment le flot du text il est aware."
				}),
				new Y.VNEvent.ClickWait(),
				new Y.VNEvent.BG2({
					bg: "bg2"
				}),
				new Y.VNEvent.ClearText(),
				new Y.VNEvent.AddText({
					text: "Et puis là j'ai retiré le texte parce qu'il était pas assez aware que le suivant arrivait."
				})
			])
		},
		loadFile: function(file){

		},
		requestEvent: function(){
			var e = this.get("events");
			if(e.length == 0)
				return;
			this.fire("newEvent",e[0]);

			e = e.slice(1);
			this.set("events",e);
		}
	});

	Y.namespace("VN").ScriptReader = ScriptReader;
},"0.0.1",{requires:["base","vn-event"]});

