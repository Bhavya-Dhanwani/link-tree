import { recordClick } from "../../api/profile.api";
import styles from "../css/ProfilePage.module.css";

function ProfileLinkCard({ link, textColor }) {
    const borderColor = textColor ? `${textColor}20` : "#e0e0e0";
    const urlColor = textColor ? `${textColor}99` : "#888";

    return (
        <a
            className={styles.linkCard}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordClick(link._id)}
            style={{ borderColor, color: textColor }}
        >
            <h3 className={styles.linkTitle} style={{ color: textColor }}>{link.title}</h3>
            <p className={styles.linkUrl} style={{ color: urlColor }}>{link.url}</p>
        </a>
    );
}

export default ProfileLinkCard;
