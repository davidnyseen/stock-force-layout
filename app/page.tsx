"use client"
// ClusteredBubblesComponent.jsx
import React, { useEffect, useState } from 'react';
import FormComponent from './FormComponent';
import ChartComponent from './ChartComponent';
import * as d3 from 'd3';

export default function ClusteredBubblesComponent() {
  const [numberOfNodes, setNumberOfNodes] = useState(200);
  const [numberOfClusters, setNumberOfClusters] = useState(10);
  const [showGroupedCircles, setShowGroupedCircles] = useState(true);
  const [chartWidth, setChartWidth] = useState(600);
  const [chartHeight, setChartHeight] = useState(600);
  const [bubbleData, setBubbleData] = useState({ children: [] });

  useEffect(() => {
    const generateData = () => {
      const generatedData = {
        children: Array.from(
          d3.group(
            Array.from({ length: numberOfNodes }, (_, i) => ({
              group: Math.random() * numberOfClusters | 0,
              value: -Math.log(Math.random())
            })),
            (d) => d.group
          ),
          ([, children]) => ({ children })
        )
      };
      setBubbleData(generatedData);
    };

    generateData();
  }, [numberOfNodes, numberOfClusters]);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth);
      setChartHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <FormComponent
        checked={showGroupedCircles}
        onChange={() => setShowGroupedCircles(!showGroupedCircles)}
      />
      <ChartComponent
        bubbleData={bubbleData}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        showGroupedCircles={showGroupedCircles}
      />
    </div>
  );
}
