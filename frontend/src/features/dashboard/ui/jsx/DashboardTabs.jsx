"use client";

import styles from "../css/DashboardTabs.module.css";

const TABS = ["Add Link", "View Links", "Deleted Links", "Analysis"];

function DashboardTabs({ activeTab, onTabChange }) {
    return (
        <div className={styles.tabs}>
            {TABS.map((tab) => (
                <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default DashboardTabs;
