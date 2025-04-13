import {
  VictoryPie,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const DoughnutChart = ({ errorMsg, data, total, colors, label }) => {
  return (
    <>
      {errorMsg == "" ? (
        <svg viewBox="0 0 400 400" className="w-full h-[400px]">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            innerRadius={110}
            padAngle={1}
            data={data.items?.map((item) => ({
              x: item.category,
              y: item.percentage,
            }))}
            theme={VictoryTheme.clean}
            colorScale={colors}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
            x={200}
            y={190}
            text={total}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 13,
              fontWeight: 300,
              fontFamily: "sans-serif",
            }}
            x={200}
            y={210}
            text={label}
          />
        </svg>
      ) : (
        <p className="my-auto py-15">Data not found</p>
      )}
    </>
  );
};

export default DoughnutChart;
