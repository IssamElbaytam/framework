define([], function () {

    var Rect = function () {
        this.transformers = [];
        this.seriesContainers = [];
        this.rects = [];
    };


    Rect.prototype.config = function (_options) {
        this.options = _options;
    };

    Rect.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Rect.prototype.transform = function () {
        for(var i=0; i<this.transformers.length; ++i) {
            (this.transformers[i])(this);
        }
    };

    Rect.prototype.renderTo = function (paper, core, w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.paper = paper;
        this.core = core;
        this.createRects ();
        this.transform ();
    };

    Rect.prototype.resizeTo = function () {
        this.coreWidth = w;
        this.coreHeight = h;
        this.transform ();
    };

    Rect.prototype.createRects = function () {
        var paper = this.paper,
            series = this.options.series;

        for(var i=0; i<series.length; i++) {
            var seriesContainer = paper.g ();
            seriesContainer.attr ('id', 'rc-series-' + series[i].seriesIndex);
            this.rects [i] = [];
            for(var j=0; j<series[i].data.length; j++) {
                var rect = paper.rect (0,0,0,0);
                seriesContainer.append (rect);
                this.rects[i].push (rect);
            }
            this.seriesContainers.push (seriesContainer);
            this.core.append (seriesContainer);
        }            
    };

    return Rect;
});