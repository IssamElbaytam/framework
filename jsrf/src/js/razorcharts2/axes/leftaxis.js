define(['razorcharts2/axes/axis'], function (Axis) {
    var LeftAxis = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: LeftAxisTransformer});
        this.registerTransformer ({key: 'resize', transform: LeftAxisTransformer});
        this.registerTransformer ({key: 'update', transform: LeftAxisUpdateTransformer});
    };

    LeftAxis.prototype = new Axis ();
    LeftAxis.prototype.constructor = LeftAxis;

    function LeftAxisTransformer (self) {
        console.log ('Transformer called!');
        var $ticks = self.$ticks,
            ticks = self.ticks,
            scale = self.scale,
            height = self.coreHeight,
            tickHeight = height / ticks.length,
            maxTickWidth;

        for(var i=0; i<ticks.length; ++i) {
            var y;
            if(self.options.type === 'linear') {
                y = height - scale.calc(ticks[i]) + 8;    
            } else {
                y = height - scale.calc(ticks[i]) - tickHeight / 2;
            }
            
            $ticks[i].translate (-10, y);
            $ticks[i].attr ({
                'text-anchor': 'end'
            });
        }

        self.line.attr({
            x1: 0,
            y1: 0,
            x2: 0,
            y2: height,
            stroke: "#979797",
            "stroke-dasharray": "none"
        });

        if(self.options.type === 'linear') {
            self.line.attr({
                "stroke": "none"
            });
        }

        if(self.hasLabel()) {
            self.$label.text(self.label);
            self.$label.attr({
                'text-anchor': 'middle'
            });
            maxTickWidth =  self.getMaxTickWidth($ticks);
            self.$label.translate(0 - maxTickWidth - self.$label.getBBox().height * 2, height / 2);
            self.$label.rotate(-90);
        }
    };

    function LeftAxisUpdateTransformer (self) {
        console.log('LeftAxisUpdateTransformer called!');
        var $ticks = self.$ticks,
            $cachedTicks = self.$cachedTicks,
            ticks = self.ticks,
            cachedTicks = self.cachedTicks;
            scale = self.scale,
            cachedScale = self.cachedScale,
            height = self.coreHeight;
        cachedScale.range([0, height]);
        for(var i=0; i<ticks.length; ++i) {
            var y;
            if(self.options.type === 'linear') {
                y = height - scale.calc(ticks[i]) + 8;    
            } else {
                y = height - scale.calc(ticks[i]) - tickHeight / 2;
            }
            var oldY = height - cachedScale.calc(ticks[i]) + 8;
            if($ticks[i].__newTick) {
                $ticks[i].attr('opacity', 0);
                $ticks[i].__newTick = false;
            }
            $ticks[i].translate(-10, oldY);
            $ticks[i].attr ({
                'text-anchor': 'end'
            });
            $ticks[i].animate({
                transform: {
                    translate: [-10, y]
                },
                opacity: 1
            });
        }

        for(var i=0; i<cachedTicks.length; i++) {
            var y = height - scale.calc(cachedTicks[i]) + 8;
            (function(_i) {
                $cachedTicks[_i].animate({
                    transform: {
                        translate: [-10, y]
                    },
                    opacity: 0
                }, 500, function () {
                    $cachedTicks[_i].remove();
                });
            })(i);
        }

        self.cache ();
    };

    return LeftAxis;
});