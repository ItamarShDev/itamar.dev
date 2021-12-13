import useChartSettings, {
    ChartSettings,
} from "components/charts/chart-settings";
import { Input } from "components/input";
import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

class CustomEventHandler {
    subscribe(eventName: any, cb: any) {
        window.addEventListener(eventName, cb);
    }

    unsubscribe(eventName: any, cb: any) {
        window.removeEventListener(eventName, cb);
    }

    emit(eventName: any, payload: any) {
        window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
    }
}

const EventHandler = new CustomEventHandler();

// mimic response

function randomChartData(id: number) {
    const socialData = {
        title: `Chart #${id}`,
        labels: ["1 week", "1 month", "4 months", "6 months", "1 year"],
        values: [
            {
                title: "Learning",
                values: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                settings: { fill: false },
            },
            {
                title: "Mingeling",
                values: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                settings: { fill: false },
            },
            {
                title: "Involvement",
                values: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                settings: { fill: false },
            },
        ],
    };

    return socialData;
}
export class EventRouter {
    eventHandler: CustomEventHandler;
    interval: NodeJS.Timeout = null;
    constructor() {
        this.eventHandler = EventHandler;
    }

    fetchChartsData(chartIds: number[]) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            chartIds.forEach((id: number) => {
                this.eventHandler.emit(id + "::data", {
                    data: randomChartData(id),
                });
            });
        }, 3000);
    }
}

function Chart({ chartId }) {
    const [chartData, setChartData] = React.useState(randomChartData(chartId));
    const { data, lineOptions }: ChartSettings = useChartSettings(chartData);
    function chartEventHadler(event) {
        if (event.detail.data) {
            setChartData(event.detail.data);
        }
    }
    useEffect(() => {
        EventHandler.subscribe(chartId + "::data", chartEventHadler);
        return () => {
            EventHandler.unsubscribe(chartId + "::data", chartEventHadler);
        };
    }, [chartId]);
    if (data) {
        return <Line data={data} options={lineOptions} />;
    }
    return null;
}

export default function ChartsCommunicationExample() {
    const [numberOfCharts, setNumberOfCharts] = useState(5);
    const chart_ids = Array.from(Array(numberOfCharts).keys());
    const [chartIds, setChartIds] = useState(chart_ids);
    const router = useMemo(() => new EventRouter(), []);

    useEffect(() => {
        setChartIds(Array.from(Array(numberOfCharts).keys()));
    }, [numberOfCharts]);

    useEffect(() => {
        router.fetchChartsData(chartIds);
    }, [chartIds]);

    return (
        <>
            <section>
                <Input
                    label="Set number of charts"
                    type="number"
                    name="Number of charts"
                    id="charts-number"
                    defaultValue={numberOfCharts}
                    onChange={(e) => setNumberOfCharts(Number(e.target.value))}
                />
            </section>
            <section>
                {chartIds.map((id) => (
                    <div className="chart" key={id}>
                        <Chart chartId={id} />
                    </div>
                ))}
            </section>
            <style jsx>{`
                section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    grid-template-rows: repeat(auto-fit, 1fr);
                    gap: 10px;
                }
            `}</style>
        </>
    );
}
