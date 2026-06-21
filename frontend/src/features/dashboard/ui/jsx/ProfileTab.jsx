"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/context/AuthContext";
import { updateUsername } from "@/features/auth/api/auth.api";
import ProfilePictureUpload from "@/features/auth/ui/jsx/ProfilePictureUpload";
import useUsernameCheck from "@/features/auth/hooks/useUsernameCheck";
import styles from "../css/ProfileTab.module.css";

function ProfileTab() {
    const { user, loginUser } = useAuth();
    const [newUsername, setNewUsername] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const { status: usernameStatus, formatError } = useUsernameCheck(newUsername);

    const hasChanged = newUsername.trim() !== "" && newUsername.trim() !== user?.username;
    const canSave = hasChanged && (usernameStatus === "available") && !formatError;

    async function handleSave() {
        if (!canSave) return;

        setIsSaving(true);
        try {
            const response = await updateUsername(newUsername.trim());
            loginUser(response.data);
            setNewUsername("");
            toast.success("Username updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update username");
        } finally {
            setIsSaving(false);
        }
    }

    function getUsernameHint() {
        if (formatError) return { text: formatError, color: "#ff4757" };
        if (usernameStatus === "checking") return { text: "Checking...", color: "#888" };
        if (usernameStatus === "available") return { text: "Available", color: "#10b981" };
        if (usernameStatus === "taken") return { text: "Already taken", color: "#ff4757" };
        return { text: "", color: "" };
    }

    const hint = getUsernameHint();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Profile Settings</h2>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Profile Picture</h3>
                <div className={styles.pfpRow}>
                    <ProfilePictureUpload />
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Change Username</h3>
                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder={user?.username}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button
                        className={styles.saveBtn}
                        onClick={handleSave}
                        disabled={!canSave || isSaving}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
                {hasChanged && hint.text && (
                    <p className={styles.hint} style={{ color: hint.color }}>{hint.text}</p>
                )}
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Account Info</h3>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Username</span>
                    <span className={styles.value}>{user?.username}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Email</span>
                    <span className={styles.value}>{user?.email}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileTab;
