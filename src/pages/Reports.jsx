import React from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Reports = () => {
    // const { data: lastWeekData, loading: lastWeekLoading } = useFetch("https://workasana-backend-wheat.vercel.app/report/last-week")
    const { data: lastWeekData, loading: lastWeekLoading, error: lastWeekError } = useFetch("http://localhost:3000/report/last-week")
    console.log("lastWeekData", lastWeekData)
    // const { data: pendingWorkData, loading: pendingWorkLoading } = useFetch("https://workasana-backend-wheat.vercel.app/report/pending")
    const { data: pendingWorkData, loading: pendingWorkLoading, error: pendingWorkError } = useFetch("http://localhost:3000/report/pending")
    console.log("pendingWorkData", pendingWorkData)

    const { data: closedTasksData, loading: closedTasksLoading, error: closedTasksError } = useFetch("http://localhost:3000/report/closed-tasks")
    console.log("closedTasksData", closedTasksData)

    const tasksClosedByTeams = closedTasksData?.tasks[0]?.closedByTeam
    console.log("tasksClosedByTeams", tasksClosedByTeams)

    const tasksClosedByOwners = closedTasksData?.tasks[0]?.closedByOwners
    console.log("tasksClosedByOwners", tasksClosedByOwners)

    const tasksClosedByProjects = closedTasksData?.tasks[0]?.closedByProject
    console.log("tasksClosedByProjects", tasksClosedByProjects)


    // console.log("lastWeekData", lastWeekData)
    const dataForLastWeek = {
        labels: ['Tasks Completed Last Week', 'Tasks Pending Last Week'],
        datasets: [
            {
                // label: '# of Votes',
                data: [lastWeekData?.tasks?.completedTasks, lastWeekData?.tasks?.pendingTasks,],
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

    const dataForTasksClosedByTeams = {
        labels: tasksClosedByTeams?.map((team) => team.team.name),
        datasets: [
            {
                // label: '# of Votes',
                data: tasksClosedByTeams?.map((team) => team.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const dataForTasksClosedByOwners = {
        labels: tasksClosedByOwners?.map((owner) => owner.owner.name),
        datasets: [
            {
                // label: '# of Votes',
                data: tasksClosedByOwners?.map((owner) => owner.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const dataForTasksClosedByProjects = {
        labels: tasksClosedByProjects?.map((project) => project.project.name),
        datasets: [
            {
                // label: '# of Votes',
                data: tasksClosedByProjects?.map((project) => project.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 mt-5">
                    <h2 className="text-center mb-5">Workasana Reports</h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-5 text-center">
                            <h5 className="mt-3 mb-4">Total Tasks pending and completed of Last Week</h5>
                            {lastWeekError && <p>Failed to fetch data.</p>}
                            {!lastWeekError && lastWeekLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!lastWeekLoading && !lastWeekError && <Pie data={dataForLastWeek} />}
                        </div>
                        <div className="col-md-5 text-center mb-5">
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
                        <div className="col-md-5 text-center">
                            <h5 className="mt-3 mb-4">Total tasks closed by teams</h5>
                            {pendingWorkLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!pendingWorkLoading && <Pie data={dataForTasksClosedByTeams} />}
                        </div>
                        <div className="col-md-5 text-center mb-5">
                            <h5 className="mt-3 mb-4">Total tasks closed by owners</h5>
                            {pendingWorkLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!pendingWorkLoading && <Pie data={dataForTasksClosedByOwners} />}
                        </div>
                        <div className="col-md-5 text-center">
                            <h5 className="mt-3 mb-4">Total tasks closed by projects</h5>
                            {pendingWorkLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!pendingWorkLoading && <Pie data={dataForTasksClosedByProjects} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports