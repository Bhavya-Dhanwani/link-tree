"use client";

import Image from "next/image";
import Link from "next/link";
import darkLogo from "@/assets/darkLogo.png";
import lightLogo from "@/assets/lightLogo.png";
import styles from "../css/ProfilePage.module.css";

function isColorDark(hex) {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

function ProfileHeader({ bgColor, textColor }) {
    const useLightLogo = bgColor && isColorDark(bgColor);
    const logoSrc = useLightLogo ? lightLogo : darkLogo;
    const logoTextColor = textColor || "#333";

    return (
        <Link className={styles.header} href="/">
            <Image alt="Logo of linkter" src={logoSrc} className={styles.logo} />
            <h2 className={styles.logoText} style={{ color: logoTextColor }}>Linkter</h2>
        </Link>
    );
}

export default ProfileHeader;
