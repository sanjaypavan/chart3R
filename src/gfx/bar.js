/**
/**
 * A normal 2d bar chart capable of being rendered in horizontal and vertical manner
 * @param {Object} graphdef Definition of the graph being rendered
 * @param {Object} config   Configuration of the graph being rendered
 */
uv.BarGraph = function (graphdef, config) {
	var self = this;
	uv.Graph.call(self).setDefaults(graphdef, config).init(graphdef, config);

	self.bargroups = {};

	self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(self.labels);

	var idx, length = self.categories.length, category;
	for (idx = 0; idx < length; idx = idx + 1) {
		category = self.categories[idx];
		self.bargroups[category] = self.panel.append('g').attr('class', 'r3_bargroup').classed('cg_' + category, true);
		self['draw' + self.config.graph.orientation + 'Bars'](idx);
	}

	self.finalize();
};

uv.BarGraph.prototype = uv.util.extend(uv.Graph);

uv.BarGraph.prototype.setDefaults = function (graphdef, config) {
	graphdef.stepup = false;
	return this;
};

uv.BarGraph.prototype.drawHorizontalBars = function (idx) {
	var self = this,
		color = uv.util.getColorBand(this.config, idx),
		len = self.categories.length;
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
				.append('g').attr('class', 'cge_' + self.categories[idx].replace(' ', '_', 'gim'));
	
	bars.append('rect')
		.attr('class', self.id + '_' + self.categories[idx])
		.classed('cr_' + self.categories[idx], true)
		.attr('height', self.axes.ver.scale.rangeBand() / len)
		.attr('x', 0)
		.attr('y', function (d) {return self.axes.ver.scale(d.name); })
		.style('stroke', self.config.bar.strokecolor)
		.style('fill', color)
		.on('mouseover', uv.effects.bar.mouseover(self, idx))
		.on('mouseout', uv.effects.bar.mouseout(self, idx))
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('width', function (d) { return self.axes.hor.scale(d.value); });

	bars.append('text')
		.attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
		.attr('dx', 4)
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.classed('cr_' + self.categories[idx], true)
		.style('fill', 'none')
		.style('font-family', self.config.bar.fontfamily)
		.style('font-size', self.config.bar.fontsize)
		.style('font-weight', self.config.bar.fontweight)
		.text(function(d) { return String(d.value); })
		.transition()
			.duration(self.config.effects.duration)
			.delay(function (d, i) { return i * self.config.effects.duration; })
			.attr('x', function (d) { return self.axes.hor.scale(d.value); });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	self.bargroups[self.categories[idx]].attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

uv.BarGraph.prototype.drawVerticalBars = function (idx) {
	var self = this,
		color = uv.util.getColorBand(this.config, idx),
		len = self.categories.length;
	
	bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
			.append('g').attr('class', 'cge_' + self.categories[idx].replace(' ', '_', 'gim'));
	
	bars.append('rect')
			.attr('class', self.id + '_' + self.categories[idx])
			.classed('cr_' + self.categories[idx], true)
			.attr('height', 0)
			.attr('width', 0)
			.attr('x', function (d) {return self.axes.hor.scale(d.name); })
			.attr('y', 0)
			.style('stroke', self.config.bar.strokecolor).style('fill', color)
			.on('mouseover', uv.effects.bar.mouseover(self, idx))
			.on('mouseout', uv.effects.bar.mouseout(self, idx))
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('height', function (d) { return self.height() - self.axes.ver.scale(d.value); })
				.attr('width', self.axes.hor.scale.rangeBand() / len);
	
	bars.append('text').attr('transform','scale(1,-1)')
			.attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
			.attr('y', -10)
			.attr('dx', 0)
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.classed('cr_' + self.categories[idx], true)
			.style('fill', 'none')
			.style('font-family', self.config.bar.fontfamily)
			.style('font-size', self.config.bar.fontsize)
			.style('font-weight', self.config.bar.fontweight)
			.text(function(d) { return String(d.value); })
			.transition()
				.duration(self.config.effects.duration)
				.delay(idx * self.config.effects.duration)
				.attr('y', function (d) { return -(self.height() - self.axes.ver.scale(d.value)) - 10; });
	
	bars.append('svg:title')
		.text( function (d, i) { return self.categories[idx] + ' [' + self.labels[i] + '] : ' + d.value;});
	
	self.bargroups[self.categories[idx]].attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + self.height() + ') scale(1,-1)');
};