import React, { useEffect, useState } from 'react'
import styles from "./History.module.css"
import { db } from "../firebase"
import { doc, collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

interface History {
  content: string,
  price: number,
  time: number,
}

const History = () => {
  const [history, setHistory] = useState<History[] | DocumentData>([]);

  useEffect(() => {
    const historyData = collection(db, "history");
    getDocs(historyData).then((snapShot) => {
      setHistory(snapShot.docs.map((doc) => doc.data()));   
      console.log(historyData);
    });
  }, []);

  return (
    <div className={styles.HistoryContainer}>
      <div className={styles.container}>
        <h3 className="title">入金履歴</h3>
        <div className="AllHistory">
          {history.map((his: History) => (
          <div className={styles.history} key={his.time}>
            <h4 className={styles.SecTitle}>{his.content}</h4>
            <p className={styles.number}>{his.price}</p>
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