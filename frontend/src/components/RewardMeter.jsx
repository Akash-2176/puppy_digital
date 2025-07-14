import LiquidFillGauge from "react-liquid-gauge";

export default function RewardMeter({ progress }) {
  const radius = 120;
  const fillColor = "#4cafef";

  const gradientStops = [
    {
      key: "0%",
      stopColor: fillColor,
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: "#4caf50",
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: "#81c784",
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  return (
    <div style={{ width: radius * 2, margin: "auto" }}>
      <LiquidFillGauge
        width={radius * 2}
        height={radius * 2}
        value={progress}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={2}
        gradient
        gradientStops={gradientStops}
        circleStyle={{ fill: "#ddd" }}
        textStyle={{ fill: "#444", fontSize: "1.2em" }}
        waveTextStyle={{ fill: "#fff", fontSize: "1.2em" }}
      />
    </div>
  );
}
