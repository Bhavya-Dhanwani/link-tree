"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { getMyLinks, deleteLink, reorderLinks } from "../../api/link.api";
import { sortByOrder } from "@/features/shared/utils/heapSort";
import styles from "../css/ViewLinks.module.css";

function getApiErrorMessage(error) {
    return error?.response?.data?.message || error.message || "Something went wrong";
}

function ViewLinks() {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dragIndex, setDragIndex] = useState(null);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    useEffect(() => {
        async function loadLinks() {
            try {
                const response = await getMyLinks();
                setLinks(sortByOrder(response.data));
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

    function handleDragStart(e, index) {
        dragItem.current = index;
        setDragIndex(index);
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(e, index) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        dragOverItem.current = index;
    }

    async function handleDrop(e) {
        e.preventDefault();
        const from = dragItem.current;
        const to = dragOverItem.current;

        if (from === null || to === null || from === to) {
            setDragIndex(null);
            return;
        }

        const updated = [...links];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);

        setLinks(updated);
        setDragIndex(null);
        dragItem.current = null;
        dragOverItem.current = null;

        const orderedIds = updated.map((link) => link._id);

        try {
            await reorderLinks(orderedIds);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
            const response = await getMyLinks();
            setLinks(sortByOrder(response.data));
        }
    }

    function handleDragEnd() {
        setDragIndex(null);
        dragItem.current = null;
        dragOverItem.current = null;
    }

    if (isLoading) {
        return <p className={styles.loading}>Loading links...</p>;
    }

    if (links.length === 0) {
        return <p className={styles.empty}>No links yet. Add one!</p>;
    }

    return (
        <div className={styles.container}>
            {links.map((link, index) => (
                <div
                    key={link._id}
                    className={`${styles.card} ${dragIndex === index ? styles.dragging : ""}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                >
                    <div className={styles.handle} title="Drag to reorder">
                        &#9776;
                    </div>
                    <span className={styles.sr}>{index + 1}</span>
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
