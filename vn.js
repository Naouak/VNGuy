var appname = "MyApp";
var wid = "vn";
var name = "MyWidget";

YUI.add(wid, function(Y) {


var Lang = Y.Lang;


function W(config) {
    W.superclass.constructor.apply(this, arguments);
}
W.NAME = wid;

W.ATTRS = {
};

W.HTML_PARSER = {
};

W.MYNODE_TEMPLATE = "<div id={mynodeid}></div>";

Y.extend(W, Y.Widget, {

    initializer: function() {
    },

    destructor : function() {
    },

    renderUI : function() {
    // this._mynode = Node.create(Y.substitute(W.MYNODE_TEMPLATE, {mynodeid: this.get("id") + "_mynode"}));
    },

    bindUI : function() {
    },

    syncUI : function() {
    }
});

Y.namespace(appname)[name] = W;

}, "3.4.0", {requires:["widget", "substitute"]});

