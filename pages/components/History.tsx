import React from 'react'
import styles from "./History.module.css"

const History = () => {
  return (
    <div className={styles.HistoryContainer}>
      <div className={styles.container}>
        <h3 className="title">入金履歴</h3>
        <div className="AllHistory">
          <div className={styles.history}>
            <h4 className={styles.SecTitle}>給料</h4>
            <p className={styles.number}>20000</p>
          </div>
          <div className={styles.history}>
            <h4 className={styles.SecTitle}>給料</h4>
            <p className={styles.number}>20000</p>
          </div>
          <div className={styles.history}>
            <h4 className={styles.SecTitle}>給料</h4>
            <p className={styles.number}>20000</p>
          </div>
          <div className={styles.history}>
            <h4 className={styles.SecTitle}>給料</h4>
            <p className={styles.number}>20000</p>
          </div>
          <div className={styles.history}>
            <h4 className={styles.SecTitle}>給料</h4>
            <p className={styles.number}>20000</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h3 className="title">出金履歴</h3>
        <div className="AllHistory">
          
        </div>
      </div>
    </div>
  )
}

export default History