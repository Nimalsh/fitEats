import React, { Component, useEffect } from 'react'
import Chart from "chart.js/auto";
import classes from "./LineGraph.module.css";

export default class LineGraph extends Component {
    chartRef = React.createRef();

    constructor(props){
        super(props);
    }
    
    render() {
        
        let orders1= this.props.data;
        // const [orders, setOrders] = React.useState(orders1)
        // console.log(orders)

        return (
            <div className={classes.graphContainer} >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }

    componentDidMount(prevProps) {
        // console.log(props);
        // console.log(orders)
        const ChartRef = this.chartRef.current.getContext("2d");
        console.log(prevProps)
        
        new Chart(ChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Aug", "Sept", "Oct"],
                datasets: [
                    {
                        label: "Sales",
                        data: [5, 6, 9],
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

}