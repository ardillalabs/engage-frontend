import React from 'react';
import { Bar } from "react-chartjs-2";


const Barchart = ({chartData }: any) => {
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri' ,'Sat'];


    return (
        <div>
            <Bar
                data = {chartData}
                options = {{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default Barchart;