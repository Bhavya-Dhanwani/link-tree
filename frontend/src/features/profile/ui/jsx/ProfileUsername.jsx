import styles from "../css/ProfilePage.module.css";

function ProfileUsername({ username }) {
    return (
        <h1 className={styles.username}>@{username}</h1>
    );
}

export default ProfileUsername;
