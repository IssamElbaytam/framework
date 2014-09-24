define(['razorcharts2/axes/axis'], function (Axis) {
    var BottomAxis = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: BottomAxisTransformer});
        this.registerTransformer ({key: 'resize', transform: BottomAxisTransformer});
    };

    BottomAxis.prototype = new Axis ();
    BottomAxis.prototype.constructor = BottomAxis;

    function BottomAxisTransformer (self) {
        console.log ('Transformer called!');
        var width = self.coreWidth,
            $ticks = self.$ticks,
            ticks = self.ticks,
            scale = self.scale,
            tickWidth = width / ticks.length;
        
        for(var i=0; i<ticks.length; ++i) {
            var x = scale.calc(ticks[i]) + tickWidth / 2;
            $ticks[i].attr ({
                'transform': 'translate(' + x + ',14)',
                'text-anchor': 'middle'
            });
        }

        self.line.attr ({
            x1: 0,
            y1: 0,
            x2: width,
            y2: 0
        });
    };

    return BottomAxis;
});