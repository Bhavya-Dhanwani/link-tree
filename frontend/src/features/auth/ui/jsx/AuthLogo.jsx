import Image from "next/image";
import logo from "@/assets/logo.png";
import styles from "../css/AuthLogo.module.css";

function AuthLogo() {
    return (
        <div className={styles.logoWrap}>
            <Image
                className={styles.logo}
                src={logo}
                alt="Linkters"
                priority
            />
        </div>
    );
}

export default AuthLogo;

