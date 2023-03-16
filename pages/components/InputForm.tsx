import React, { useRef, useState } from 'react'
import styles from "../../styles/components.css/InputForm.module.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Wallet from './Wallet';
import History from './History';
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase";

const InputForm = () => {
  const [counter, setCounter] = useState<number>(0);
  const [plus, setPlus] = useState<number>(0);
  const [minus, setMinus] = useState<number>(0);
  const [plusContent, setPlusContent] = useState<string>("");
  const [minusContent, setMinusContent] = useState<string>("");
  //form送信後、入力内容をクリア
  const clearPlusRef = useRef<HTMLInputElement>(null!);
  const clearMinusRef = useRef<HTMLInputElement>(null!);
  const clearPlusContentRef = useRef<HTMLInputElement>(null!);
  const clearMinusContentRef = useRef<HTMLInputElement>(null!);

  //所持金の引き足し算+handlePutDataを誘発
  const handlePlus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearPlusRef.current.value = "";
    clearPlusContentRef.current.value = "";
    if (plus <= 100000) {
      setCounter((prev) => prev + plus);
      handlePutPlusData();
    } else {
      return;
    }
  }
  const handleMinus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMinusRef.current.value = "";
    clearMinusContentRef.current.value = "";
    if (minus <= 100000) {
      setCounter((prev) => prev - minus);
      handlePutMinusData();
    } else {
      return;
    }
  }

  //firestoreに履歴データを格納
  const handlePutPlusData = async () => {
    const docRef = await addDoc(collection(db, "plusHistory"), {
      content: plusContent,
      price: plus,
      time: new Date(),
    });
  }
  const handlePutMinusData = async () => {
    const docRef = await addDoc(collection(db, "minusHistory"), {
      content: minusContent,
      price: minus,
      time: new Date(),
    });
  }
  
  return (
    <div className={styles.allContentContainer}>
      <Wallet counter={counter} setCounter={setCounter}/>
      <div className={styles.inputFormContainer}>
        <div className='plus'>
          <h2 className={styles.secTitle}>収入</h2>
          <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handlePlus(e)}>
            <div className={styles.flex}>
              <Form.Group className={styles.flex}  controlId="formBasicEmail">
                <Form.Label className={styles.mark}>+</Form.Label>
                <div className={styles.formControlContainer}>
                  <Form.Control 
                    type="text" 
                    placeholder="何で増えた？(文字)" 
                    className='plusContent' 
                    required 
                    onChange={(e) => setPlusContent(e.target.value)} 
                    ref={clearPlusContentRef}
                  />
                  <Form.Control 
                    type="number" 
                    placeholder="何円増えた？(数字)" 
                    className='plusNumber' 
                    required 
                    onChange={(e) => setPlus(parseInt(e.target.value))} 
                    ref={clearPlusRef} 
                    autoComplete="off"
                  />
                </div>
              </Form.Group>
              <Button variant="primary" type="submit" className={styles.button}>
                保存
              </Button>
            </div>
          </Form>
        </div>
        <div className='minus'>
          <h2 className={styles.secTitle}>出費</h2>
          <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleMinus(e)}>
            <div className={styles.flex}>
              <Form.Group className={styles.flex}  controlId="formBasicEmail">
                <Form.Label className={styles.mark}>-</Form.Label>
                <div className={styles.formControlContainer}>
                  <Form.Control 
                    type="text" 
                    placeholder="何に使った？(文字)" 
                    className='minusContent' 
                    required 
                    onChange={(e) => setMinusContent(e.target.value)} 
                    ref={clearMinusContentRef} 
                  />
                  <Form.Control 
                    type="number" 
                    placeholder="何円使った？(数字)" 
                    className='minusNumber' 
                    onChange={(e) => setMinus(parseInt(e.target.value))} 
                    ref={clearMinusRef} 
                    required 
                    autoComplete='off'
                  />
                </div>
              </Form.Group>
              <Button variant="danger" type="submit" className={styles.button}>
                保存
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <History setCounter={setCounter} />
    </div>
  )
}

export default InputForm