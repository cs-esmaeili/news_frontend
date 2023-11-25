import styles from '@/styles/cinput.module.scss';

function Cinput({ icon, placeholder }) {

    return (
        <div className={styles.inputBar}>
            {icon}
            <input className={styles.input} placeholder={placeholder} />
        </div>
    );
}



export default Cinput;