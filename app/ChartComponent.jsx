// ChartComponent.jsx
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { pack } from 'd3';
import { schemeCategory10 } from 'd3-scale-chromatic';

export default function ChartComponent({ bubbleData, chartWidth, chartHeight, showGroupedCircles }) {
  useEffect(() => {
    const updateChart = () => {
      const root = pack()
        .size([chartWidth, chartHeight])
        .padding(1)(
          d3.hierarchy(bubbleData).sum((d) => d.value)
        );

      const svg = d3.select('#chart-svg');

      svg.selectAll('g').remove(); // Remove existing elements

      if (showGroupedCircles) {
        svg.append('g')
          .attr('fill', 'none')
          .attr('stroke', '#ccc')
          .selectAll('circle')
          .data(root.descendants().filter(d => d.height === 1))
          .join('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.r);
      }

      svg.append('g')
        .selectAll('circle')
        .data(root.leaves())
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.r)
        .attr('fill', d => schemeCategory10[d.data.group]);
    };

    updateChart();

  }, [bubbleData, chartWidth, chartHeight, showGroupedCircles]);

  return <svg id="chart-svg" width={chartWidth} height={chartHeight}></svg>;
}
