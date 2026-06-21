"use client";

import { useParams } from "next/navigation";
import useProfileLinks from "../../hooks/useProfileLinks";
import usePublicProfile from "../../hooks/usePublicProfile";
import ProfileHeader from "./ProfileHeader";
import ProfileUsername from "./ProfileUsername";
import ProfileLinks from "./ProfileLinks";
import ProfilePicture from "@/features/auth/ui/jsx/ProfilePicture";
import { useAuth } from "@/features/auth/context/AuthContext";
import styles from "../css/ProfilePage.module.css";

function ProfilePage() {
    const { username } = useParams();
    const { user } = useAuth();
    const { links, isLoading: linksLoading, error } = useProfileLinks(username);
    const { theme, isLoading: themeLoading } = usePublicProfile(username);
    const isOwner = user?.username === username;

    const bgColor = theme?.bgColor || "#ffffff";
    const textColor = theme?.textColor || "#333333";

    if (linksLoading || themeLoading) {
        return (
            <div className={styles.container} style={{ background: bgColor, color: textColor }}>
                <div className={styles.inner}>
                    <p className={styles.loading}>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container} style={{ background: bgColor, color: textColor }}>
                <div className={styles.inner}>
                    <ProfileHeader bgColor={bgColor} textColor={textColor} />
                    <div className={styles.profileRow}>
                        <ProfilePicture isOwner={isOwner} />
                        <ProfileUsername username={username} textColor={textColor} />
                    </div>
                    <p className={styles.error}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container} style={{ background: bgColor, color: textColor }}>
            <div className={styles.inner}>
                <ProfileHeader bgColor={bgColor} textColor={textColor} />
                <div className={styles.profileRow}>
                    <ProfilePicture isOwner={isOwner} />
                    <ProfileUsername username={username} textColor={textColor} />
                </div>
                <ProfileLinks links={links} textColor={textColor} />
            </div>
        </div>
    );
}

export default ProfilePage;
