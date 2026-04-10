import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { useTooltip, Tooltip } from "@visx/tooltip";
import { useThemeColors } from "@/shared/theme";
import { GridRows } from "@visx/grid";

type Props = {
  data: { key: string; count: number }[];
};

export function VisxBarChart({ data }: Props) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ key: string; count: number }>();

  const width = data.length * 80;
  const height = 300;

  const xScale = scaleBand({
    domain: data.map((d) => d.key),
    range: [0, width],
    padding: 0.2,
  });

  const maxValue = Math.max(...data.map((d) => d.count));
  const digits = maxValue.toString().length;
  const dynamicLeft = Math.max(40, digits * 10 + 20);
  const margin = { top: 20, right: 20, bottom: 40, left: dynamicLeft };

  const yScale = scaleLinear({
    domain: [0, maxValue],
    nice: true,
    range: [height - margin.bottom, margin.top],
  });

  const {
    accent,
    accentHover,
    textSecondary,
    border,
  } = useThemeColors();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    let startX = e.pageX - container.offsetLeft;
    let scrollLeft = container.scrollLeft;
    document.body.style.userSelect = "none";

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex">
      <svg width={margin.left} height={height}>
        <g transform={`translate(${margin.left - 10}, 0)`}>
          <AxisLeft
            scale={yScale}
            numTicks={5}
            stroke="none"
            tickStroke="none"
            tickLabelProps={() => ({
              fill: textSecondary,
              fontSize: 12,
              textAnchor: "end",
              dx: "-0.5em",
              dy: "0.25em",
            })}
          />
        </g>
      </svg>

      <div
        className="overflow-x-auto scrollbar select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onWheel={(e) => {
          e.preventDefault();
          const speed = 1.2;
          e.currentTarget.scrollLeft += e.deltaY * speed;
        }}
      >
        <svg width={width} height={height}>
          <g transform={`translate(0,0)`}>
            <GridRows
              scale={yScale}
              width={width}
              stroke={border}
              strokeOpacity={0.2}
            />
            {data.map((d) => {
              const barWidth = xScale.bandwidth();
              const barHeight = (yScale(0) ?? 0) - (yScale(d.count) ?? 0);

              return (
                <rect
                  key={d.key}
                  x={xScale(d.key)}
                  y={yScale(d.count)}
                  width={barWidth}
                  height={barHeight}
                  rx={6}
                  ry={6}
                  fill={tooltipData?.key === d.key ? accentHover : accent}
                  onMouseMove={(e) => {
                    showTooltip({
                      tooltipData: d,
                      tooltipLeft: e.clientX,
                      tooltipTop: e.clientY,
                    });
                  }}
                  onMouseLeave={hideTooltip}
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
              fill: textSecondary,
              fontSize: 12,
              textAnchor: "middle",
            })}
            tickFormat={(value) =>
              value.length > 10 ? value.slice(0, 10) + "…" : value
            }
            numTicks={data.length}
          />
        </svg>
        {tooltipData && (
          <Tooltip top={tooltipTop} left={tooltipLeft}>
            {tooltipData.key}: {tooltipData.count}
          </Tooltip>
        )}
      </div>
    </div>
  );
}