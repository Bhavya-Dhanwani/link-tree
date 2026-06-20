"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getClicksPerLink } from "../../api/link.api";
import styles from "../css/Analysis.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const TIME_OPTIONS = [
    { label: "All Time", value: "" },
    { label: "Last 30 Days", value: "last30d" },
    { label: "This Week", value: "last7d" },
    { label: "Last 24 Hours", value: "last24h" },
];

const COLORS = [
    "#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
    "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1",
];

function getApiErrorMessage(error) {
    return error?.response?.data?.message || error.message || "Something went wrong";
}

function Analysis() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPerLink() {
            try {
                const response = await getClicksPerLink(user.username, selected);
                setData(response.data);
            } catch (error) {
                toast.error(getApiErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }
        fetchPerLink();
    }, [user.username, selected]);

    if (isLoading) {
        return <p className={styles.loading}>Loading analytics...</p>;
    }

    const hasData = data.length > 0;

    const chartData = {
        labels: hasData ? data.map((d) => d.title) : ["No Clicks"],
        datasets: [
            {
                data: hasData ? data.map((d) => d.count) : [1],
                backgroundColor: hasData
                    ? data.map((_, i) => COLORS[i % COLORS.length])
                    : ["#d0d0d0"],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: hasData,
                position: "bottom",
            },
        },
    };

    const totalClicks = data.reduce((sum, d) => sum + d.count, 0);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Click Analytics</h2>
                <select
                    className={styles.select}
                    value={selected}
                    onChange={(e) => {
                        setSelected(e.target.value);
                        setIsLoading(true);
                    }}
                >
                    {TIME_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.chart}>
                <Pie data={chartData} options={chartOptions} />
            </div>

            {hasData && (
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Total Clicks</span>
                        <span className={styles.statValue}>{totalClicks}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Links</span>
                        <span className={styles.statValue}>{data.length}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Analysis;
