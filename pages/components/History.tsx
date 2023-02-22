import React, { useEffect, useState } from 'react'
import styles from "./History.module.css"
import { db } from "../firebase"
import { doc, collection, getDocs, QueryDocumentSnapshot, DocumentData, onSnapshot, limit, query, orderBy} from "firebase/firestore";

interface History {
  content: string,
  price: number,
  time: number,
}

const History = () => {
  const [plusHistory, setPlusHistory] = useState<History[] | DocumentData>([]);

  useEffect(() => {
    const plusHistory = collection(db, "plusHistory");
    const historyData = query(plusHistory, orderBy("time", "desc"), limit(5));
    onSnapshot(historyData, (plusHis) => {
      setPlusHistory(plusHis.docs.map((his) => his.data()));
    });
  }, []);

  return (
    <div className={styles.HistoryContainer}>
      <div className={styles.container}>
        <h3 className="title">入金履歴</h3>
        <div className="AllHistory">
          {plusHistory.map((his: History) => (
          <div className={styles.history} key={his.time}>
            <h4 className={styles.SecTitle}>{his.content}</h4>
            <p className={styles.number}>{his.price}円</p>
          </div>
          ))}
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