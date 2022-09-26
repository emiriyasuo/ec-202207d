import { Btn } from "./register_user_form_Btn"
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/register_user.module.css'
import React, { useEffect } from "react";

export const zipJudge = (zipFlag: any) => {
  if (zipFlag === "empty") {
    let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
    tag.style.display = "inline-block"
    document.getElementsByClassName("control-label")[2].innerHTML = "郵便番号を入力してください"
  }

  if (zipFlag === "format-incorrect") {
    let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;
    tag.style.display = "inline-block"
    tag.innerHTML = "郵便番号はXXX-XXXXの形式で入力してください"
  }

  if (zipFlag === "unexist") {
    let tag = document.getElementsByClassName("control-label")[2] as HTMLElement;;
    tag.style.display = "inline-block"
    tag.innerHTML = "この郵便番号は存在しません"
  }
}

export const ZipForm = (props: any) => {

  useEffect(() => {

    if (!props.zipValue) {
      props.SetZipFlag("empty")
    } else if (!props.zipValue.match(/^\d{3}-\d{4}$/)) {
      props.SetZipFlag("format-incorrect")
    } else {
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${props.zipValue}`)
        .then(res => res.json())
        .then((json) => {
          if (json.results === null) {
            props.SetZipFlag("unexist")
          } else {
            props.SetZipFlag("ok")
          }
        })
        .catch((error) => {
          props.SetZipFlag("unexist")
          console.log(error)
        });
    }
  })

  return (
    <>
      <div className={`form-group ${styles.formGroup}`} key="zipForm" >
        <label htmlFor="inputZipcode" className={styles.title}>郵便番号</label>
        
        <Btn 
          zipFlag = {props.zipFlag} 
          zipValue = {props.zipValue} 
        />
        
        <label
          id="ErrorInputZipcode"
          className="control-label"
          style={{
            color: "red",
            display: "none"
          }}
          htmlFor="inputError"
        >郵便番号を入力してください</label>
        <input
          type="text"
          id="inputZipcode"
          className="form-control form-control-lg "
          placeholder="例）xxx-xxxx"
          value={props.zipValue}
          onChange={(ev) => {
            props.SetZipValue(ev.target.value);
          }}
        />
      </div>
    </>
  );
}

export default ZipForm ;
