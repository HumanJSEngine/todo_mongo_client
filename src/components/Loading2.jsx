import React from 'react'
import Spinner from '../styles/spinner.gif';
import * as s from '../styles/Styletest';


const Loading2 = () => {
  return (
    <s.Background>
      <s.LoadingText>잠시만 기다려 주세요.</s.LoadingText>
      <img src={Spinner} alt='로딩중' width="5%"/>
    </s.Background>
  )
}

export default Loading2