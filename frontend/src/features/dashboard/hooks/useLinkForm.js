"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { createLink } from "../api/link.api";

const LINK_FORM_INITIAL_STATE = {
    title: "",
    url: "",
};

function getApiErrorMessage(error) {
    return error?.response?.data?.message || error.message || "Something went wrong";
}

function useLinkForm() {
    const [form, setForm] = useState(LINK_FORM_INITIAL_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await createLink(form);
            toast.success("Link created successfully");
            setForm(LINK_FORM_INITIAL_STATE);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        form,
        isSubmitting,
        handleInputChange,
        handleSubmit,
    };
}

export default useLinkForm;
