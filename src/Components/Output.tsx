import createPlotlyComponent from "react-plotly.js/factory";

import {BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import { RootState } from "src/store/store";
import { useSelector } from "react-redux";
import { Header } from "semantic-ui-react";

const Plotly = require("plotly.js-gl3d-dist");

interface Props {}

const Output = (props: Props) => {
  const Plot = createPlotlyComponent(Plotly);

  const regressionLineData = useSelector(
    (state: RootState) => state.Data.regressionLineData
  );
  const inputData = useSelector((state: RootState) => state.Data.inputData);
  const outputData = useSelector((state: RootState) => state.Data.outputData);

  return (
    <div className="flexStartVertically">
      <Plot
        data={[
          {
            name: "regression line",
            x: regressionLineData[0],
            y: regressionLineData[1],
            type: "scatter",
            mode: "lines",
            line: {
              color: "rgb(219, 64, 82)",
              width: 2,
            },
          },
          {
            name: "data",
            type: "scatter",
            x: inputData[0],
            y: inputData[1],
            mode: "markers",
            marker: { color: "green" },
          },
        ]}
        layout={{
          // width:,
          title: "Data with regression",
        }}
        config={{ staticPlot: true }}
      />
      <BlockMath>{outputData.latexEquation}</BlockMath>
      <div className="flexAroundHorizontally">
        <Header>
          a = {outputData.values[0]} b = {outputData.values[1]}
        </Header>
      </div>
    </div>
  );
};

export default Output;
