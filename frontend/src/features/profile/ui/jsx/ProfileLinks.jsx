import ProfileLinkCard from "./ProfileLinkCard";
import styles from "../css/ProfilePage.module.css";

function ProfileLinks({ links }) {
    return (
        <div className={styles.links}>
            {links.map((link) => (
                <ProfileLinkCard key={link._id} link={link} />
            ))}
        </div>
    );
}

export default ProfileLinks;
