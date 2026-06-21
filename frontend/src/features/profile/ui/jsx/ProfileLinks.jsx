import { sortByOrder } from "@/features/shared/utils/heapSort";
import ProfileLinkCard from "./ProfileLinkCard";
import styles from "../css/ProfilePage.module.css";

function ProfileLinks({ links, textColor }) {
    const sorted = sortByOrder(links);

    return (
        <div className={styles.links}>
            {sorted.map((link) => (
                <ProfileLinkCard key={link._id} link={link} textColor={textColor} />
            ))}
        </div>
    );
}

export default ProfileLinks;
