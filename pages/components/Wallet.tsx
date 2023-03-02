import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import styles from "../../styles/components.css/Wallet.module.css"
import Button from 'react-bootstrap/Button';
import { collection, query, limit, orderBy, addDoc, getDocs, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import db from "../firebase"

const Wallet = (
  props: {
    counter: number, 
    setCounter: Dispatch<SetStateAction<number>>
  }) => {  

  //保存されていたらtrue
  const [save, setSave] = useState<boolean>(false);
  useEffect(() => {
    setSave(false);
  }, [props.counter])

  //マウント時、過去に保存した所持金を復元
  useEffect(() => {
    const allMoneyData = collection(db, "allMoney");
    const latestAllMoney = query(allMoneyData, orderBy("time", "desc"), limit(1)); 
    getDocs(latestAllMoney).then((snapShot: QuerySnapshot<DocumentData>) => {
      if(!snapShot.empty) {
        props.setCounter(
          +(snapShot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data().money))
        );
      } else {
        props.setCounter(0);
      }
    })
  }, [])

  //現在の所持金を保存
  const handleSave = async () => {
    const docRef = await addDoc(collection(db, "allMoney"), {
      money: props.counter,
      time: new Date(),
    });
    setSave(true);
  }

  //保存してなかったら確認、してたらそのまま退出
  const beforeUnloadhandler = (event: BeforeUnloadEvent) => {
      event.returnValue = "check";
  }
  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadhandler);
    if (save == true) {
      window.removeEventListener('beforeunload', beforeUnloadhandler);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadhandler);
    };
  }, [save])

  return (
    <div>
      <span className='text-center'>
        <h3 className="fs-3">所持金</h3>
        <div className={styles.formContainer}>
          <span className={styles.money}>
            {props.counter}円
          </span>
          <Button 
            variant="success" 
            className={save ? styles.pushedBtn : styles.btn}
            onClick={handleSave}
          >保存</Button>{' '}
        </div>
      </span>
    </div>
  )
}

export default Wallet