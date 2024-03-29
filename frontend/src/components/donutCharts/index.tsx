
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';
import Spinner from 'react-bootstrap/Spinner';

type ChartData = {
    labels: string[];
    series: number[];
    loading: boolean;
}

const DonutCharts = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [], loading: true });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then((response) => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                setChartData({ labels: myLabels, series: mySeries, loading: false });
            });
    }, [])

    // const mockData = {
    //     series: [477138, 499928, 444867, 220426, 473088],
    //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    // }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        chartData.loading ?
            <div style={{textAlign:'center', marginTop:'40px'}}>
                <Spinner animation="border" />
            </div>
            :
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutCharts;