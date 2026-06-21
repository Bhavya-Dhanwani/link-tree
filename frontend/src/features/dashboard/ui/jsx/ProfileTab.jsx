"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/context/AuthContext";
import { updateUsername, updateTheme } from "@/features/auth/api/auth.api";
import ProfilePictureUpload from "@/features/auth/ui/jsx/ProfilePictureUpload";
import useUsernameCheck from "@/features/auth/hooks/useUsernameCheck";
import styles from "../css/ProfileTab.module.css";

const PRESET_COLORS = [
    "#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6",
    "#000000", "#212529", "#343a40", "#495057",
    "#4f46e5", "#06b6d4", "#10b981", "#f59e0b",
    "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6",
];

function ProfileTab() {
    const { user, loginUser } = useAuth();
    const [newUsername, setNewUsername] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [bgColor, setBgColor] = useState(user?.bgColor || "#ffffff");
    const [textColor, setTextColor] = useState(user?.textColor || "#333333");
    const [isSavingTheme, setIsSavingTheme] = useState(false);
    const { status: usernameStatus, formatError } = useUsernameCheck(newUsername);

    const hasChanged = newUsername.trim() !== "" && newUsername.trim() !== user?.username;
    const canSave = hasChanged && (usernameStatus === "available") && !formatError;
    const themeChanged = bgColor !== (user?.bgColor || "#ffffff") || textColor !== (user?.textColor || "#333333");

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

    async function handleSaveTheme() {
        if (!themeChanged) return;

        setIsSavingTheme(true);
        try {
            const response = await updateTheme(bgColor, textColor);
            loginUser(response.data);
            toast.success("Theme updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update theme");
        } finally {
            setIsSavingTheme(false);
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
                <h3 className={styles.sectionTitle}>Page Theme</h3>
                <p className={styles.themeDesc}>Customize your public profile page colors</p>

                <div className={styles.colorGroup}>
                    <label className={styles.colorLabel}>Background Color</label>
                    <div className={styles.colorPickerRow}>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className={styles.colorInput}
                        />
                        <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className={styles.colorText}
                        />
                    </div>
                    <div className={styles.presetRow}>
                        {PRESET_COLORS.map((c) => (
                            <button
                                key={c}
                                className={`${styles.preset} ${bgColor === c ? styles.presetActive : ""}`}
                                style={{ background: c }}
                                onClick={() => setBgColor(c)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.colorGroup}>
                    <label className={styles.colorLabel}>Text Color</label>
                    <div className={styles.colorPickerRow}>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className={styles.colorInput}
                        />
                        <input
                            type="text"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className={styles.colorText}
                        />
                    </div>
                    <div className={styles.presetRow}>
                        {PRESET_COLORS.map((c) => (
                            <button
                                key={c}
                                className={`${styles.preset} ${textColor === c ? styles.presetActive : ""}`}
                                style={{ background: c }}
                                onClick={() => setTextColor(c)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.preview} style={{ background: bgColor, color: textColor, border: `1px solid ${textColor}20` }}>
                    <span className={styles.previewText}>Preview</span>
                </div>

                <button
                    className={styles.saveBtn}
                    onClick={handleSaveTheme}
                    disabled={!themeChanged || isSavingTheme}
                >
                    {isSavingTheme ? "Saving..." : "Save Theme"}
                </button>
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
