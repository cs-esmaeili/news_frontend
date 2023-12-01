import styles from '@/styles/cinput.module.scss';

function Cinput({ icon, placeholder, onChange, value }) {

    return (
        <div className={styles.inputBar}>
            {icon}
            <input className={styles.input} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} value={value} />
        </div>
    );
}



export default Cinput;