YUI.add("vn-scriptreader",function(Y){
	function ScriptReader(){
		ScriptReader.superclass.constructor.apply(this, arguments);
	}

	ScriptReader.ATTRS = {
		events: {
			value: undefined
		},
		scripts: {
			value: {

			}
		},
		scriptStack: {
			value: []
		},
		baseurl: {
			value: "script/"
		}
	}

	Y.extend(ScriptReader,Y.Base,{
		initializer: function(){
			this.publish("newEvent",{
				emitFacade: false
			});
			this.publish("scriptLoaded",{
				emitFacade: false
			});
			this.loadScript("init");
			this.get("scriptStack").push(["init",0]);
		},
		loadScript: function(script){
			Y.log("test");
			if(this.get("scripts."+script) != undefined){
				return;
			}
			this.set("scripts."+script,{data:[],loaded: false})
			Y.io(this.get("baseurl")+script+".vn",{
				on: {
					success: Y.bind(function(id,o,args){
						var j = Y.JSON.parse(o.responseText);
						this.set("scripts."+script+".data",j);
						this.set("scripts."+script+".loaded",true);
					},this)
				}
			});
		},
		stackScript: function(opt){
			var ss = this.get("scriptStack");
			var c = [opt.script,0];
			ss.push(c);
			this.set("scriptStack",ss);
			this.fire("scriptLoaded",{"script": opt.script,loaded: true});
		},
		gotoScript: function(opt){
			var ss = this.get("scriptStack");
			var c = [opt.script,0];
			ss.pop();
			ss.push(c);
			this.set("scriptStack",ss);
			this.fire("scriptLoaded",{"script": opt.script,loaded: true});
		},
		requestEvent: function(){
			var ss = this.get("scriptStack");
			var length = ss.length-1;
			var c = ss[ss.length-1];
			if(c == undefined){
				return;
			}

			var script = this.get("scripts."+c[0]);
			//If our script is loaded
			if(script != undefined){
				//Has it been loaded yet ?
				if(script.loaded){
					//Fetch the next event, generate it and send it
					var evt = script.data[c[1]];
					var newevt = new Y.VNEvent[evt.name](evt.params);
					this.fire("newEvent",newevt);
					c[1]++;
					//Have we finished the current script ?
					if(c[1] >= script.data.length){
						c = undefined;
					}
				}
				//else it's not loaded yet, try again later
			}
			else{
				//Our script hasnot been even preloaded so let's load it
				this.loadScript(c[0]);
			}
			if(c != undefined){
				//Let's putback our current script in the stack
				if(ss[length][0] == c[0]){
					ss[length] = c;
				}
				//ss.push(c);
			}
			else{
				ss.splice(length,1);
			}
			this.set("scriptStack",ss);
		}
	});

	Y.namespace("VN").ScriptReader = ScriptReader;
},"0.0.1",{requires:["base","io","json","vn-event"]});

