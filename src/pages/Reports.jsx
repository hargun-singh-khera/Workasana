import React from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Reports = () => {
    // const { data: lastWeekData, loading: lastWeekLoading } = useFetch("https://workasana-backend-wheat.vercel.app/report/last-week")
    const { data: lastWeekData, loading: lastWeekLoading } = useFetch("https://workasana-backend-wheat.vercel.app/report/last-week")

    // const { data: pendingWorkData, loading: pendingWorkLoading } = useFetch("https://workasana-backend-wheat.vercel.app/report/pending")
    const { data: pendingWorkData, loading: pendingWorkLoading } = useFetch("https://workasana-backend-wheat.vercel.app/report/pending")
    console.log("pendingWorkData", pendingWorkData)

    // console.log("lastWeekData", lastWeekData)
    const dataForLastWeek = {
        labels: ['Tasks Completed Last Week', 'Tasks Pending Last Week'],
        datasets: [
            {
                // label: '# of Votes',
                data: [lastWeekData?.tasks?.completedTasks, lastWeekData?.tasks?.pendingTasks],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataForPendingWork = {
        labels: ['Total Days of Pending Work', 'Total Days of Completed Work'],
        datasets: [
            {
                // label: '# of Votes',
                data: [pendingWorkData?.total?.totalPendingDays, pendingWorkData?.total?.totalCompletedDays],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 mt-5">
                    <h2 className="text-center mb-5">Workasana Reports</h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-5 text-center">
                            <h5 className="mt-3 mb-4">Total Tasks pending and completed of Last Week</h5>
                            {lastWeekLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!lastWeekLoading && <Pie data={dataForLastWeek} />}
                        </div>
                        <div className="col-md-5 text-center">
                            <h5 className="mt-3 mb-4">Total days of pending and completed work</h5>
                            {pendingWorkLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!pendingWorkLoading && <Pie data={dataForPendingWork} />}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Reports