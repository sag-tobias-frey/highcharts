(function (H) {
	var Axis = H.Axis,
		SVGRenderer = H.SVGRenderer,
		VMLRenderer = H.VMLRenderer,
		wrap = H.wrap;

/**
 *	Extension to the VML Renderer
 */
if (VMLRenderer) {

	H.setOptions({ animate: false });

	VMLRenderer.prototype.cuboid = SVGRenderer.prototype.cuboid;
	VMLRenderer.prototype.cuboidPath = SVGRenderer.prototype.cuboidPath;

	VMLRenderer.prototype.toLinePath = SVGRenderer.prototype.toLinePath;

	VMLRenderer.prototype.createElement3D = SVGRenderer.prototype.createElement3D;

	VMLRenderer.prototype.arc3d = function (shapeArgs) {
		var result = SVGRenderer.prototype.arc3d.call(this, shapeArgs);
		result.css({ zIndex: result.zIndex });
		return result;
	};

	Highcharts.VMLRenderer.prototype.arc3dPath = Highcharts.SVGRenderer.prototype.arc3dPath;

	Highcharts.wrap(Axis.prototype, 'render', function (proceed) {
		proceed.apply(this, [].slice.call(arguments, 1));
		// VML doesn't support a negative z-index
		if (this.sideFrame) {
			this.sideFrame.css({ zIndex: 0 });
			this.sideFrame.front.attr({ fill: this.sideFrame.color });
		}
		if (this.bottomFrame) {
			this.bottomFrame.css({ zIndex: 1 });
			this.bottomFrame.front.attr({ fill: this.bottomFrame.color });
		}
		if (this.backFrame) {
			this.backFrame.css({ zIndex: 0 });
			this.backFrame.front.attr({ fill: this.backFrame.color });
		}
	});

}
	return H;
}(Highcharts));
