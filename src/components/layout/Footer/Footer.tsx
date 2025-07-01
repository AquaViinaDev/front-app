'use client';

import styles from "@/components/layout/Header/Header.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer} style={{padding: '1rem', textAlign: 'center', borderTop: '1px solid #ccc'}}>
			© {new Date().getFullYear()} AQUA VIINA. Все права защищены.
		</footer>
	);
}

export default Footer;