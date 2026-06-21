"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getMySubscription } from "@/features/payments/api/payment.api";
import { updateLinkStyle, highlightLink } from "@/features/premium/api/premium.api";
import { getMyLinks, deleteLink, reorderLinks } from "../../api/link.api";
import { sortByOrder } from "@/features/shared/utils/heapSort";
import styles from "../css/ViewLinks.module.css";

const PLATFORM_ICONS = {
    youtube: "#FF0000", instagram: "#E4405F", x: "#000000", twitter: "#000000",
    facebook: "#1877F2", telegram: "#26A5E4", reddit: "#FF4500", github: "#333333",
    linkedin: "#0A66C2", discord: "#5865F2", tiktok: "#000000", spotify: "#1DB954",
    twitch: "#9146FF", threads: "#000000", pinterest: "#BD081C", whatsapp: "#25D366",
    medium: "#000000", dribbble: "#EA4C89",
};

function getPlatformFromUrl(url) {
    try {
        const hostname = new URL(url).hostname.toLowerCase().replace("www.", "");
        const map = {
            "youtube.com": "youtube", "youtu.be": "youtube", "instagram.com": "instagram",
            "twitter.com": "twitter", "x.com": "x", "facebook.com": "facebook",
            "fb.com": "facebook", "telegram.org": "telegram", "t.me": "telegram",
            "reddit.com": "reddit", "github.com": "github", "linkedin.com": "linkedin",
            "discord.com": "discord", "tiktok.com": "tiktok", "spotify.com": "spotify",
            "twitch.tv": "twitch", "threads.net": "threads", "dribbble.com": "dribbble",
            "medium.com": "medium", "pinterest.com": "pinterest",
            "wa.me": "whatsapp", "whatsapp.com": "whatsapp",
        };
        for (const [domain, platform] of Object.entries(map)) {
            if (hostname.includes(domain)) return platform;
        }
    } catch {}
    return null;
}

function getFaviconUrl(url) {
    try {
        const hostname = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
        return null;
    }
}

function getApiErrorMessage(error) {
    return error?.response?.data?.message || error.message || "Something went wrong";
}

function ViewLinks() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const isPremium = isAdmin || hasActiveSubscription;
    const [dragIndex, setDragIndex] = useState(null);
    const [editingColor, setEditingColor] = useState(null);
    const [colorValue, setColorValue] = useState("#4f46e5");
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    useEffect(() => {
        if (isAdmin) return;

        getMySubscription().then((sub) => {
            setHasActiveSubscription(sub?.status === "active");
        }).catch(() => {
            setHasActiveSubscription(false);
        });
    }, [isAdmin]);

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

    async function handleColorSave(linkId) {
        if (!isPremium) return;

        try {
            await updateLinkStyle(linkId, { borderColor: colorValue });
            setLinks((prev) => prev.map((l) => l._id === linkId ? { ...l, borderColor: colorValue } : l));
            setEditingColor(null);
            toast.success("Border color updated");
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    }

    async function handleToggleHighlight(linkId, currentStatus) {
        if (!isPremium) return;

        try {
            if (currentStatus) {
                await updateLinkStyle(linkId, { isHighlighted: false, highlightExpiresAt: null });
                setLinks((prev) => prev.map((l) => l._id === linkId ? { ...l, isHighlighted: false, highlightExpiresAt: null } : l));
                toast.success("Highlight removed");
            } else {
                await highlightLink(linkId);
                setLinks((prev) => prev.map((l) => l._id === linkId ? { ...l, isHighlighted: true } : l));
                toast.success("Link highlighted!");
            }
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
        try {
            await reorderLinks(updated.map((link) => link._id));
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

    if (isLoading) return <p className={styles.loading}>Loading links...</p>;
    if (links.length === 0) return <p className={styles.empty}>No links yet. Add one!</p>;

    return (
        <div className={styles.container}>
            {links.map((link, index) => {
                const platform = isPremium ? getPlatformFromUrl(link.url) : null;
                const favicon = isPremium ? getFaviconUrl(link.url) : null;
                const platformColor = platform ? PLATFORM_ICONS[platform] : null;
                const borderCol = isPremium ? (link.borderColor || "#e0e0e0") : "#e0e0e0";

                return (
                    <div
                        key={link._id}
                        className={`${styles.card} ${dragIndex === index ? styles.dragging : ""}`}
                        style={{ borderLeft: `4px solid ${borderCol}` }}
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

                        {favicon ? (
                            <img src={favicon} alt="" width={20} height={20} style={{ borderRadius: 4, flexShrink: 0 }} />
                        ) : platformColor ? (
                            <div style={{
                                width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                                background: platformColor, display: "flex",
                                alignItems: "center", justifyContent: "center",
                                color: "#fff", fontSize: 10, fontWeight: 700,
                            }}>
                                {(platform || "?")[0].toUpperCase()}
                            </div>
                        ) : null}

                        <div className={styles.info}>
                            <h3 className={styles.title}>{link.title}</h3>
                            <p className={styles.url}>{link.url}</p>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            {isPremium && (
                                <>
                                    <button
                                        onClick={() => handleToggleHighlight(link._id, link.isHighlighted)}
                                        style={{
                                            padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                                            cursor: "pointer", border: "none",
                                            background: link.isHighlighted ? "#f59e0b" : "#f1f5f9",
                                            color: link.isHighlighted ? "#fff" : "#64718a",
                                        }}
                                        title={link.isHighlighted ? "Remove highlight" : "Highlight this link"}
                                    >
                                        {link.isHighlighted ? "Featured" : "Feature"}
                                    </button>
                                    {editingColor === link._id ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                            <input
                                                type="color"
                                                value={colorValue}
                                                onChange={(e) => setColorValue(e.target.value)}
                                                style={{ width: 28, height: 28, border: "none", padding: 0, cursor: "pointer", borderRadius: 4 }}
                                            />
                                            <button
                                                onClick={() => handleColorSave(link._id)}
                                                style={{
                                                    padding: "4px 8px", border: "none", borderRadius: 4,
                                                    background: "#22c55e", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer",
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingColor(null)}
                                                style={{
                                                    padding: "4px 8px", border: "1px solid #e2e8f0", borderRadius: 4,
                                                    background: "#fff", fontSize: 11, cursor: "pointer",
                                                }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => { setEditingColor(link._id); setColorValue(link.borderColor || "#4f46e5"); }}
                                            style={{
                                                width: 24, height: 24, borderRadius: 6, border: `2px solid ${borderCol}`,
                                                background: borderCol, cursor: "pointer", padding: 0,
                                            }}
                                            title="Change border color"
                                        />
                                    )}
                                </>
                            )}
                            <button
                                className={styles.deleteBtn}
                                onClick={() => handleSoftDelete(link._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ViewLinks;


