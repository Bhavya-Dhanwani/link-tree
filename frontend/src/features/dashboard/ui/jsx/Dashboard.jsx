"use client";

import { useState } from "react";
import Navbar from "@/features/shared/Navbar";
import DashboardTabs from "./DashboardTabs";
import DashboardForm from "./DashboardForm";
import ViewLinks from "./ViewLinks";
import DeletedLinks from "./DeletedLinks";
import Analysis from "./Analysis";
import ProfileTab from "./ProfileTab";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("Add Link");

    return (
        <div>
            <Navbar />
            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "Add Link" && <DashboardForm />}
            {activeTab === "View Links" && <ViewLinks />}
            {activeTab === "Deleted Links" && <DeletedLinks />}
            {activeTab === "Analysis" && <Analysis />}
            {activeTab === "Profile" && <ProfileTab />}
        </div>
    );
}

export default Dashboard;
