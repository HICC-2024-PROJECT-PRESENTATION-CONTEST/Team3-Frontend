import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;
const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

const KeyHandler = () => {
  const { key } = useParams();

  useEffect(() => {
    // 백엔드로 요청 보내기
    fetch(`${API_URL}/auth/qr/${key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.ok) {
        window.location.href = `${VITE_LOCAL_URL}`;
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [key]);

  return (
    <Wrapper>
      <h1>키 처리 중...</h1>
      <p>잠시만 기다려주세요.</p>
    </Wrapper>
  );
};

export default KeyHandler;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #F9DBDD;
`