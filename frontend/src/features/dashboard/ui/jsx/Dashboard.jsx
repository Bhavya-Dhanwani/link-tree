"use client";

import { useState } from "react";
import Navbar from "@/features/shared/Navbar";
import Footer from "@/features/shared/Footer";
import DashboardTabs from "./DashboardTabs";
import DashboardForm from "./DashboardForm";
import ViewLinks from "./ViewLinks";
import DeletedLinks from "./DeletedLinks";
import Analysis from "./Analysis";
import ProfileTab from "./ProfileTab";
import styles from "../css/Dashboard.module.css";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("Add Link");

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.content}>
                <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
                {activeTab === "Add Link" && <DashboardForm />}
                {activeTab === "View Links" && <ViewLinks />}
                {activeTab === "Deleted Links" && <DeletedLinks />}
                {activeTab === "Analysis" && <Analysis />}
                {activeTab === "Profile" && <ProfileTab />}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
