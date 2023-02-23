import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./InputForm.module.css";
import Wallet from './Wallet';
import History from './History';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const InputForm = () => {
  const [counter, setCounter] = useState<number>(0);
  const [plus, setPlus] = useState<number>(0);
  const [minus, setMinus] = useState<number>(0);
  const [plusContent, setPlusContent] = useState<string>("");
  const [minusContent, setMinusContent] = useState<string>("");
  const clearPlusRef = useRef<HTMLInputElement>(null!);
  const clearMinusRef = useRef<HTMLInputElement>(null!);
  const clearPlusContentRef = useRef<HTMLInputElement>(null!);
  const clearMinusContentRef = useRef<HTMLInputElement>(null!);

  const handlePlus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCounter((prev) => prev + plus);
    handleSetPlus();
    clearPlusRef.current.value = "";
    clearPlusContentRef.current.value = "";
  }

  const handleMinus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCounter((prev) => prev - minus);
    handleSetMinus();
    clearMinusRef.current.value = "";
    clearMinusContentRef.current.value = "";
  }

  const handleSetPlus = async () => {
    const docRef = await addDoc(collection(db, "plusHistory"), {
      content: plusContent,
      price: plus,
      time: new Date(),
    });
  }

  const handleSetMinus = async () => {
    const docRef = await addDoc(collection(db, "minusHistory"), {
      content: minusContent,
      price: minus,
      time: new Date(),
    });
  }
  
  return (
    <div className={`${styles.InputContainer}`}>
      <Wallet counter={counter}/>
      <div className={styles.plus}>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handlePlus(e)}>
          <div className={`${styles.FormContainer} ${styles.flex}`}>
            <Form.Group className={styles.flex}  controlId="formBasicEmail">
              <Form.Label className={styles.mark}>+</Form.Label>
              <Form.Control type="text" placeholder="入金内容" className='' required onChange={(e) => setPlusContent(e.target.value)} ref={clearPlusContentRef} />
              <Form.Control type="number" placeholder="入金額" className='plusNumber' onChange={(e) => setPlus(parseInt(e.target.value))} ref={clearPlusRef} required />
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.buttonIn}>
              確認
            </Button>
          </div>
        </Form>
      </div>
      <div className={styles.minus}>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleMinus(e)}>
          <div className={`${styles.FormContainer} ${styles.flex}`}>
            <Form.Group className={styles.flex}  controlId="formBasicEmail">
              <Form.Label className={styles.mark}>-</Form.Label>
              <Form.Control type="text" placeholder="出金内容" className='' required onChange={(e) => setMinusContent(e.target.value)} ref={clearMinusContentRef} />
              <Form.Control type="number" placeholder="出金額" className='' onChange={(e) => setMinus(parseInt(e.target.value))} ref={clearMinusRef} required />
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.buttonOut}>
              確認
            </Button>
          </div>
        </Form>
      </div>
      <History setCounter={setCounter} />
    </div>
  )
}

export default InputForm