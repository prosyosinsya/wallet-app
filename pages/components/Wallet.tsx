import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import styles from "./Wallet.module.css"
import { collection, addDoc, query, limit, orderBy, getDocs, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import Button from 'react-bootstrap/Button';

interface History {
  money: number,
  time: number,
}

const Wallet = (
  props: {
    counter: number, 
    setCounter: Dispatch<SetStateAction<number>>
  }) => {  

  const [active, setActive] = useState<boolean>(false);  

  useEffect(() => {
    const money = collection(db, "allMoney");
    const moneyData = query(money, orderBy("time", "desc"), limit(1)); 
    getDocs(moneyData).then((snapShot: QuerySnapshot<DocumentData>) => {
      if(!snapShot.empty) {
        props.setCounter(+
          (snapShot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data().money))
        );
      } else {
        props.setCounter(0);
      }
    })
  }, [])

  useEffect(() => {
    setActive(false);
  }, [props.counter])

  const handleSave = async () => {
    const docRef = await addDoc(collection(db, "allMoney"), {
      money: props.counter,
      time: new Date(),
    });
    setActive(true);
  }

  const beforeUnloadhandler = (event: BeforeUnloadEvent) => {
      event.returnValue = "check";
  };
  
  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadhandler);
    if (active == true) {
      window.removeEventListener('beforeunload', beforeUnloadhandler);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadhandler);
    };
  }, [active]);

  return (
    <div>
      <span className='text-center'>
        <h3 className="fs-3">所持金</h3>
        <div className={styles.all}>
          <span className={styles.WalletNumber}>
            {props.counter}円
          </span>
          <Button 
            variant="success" 
            className={active ? styles.pushBtn : styles.btn}
            onClick={handleSave}
          >保存</Button>{' '}
        </div>
      </span>
    </div>
  )
}

export default Wallet