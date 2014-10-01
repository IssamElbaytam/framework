define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var Text = function (x, y, text) {
        this.init ();
        init (this, x, y, text);
    };

    Text.id = 'text';

    Text.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Text.prototype = new Element ();
    Text.prototype.constructor = Text;

    function init (self, x, y, text) {
        self.__elem = new renderer(x, y, text);
    }

    Text.prototype.addLine = function (x, y, text) {
        this.__elem.addLine (x, y, text);
    };

    return Text;
});