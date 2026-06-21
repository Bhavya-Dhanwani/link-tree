import { recordClick } from "../../api/profile.api";
import styles from "../css/ProfilePage.module.css";

function ProfileLinkCard({ link }) {
    return (
        <a
            className={styles.linkCard}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordClick(link._id)}
        >
            <h3 className={styles.linkTitle}>{link.title}</h3>
            <p className={styles.linkUrl}>{link.url}</p>
        </a>
    );
}

export default ProfileLinkCard;
