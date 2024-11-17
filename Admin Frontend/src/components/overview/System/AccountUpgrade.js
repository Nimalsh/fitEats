import React, { Component } from 'react'
import Chart from "chart.js/auto";
import classes from "./LineGraph.module.css";

export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const ChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(ChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                        fill: {
                            target: 'origin',
                            above: 'rgba(149, 205, 65, 0.15)',   // Area will be red above the origin
                        },
                        borderColor: "#95CD41",
                        borderCapStyle : "round"
                    }
                ]
            },
            options: {
                responsive: true,
            }
        });
    }
    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}