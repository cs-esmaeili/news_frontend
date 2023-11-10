<div className={`${styles.flotingPanel} ${styles.right} `} onClick={() => {
    setOpen(!open);
}}>

    <div className={`${styles.collapsButton}  ${open == true ? styles.open : ''}`} onClick={() => {
        setOpen(!open);
    }}>
        <BiCollapse className={`${styles.icons} ${styles.orange} `} />
    </div>
    <div fluid className={`${styles.flotingPanelContent}  ${open == true ? styles.open : styles.close}`}
    >
        <span className={styles.floationPanelFirstRow}>
            Home / Folder1 / images /
        </span>
        <div>
            <PiKeyReturnBold className={`${styles.icons}`} />
            <IoMdTrash className={`${styles.icons} ${styles.red}`} />
            <PiUploadBold className={`${styles.icons} ${styles.green}`} />
            <BiSolidEdit className={`${styles.icons} ${styles.blue}`} />
            <BiSolidFolderPlus className={`${styles.icons} ${styles.yellow}`} />
        </div>
        <div className={styles.searchBar}>
            <PiMagnifyingGlassBold className={styles.searchBarIcon} />
            <input className={styles.searchInput} placeholder='search something...' />
        </div>
    </div>
</div>