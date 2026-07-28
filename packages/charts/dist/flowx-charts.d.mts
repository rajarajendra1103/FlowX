interface ChartDataset {
    label?: string;
    data: number[];
    color?: string;
    fill?: boolean;
}
interface ChartDataPayload {
    labels?: string[];
    datasets?: ChartDataset[];
    series?: Array<{
        name: string;
        value: number;
        color?: string;
    }>;
    values?: number[];
    value?: number;
    change?: number;
    zones?: Array<{
        min: number;
        max: number;
        color: string;
    }>;
}
declare abstract class FlowXChartBase extends HTMLElement {
    protected chartData: ChartDataPayload;
    private observer;
    constructor();
    connectedCallback(): void;
    refreshData(newData: ChartDataPayload): void;
    protected readDataPayload(): void;
    private setupLazyLoad;
    fetchChartData(endpoint: string): Promise<void>;
    private setupLiveUpdateListeners;
    protected generateAccessibilityAttrs(title: string, summary: string): {
        ariaLabel: string;
    };
    abstract renderChart(): void;
}

declare class FlowXBarChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXLineChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXAreaChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXPieChart extends FlowXChartBase {
    renderChart(): void;
    protected getSectorPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string;
}

declare class FlowXDonutChart extends FlowXPieChart {
    renderChart(): void;
}

declare class FlowXRadarChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXScatterChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXBubbleChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXHeatmap extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXTreemap extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXGauge extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXSparkline extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXFinancialChart extends FlowXChartBase {
    renderChart(): void;
}

declare class FlowXDashboardWidget extends HTMLElement {
    constructor();
    connectedCallback(): void;
    private render;
}

declare class FlowXKpiCard extends FlowXChartBase {
    renderChart(): void;
}

export { type ChartDataPayload, type ChartDataset, FlowXAreaChart, FlowXBarChart, FlowXBubbleChart, FlowXChartBase, FlowXDashboardWidget, FlowXDonutChart, FlowXFinancialChart, FlowXGauge, FlowXHeatmap, FlowXKpiCard, FlowXLineChart, FlowXPieChart, FlowXRadarChart, FlowXScatterChart, FlowXSparkline, FlowXTreemap };
