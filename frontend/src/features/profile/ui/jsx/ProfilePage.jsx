"use client";

import { useParams } from "next/navigation";
import useProfileLinks from "../../hooks/useProfileLinks";
import ProfileHeader from "./ProfileHeader";
import ProfileUsername from "./ProfileUsername";
import ProfileLinks from "./ProfileLinks";
import styles from "../css/ProfilePage.module.css";

function ProfilePage() {
    const { username } = useParams();
    const { links, isLoading, error } = useProfileLinks(username);

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
                <ProfileUsername username={username} />
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ProfileHeader />
            <ProfileUsername username={username} />
            <ProfileLinks links={links} />
        </div>
    );
}

export default ProfilePage;
