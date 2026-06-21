import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import styles from "../css/ProfilePage.module.css";

function ProfileHeader() {
    return (
        <Link className={styles.header} href="/">
            <Image alt="Logo of linkter" src={logo} className={styles.logo} />
            <h2 className={styles.logoText}>Linkter</h2>
        </Link>
    );
}

export default ProfileHeader;
