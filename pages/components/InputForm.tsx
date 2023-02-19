import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./InputForm.module.css"

const InputForm = () => {
  const [counter, setCounter] = useState<number>(0);
  const [plus, setPlus] = useState<number>(0);

  const handlePlus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCounter(counter + plus);
  }

  useEffect(() => {
    console.log(counter);
  }, [counter]) 
  
  return (
    <div className={`${styles.InputContainer}`}>
      <div className={styles.plus}>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handlePlus(e)}>
          <div className={`${styles.FormContainer} ${styles.flex}`}>
            <Form.Group className={styles.flex}  controlId="formBasicEmail">
              <Form.Label className={styles.mark}>+</Form.Label>
              <Form.Control type="text" placeholder="入金内容" className='' required />
              <Form.Control type="number" placeholder="入金額" className='plusNumber' onChange={(e) => setPlus(parseInt(e.target.value))} required />
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.buttonIn}>
              確認
            </Button>
          </div>
        </Form>
      </div>
      <div className={styles.minus}>
        <Form>
          <div className={`${styles.FormContainer} ${styles.flex}`}>
            <Form.Group className={styles.flex}  controlId="formBasicEmail">
              <Form.Label className={styles.mark}>-</Form.Label>
              <Form.Control type="text" placeholder="出金内容" className='' required />
              <Form.Control type="number" placeholder="出金額" className='' required />
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.buttonOut}>
              確認
            </Button>
          </div>
        </Form>
      </div>
      <div className="minus">

      </div>
    </div>
  )
}

export default InputForm