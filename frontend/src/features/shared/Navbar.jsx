import React from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';
import { useAuth } from '../auth/context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className={styles.nav}>

            <div className={styles.logoCont}>

                <Image alt={"Logo of linkter"} src={logo} className={styles.logo} />
                <h2 className={styles.logoText}>Linkter</h2>

            </div>

            {
                user ? (
                <div className={styles.other}>
                    <Link className={styles.username} href={`/${user.username}`}>{user.username}</Link>
                    <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                </div>
                ) : ( "" )
            }

        </nav>
    )
}

export default Navbar
