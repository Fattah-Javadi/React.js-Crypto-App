import styles from './Layout.module.css';

const Layout = ({children}) => {
    return (
        <>
         <header className={styles.header}>
            <h1>Crypto App</h1>
            <p>Project | React.js</p>
        </header> 
        {children}  
        <footer className={styles.footer}>
            <p>Developed by Fattah</p>
        </footer>
        </>
    );
};

export default Layout;