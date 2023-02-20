import React, { useEffect, useState } from 'react'
import styles from "./Wallet.module.css"
import InputForm from './InputForm'

const Wallet = (props: {counter: number}) => {  
  return (
    <div>
      <span className='text-center'>
        <h3 className="fs-3">所持金</h3>
        <div className={styles.all}>
          <span className={styles.WalletNumber}>
            {props.counter}円
          </span>
        </div>
      </span>
    </div>
  )
}

export default Wallet