import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./InputForm.module.css";
import Wallet from './Wallet';
import History from './History';

const InputForm = () => {
  const [counter, setCounter] = useState<number>(0);
  const [plus, setPlus] = useState<number>(0);
  const [minus, setMinus] = useState<number>(0);
  const clearPlusRef = useRef<HTMLInputElement>(null!);
  const clearMinusRef = useRef<HTMLInputElement>(null!);

  const handlePlus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCounter((prev) => prev + plus);
    clearPlusRef.current.value = "";
  }

  const handleMinus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCounter((prev) => prev - minus);
    clearMinusRef.current.value = "";
  }
  
  return (
    <div className={`${styles.InputContainer}`}>
      <Wallet counter={counter}/>
      <div className={styles.plus}>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handlePlus(e)}>
          <div className={`${styles.FormContainer} ${styles.flex}`}>
            <Form.Group className={styles.flex}  controlId="formBasicEmail">
              <Form.Label className={styles.mark}>+</Form.Label>
              <Form.Control type="text" placeholder="入金内容" className='' required />
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
              <Form.Control type="text" placeholder="出金内容" className='' required />
              <Form.Control type="number" placeholder="出金額" className='' onChange={(e) => setMinus(parseInt(e.target.value))} ref={clearMinusRef} required />
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.buttonOut}>
              確認
            </Button>
          </div>
        </Form>
      </div>
      <History />
    </div>
  )
}

export default InputForm