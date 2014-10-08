define(['leonardo/utils/transformutils', 'leonardo/utils/pathutils'], function (TransformUtils, PathUtils) {
    function lerp (v0, v1, t) {
        return v0 + t * (v1 - v0);
    }

    function numberLerpHelper (v0, v1, t) {
        return lerp(+v0, +v1, t);
    }

    function transformLerpHelper (v0, v1, t) {
        v0 = TransformUtils.parseTransformString (v0);
        if(v1.translate) {
            var newTranslate = [lerp(v0.translate[0], v1.translate[0], t), lerp(v0.translate[1], v1.translate[1], t)]
        }
        if(v1.rotate) {
            var newRotate = [lerp(v0.rotate[0], v1.rotate[0], t), v1.rotate[1], v1.rotate[2]]
        }
        var r = TransformUtils.transformObjectToString ({
            translate: newTranslate,
            rotate: newRotate
        });

        return r;
    }

    function pathLerpHelper (v0, v1, t) {
        var v0 = PathUtils.toPathObject (v0),
            v1 = PathUtils.toPathObject (v1),
            pathLerp = PathUtils.pathObjectLerp (v0, v1, t),
            pathString = PathUtils.toPathString (pathLerp);
        return pathString;
    }

    var PropertyInterpolators = {
        x: numberLerpHelper,
        y: numberLerpHelper,
        width: numberLerpHelper,
        height: numberLerpHelper,
        transform: transformLerpHelper,
        opacity: numberLerpHelper,
        cx: numberLerpHelper,
        cy: numberLerpHelper,
        r: numberLerpHelper,
        d: pathLerpHelper,
        x1: numberLerpHelper,
        x2: numberLerpHelper,
        y1: numberLerpHelper,
        y2: numberLerpHelper
    };

    return PropertyInterpolators;
});