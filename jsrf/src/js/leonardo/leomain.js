/**
 * The main entry point to leonardo
 */

define([
    'leonardo/core/leonardo',
     'leonardo/core/paper',
     'leonardo/renderers/svg/svgmain',
     'leonardo/elements/g',
     'leonardo/elements/text',
     'leonardo/elements/line',
     'leonardo/elements/rect',
     'leonardo/elements/path',
     'leonardo/elements/circle',
     'leonardo/elements/tspan'], function(Leonardo, Paper, SVGRenderer, G, Text, Line, Rect, Path, Circle, Tspan) {
        // Setting the svg renderer as the default
        Leonardo.setRenderer (SVGRenderer);

        // Register elements
        Paper.registerElement (G);
        Paper.registerElement (Text);
        Paper.registerElement (Line);
        Paper.registerElement (Rect);
        Paper.registerElement (Path);
        Paper.registerElement (Circle);
        Paper.registerElement (Tspan);
        return Leonardo;
});