"use client";

import { useParams } from "next/navigation";
import useProfileLinks from "../../hooks/useProfileLinks";
import ProfileHeader from "./ProfileHeader";
import ProfileUsername from "./ProfileUsername";
import ProfileLinks from "./ProfileLinks";
import ProfilePicture from "@/features/auth/ui/jsx/ProfilePicture";
import { useAuth } from "@/features/auth/context/AuthContext";
import styles from "../css/ProfilePage.module.css";

function ProfilePage() {
    const { username } = useParams();
    const { user } = useAuth();
    const { links, isLoading, error } = useProfileLinks(username);
    const isOwner = user?.username === username;

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p className={styles.loading}>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <ProfileHeader />
                <div className={styles.profileRow}>
                    <ProfilePicture isOwner={isOwner} />
                    <ProfileUsername username={username} />
                </div>
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ProfileHeader />
            <div className={styles.profileRow}>
                <ProfilePicture isOwner={isOwner} />
                <ProfileUsername username={username} />
            </div>
            <ProfileLinks links={links} />
        </div>
    );
}

export default ProfilePage;
