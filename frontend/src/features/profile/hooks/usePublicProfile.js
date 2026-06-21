"use client";

import { useEffect, useState } from "react";
import { getPublicUserTheme } from "@/features/auth/api/auth.api";

function usePublicProfile(username) {
    const [theme, setTheme] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!username) return;

        async function fetchTheme() {
            try {
                const response = await getPublicUserTheme(username);
                setTheme(response.data);
            } catch {
                setTheme(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTheme();
    }, [username]);

    return { theme, isLoading };
}

export default usePublicProfile;
