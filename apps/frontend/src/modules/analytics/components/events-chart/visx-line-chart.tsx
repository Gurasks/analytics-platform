import { scaleLinear, scalePoint } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { LinePath } from "@visx/shape";
import { GridRows } from "@visx/grid";
import { useTooltip } from "@visx/tooltip";
import { useThemeColors } from "@/shared/theme";
import { useRef } from "react";
import { formatDate } from "@/shared/utils/date";

type Props = {
  data: { key: string; count: number }[];
};

export function VisxLineChart({ data }: Props) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ key: string; count: number }>();

  const colors = useThemeColors();
  const svgRef = useRef<SVGSVGElement>(null);

  const width = Math.max(data.length * 80, 600);
  const height = 300;

  const xScale = scalePoint({
    domain: data.map((d) => d.key),
    range: [0, width],
    padding: 0.5,
  });

  const maxValue = Math.max(...data.map((d) => d.count));
  const digits = maxValue.toString().length;

  const dynamicLeft = Math.max(40, digits * 8 + 24);

  const margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: dynamicLeft,
  };
  const yScale = scaleLinear({
    domain: [0, maxValue * 1.1],
    nice: true,
    range: [height - margin.bottom, margin.top],
  });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const xScaleValues = xScale.domain();
    let closestIndex = -1;
    let minDistance = Infinity;

    xScaleValues.forEach((key, index) => {
      const xPos = xScale(key) ?? 0;
      const distance = Math.abs(mouseX - xPos);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== -1 && minDistance < 50) {
      const closestData = data[closestIndex];
      showTooltip({
        tooltipData: closestData,
        tooltipLeft: e.clientX + 15,
        tooltipTop: e.clientY - 10,
      });
    } else {
      hideTooltip();
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return (
    <div className="flex">
      <svg width={margin.left} height={height} className="sticky left-0 z-10 bg-card">
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke="none"
          tickStroke="none"
          tickLabelProps={() => ({
            fill: colors.textSecondary,
            fontSize: 12,
            textAnchor: "end",
            dx: "-0.5em",
            dy: "0.25em",
          })}
        />
      </svg>

      <div
        className="overflow-x-auto scrollbar"
        onWheel={(e) => {
          e.preventDefault();
          e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <g transform={`translate(0,0)`}>
            <GridRows
              scale={yScale}
              width={width}
              stroke={colors.border}
              strokeOpacity={0.2}
            />

            <LinePath
              data={data}
              x={(d) => xScale(d.key) ?? 0}
              y={(d) => yScale(d.count)}
              stroke={colors.accent}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {data.map((d) => {
              const cx = xScale(d.key);
              const cy = yScale(d.count);

              return (
                <circle
                  key={d.key}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={colors.accent}
                  stroke={colors.bgCard}
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </g>

          <AxisBottom
            top={height - margin.bottom}
            scale={xScale}
            stroke="none"
            tickStroke="none"
            tickLabelProps={() => ({
              fill: colors.textSecondary,
              fontSize: 11,
              textAnchor: "middle",
              dy: "0.5em",
            })}
            tickFormat={(value) => {
              const [year, month, day] = value.split("-");
              const formatted = `${day}-${month}-${year}`;
              return formatted.length > 15 ? formatted.slice(0, 12) + "…" : formatted;
            }}
          />
        </svg>

        {tooltipData && (
          <div
            style={{
              position: "fixed",
              top: tooltipTop,
              left: tooltipLeft,
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              color: colors.textPrimary,
              padding: "8px 12px",
              fontSize: "14px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <strong>{formatDate(tooltipData.key)}</strong>
            <div>Count: {tooltipData.count}</div>
          </div>
        )}
      </div>
    </div>
  );
}