"use client";

import useLinkForm from "../../hooks/useLinkForm";
import styles from "../css/DashboardForm.module.css";

function DashboardForm() {
    const {
        form,
        isSubmitting,
        handleInputChange,
        handleSubmit,
    } = useLinkForm();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Link</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="title">Title</label>
                    <input
                        className={styles.input}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="My awesome link"
                        value={form.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="url">URL</label>
                    <input
                        className={styles.input}
                        id="url"
                        name="url"
                        type="url"
                        placeholder="https://example.com"
                        value={form.url}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Link"}
                </button>
            </form>
        </div>
    );
}

export default DashboardForm;
