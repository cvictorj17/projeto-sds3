
import Chart from 'react-apexcharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/requests';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import Spinner from 'react-bootstrap/Spinner';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
    loading: boolean;
}

const BarCharts = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ],
        loading: true
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then((response) => {
                const data = response.data as SaleSuccess[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => round(100. * x.deals / x.visited, 1));

                setChartData({
                    labels: {
                        categories: myLabels
                    },
                    series: [
                        {
                            name: "% Success",
                            data: mySeries
                        }
                    ],
                    loading: false
                });
            });
    }, [])

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    // const mockData = {
    //     labels: {
    //         categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //     },
    //     series: [
    //         {
    //             name: "% Sucesso",
    //             data: [43.6, 67.1, 67.7, 45.6, 71.1]
    //         }
    //     ]
    // };

    return (
        chartData.loading ?
            <div style={{textAlign:'center', marginTop:'40px'}}>
                <Spinner animation="border" />
            </div>
            :
            <Chart
                options={{ ...options, xaxis: chartData.labels }}
                series={chartData.series}
                type="bar"
                height="240"
            />
    );
}

export default BarCharts;