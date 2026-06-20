"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getLinksByUsername, recordClick } from "@/features/dashboard/api/link.api";
import styles from "./page.module.css";

function ProfilePage() {
    const { username } = useParams();
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLinks() {
            try {
                const response = await getLinksByUsername(username);
                setLinks(response.data);
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load links");
            } finally {
                setIsLoading(false);
            }
        }
        fetchLinks();
    }, [username]);

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
                <Link className={styles.header} href="/">
                    <Image alt="Logo of linkter" src={logo} className={styles.logo} />
                    <h2 className={styles.logoText}>Linkter</h2>
                </Link>
                <h1 className={styles.username}>@{username}</h1>
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link className={styles.header} href="/">
                <Image alt="Logo of linkter" src={logo} className={styles.logo} />
                <h2 className={styles.logoText}>Linkter</h2>
            </Link>
            <h1 className={styles.username}>@{username}</h1>
            <div className={styles.links}>
                {links.map((link) => (
                    <a
                        key={link._id}
                        className={styles.linkCard}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => recordClick(link._id)}
                    >
                        <h3 className={styles.linkTitle}>{link.title}</h3>
                        <p className={styles.linkUrl}>{link.url}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default ProfilePage;
