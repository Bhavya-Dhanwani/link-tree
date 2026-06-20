"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyLinks, deleteLink } from "../../api/link.api";
import styles from "../css/ViewLinks.module.css";

function getApiErrorMessage(error) {
    return error?.response?.data?.message || error.message || "Something went wrong";
}

function ViewLinks() {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadLinks() {
            try {
                const response = await getMyLinks();
                setLinks(response.data);
            } catch (error) {
                toast.error(getApiErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }
        loadLinks();
    }, []);

    async function handleSoftDelete(linkId) {
        try {
            await deleteLink(linkId);
            setLinks((prev) => prev.filter((link) => link._id !== linkId));
            toast.success("Link deleted");
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    }

    if (isLoading) {
        return <p className={styles.loading}>Loading links...</p>;
    }

    if (links.length === 0) {
        return <p className={styles.empty}>No links yet. Add one!</p>;
    }

    return (
        <div className={styles.container}>
            {links.map((link) => (
                <div key={link._id} className={styles.card}>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{link.title}</h3>
                        <p className={styles.url}>{link.url}</p>
                    </div>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => handleSoftDelete(link._id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ViewLinks;
