"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDeletedLinks, hardDeleteLink } from "../../api/link.api";
import styles from "../css/DeletedLinks.module.css";

function getApiErrorMessage(error) {
    return error?.response?.data?.message || error.message || "Something went wrong";
}

function DeletedLinks() {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmLink, setConfirmLink] = useState(null);

    useEffect(() => {
        async function loadLinks() {
            try {
                const response = await getDeletedLinks();
                setLinks(response.data);
            } catch (error) {
                toast.error(getApiErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }
        loadLinks();
    }, []);

    async function handleHardDelete() {
        if (!confirmLink) return;
        try {
            await hardDeleteLink(confirmLink._id);
            setLinks((prev) => prev.filter((link) => link._id !== confirmLink._id));
            setConfirmLink(null);
            toast.success("Link permanently deleted");
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    }

    if (isLoading) {
        return <p className={styles.loading}>Loading deleted links...</p>;
    }

    if (links.length === 0) {
        return <p className={styles.empty}>No deleted links.</p>;
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
                        onClick={() => setConfirmLink(link)}
                    >
                        Delete Forever
                    </button>
                </div>
            ))}

            {confirmLink && (
                <div className={styles.overlay} onClick={() => setConfirmLink(null)}>
                    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.popupTitle}>Delete Forever?</h3>
                        <p className={styles.popupMessage}>
                            &quot;{confirmLink.title}&quot; will be permanently deleted. This cannot be undone.
                        </p>
                        <div className={styles.popupActions}>
                            <button className={styles.yesBtn} onClick={handleHardDelete}>
                                Yes, Delete
                            </button>
                            <button className={styles.noBtn} onClick={() => setConfirmLink(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeletedLinks;
