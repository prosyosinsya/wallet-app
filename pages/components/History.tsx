import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import styles from "../../styles/components.css/History.module.scss"
import Button from 'react-bootstrap/Button'
import db from "../../firebase"
import { doc, collection, deleteDoc, DocumentData, onSnapshot, query, limit, orderBy} from "firebase/firestore"
import { format } from 'date-fns'

interface typeHistory {
  content: string,
  price: number,
  time: number,
  id: string,
}

const History = (
  props: {setCounter: Dispatch<SetStateAction<number>>
}) => {
  const [storagePlusHistory, setStoragePlusHistory] = useState<typeHistory[] | DocumentData>([]);
  const [storageMinusHistory, setStorageMinusHistory] = useState<typeHistory[] | DocumentData>([]);

  useEffect(() => {
    // マウント時に入金履歴を読み取る
    const plusHistory = collection(db, "plusHistory");
    //最新のものから5つ
    const plusHistoryData = query(plusHistory, orderBy("time", "desc"), limit(5));
    onSnapshot(plusHistoryData, (plusHis) => {
      setStoragePlusHistory(plusHis.docs.map((his) => ({
        ...his.data(),
        id: his.id,
        time: his.data().time.toDate(),
      })));
    });

    //マウント時に出金履歴を読み取る
    const minusHistory = collection(db, "minusHistory");
    //最新のものから5つ
    const minusHistoryData = query(minusHistory, orderBy("time", "desc"), limit(5));
    onSnapshot(minusHistoryData, (minusHis) => {
      setStorageMinusHistory(minusHis.docs.map((his) => ({
        ...his.data(),
        id: his.id,
        time: his.data().time.toDate(),
      })));
    });
  }, []);

  //履歴を消す際の処理
  const handleDeletePlus = async (his: typeHistory) => {
    await deleteDoc(doc(db, "plusHistory", his.id));
    props.setCounter((prev) => prev - his.price);
  }
  const handleDeleteMinus = async (his: typeHistory) => {
    await deleteDoc(doc(db, "minusHistory", his.id));
    props.setCounter((prev) => prev + his.price);
  }

  return (
    <div className={styles.historyContainer}>
      <div className={styles.subContainer}>
        <h3>入金履歴</h3>
        {storagePlusHistory.map((his: typeHistory) => (
        <div className={styles.historyItem} key={his.id}>
          <span className={styles.time}>{format(his.time, 'yyyy/MM/dd/HH:mm:ss')}</span>
          <Button
           className={styles.deleteBtn} 
           variant="danger" 
           onClick={() => handleDeletePlus(his)}
          >消去</Button>{' '}
          <h4 className={styles.title}>{his.content}</h4>
          <p className={styles.money}>{his.price}円</p>
        </div>
        ))}
      </div>
      <div className={styles.subContainer}>
        <h3>出金履歴</h3>
        {storageMinusHistory.map((his: typeHistory) => (
        <div className={styles.historyItem} key={his.id}>
          <span className={styles.time}>{format(his.time, 'yyyy/MM/dd/HH:mm:ss')}</span>
          <Button 
            className={styles.deleteBtn} 
            variant="danger" 
            onClick={() => handleDeleteMinus(his)}
          >消去</Button>{' '}
          <h4 className={styles.title}>{his.content}</h4>
          <p className={styles.money}>{his.price}円</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default History