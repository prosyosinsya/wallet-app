import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import styles from "./History.module.css"
import { db } from "../firebase"
import { doc, collection, deleteDoc, DocumentData, onSnapshot, query, limit, orderBy} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns'

interface History {
  content: string,
  price: number,
  time: number,
  id: string,
}

const History = (props: {setCounter: Dispatch<SetStateAction<number>>}) => {
  const [plusHistory, setPlusHistory] = useState<History[] | DocumentData>([]);
  const [minusHistory, setMinusHistory] = useState<History[] | DocumentData>([]);

  useEffect(() => {
    const plusHistory = collection(db, "plusHistory");
    const minusHistory = collection(db, "minusHistory");
    const plusHistoryData = query(plusHistory, orderBy("time", "desc"), limit(5));
    onSnapshot(plusHistoryData, (plusHis) => {
      setPlusHistory(plusHis.docs.map((his) => ({
        ...his.data(),
        id: his.id,
        time: his.data().time.toDate()
      })));
    });
    const minusHistoryData = query(minusHistory, orderBy("time", "desc"), limit(5));
    onSnapshot(minusHistoryData, (minusHis) => {
      setMinusHistory(minusHis.docs.map((his) => ({
        ...his.data(),
        id: his.id,
        time: his.data().time.toDate()
      })));
    });
  }, []);

  const handlePlusDelete = async (his: History) => {
    await deleteDoc(doc(db, "plusHistory", his.id));
    props.setCounter((prev) => prev - his.price);
  }

  const handleMinusDelete = async (his: History) => {
    await deleteDoc(doc(db, "minusHistory", his.id));
    props.setCounter((prev) => prev + his.price);
  }

  return (
    <div className={styles.HistoryContainer}>
      <div className={styles.container}>
        <h3 className="title">入金履歴</h3>
        <div className="AllHistory">
          {plusHistory.map((his: History) => (
          <div className={styles.history} key={his.id}>
            <span className={styles.time}>{format(his.time, 'yyyy/MM/dd/HH:mm:ss')}</span>
            <Button className={styles.deleteBtn} variant="danger" onClick={() => handlePlusDelete(his)}>消去</Button>{' '}
            <h4 className={styles.SecTitle}>{his.content}</h4>
            <p className={styles.number}>{his.price}円</p>
          </div>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <h3 className="title">出金履歴</h3>
        <div className="AllHistory">
          {minusHistory.map((his: History) => (
          <div className={styles.history} key={his.time}>
            <Button className={styles.deleteBtn} variant="danger" onClick={() => handleMinusDelete(his)}>消去</Button>{' '}
            <h4 className={styles.SecTitle}>{his.content}</h4>
            <p className={styles.number}>{his.price}円</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History