import React from 'react'
import styles from "./Wallet.module.css"

const Wallet = () => {
  return (
    <div>
      <span className='text-center'>
        <h3 className="fs-3">合計金額</h3>
        <div className={styles.all}></div>
      </span>
      <div className={styles.EachWallet}>
        <span className={styles.flex}>
          <h3 className={styles.label}>現金</h3>
          <div className={`${styles.cash} ${styles.wallet}`}></div>
        </span>
        <span className={styles.flex}>
          <h3 className={styles.label}>電子</h3>
          <div className={`${styles.elec} ${styles.wallet}`}></div>
        </span>
      </div>
    </div>
  )
}

export default Wallet