import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;
const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

const KeyHandler = () => {
  const { key } = useParams();
  const [isKeyValid, setIsKeyValid] = useState('loading');
  const navigate = useNavigate();

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
          throw { status: response.status, message: response.statusText };
      }
    })
    .catch(error => {
      if (error.status === 403) {
        setIsKeyValid('false');
    } else if (error.status === 302) {
        return;
    } else if (error.status === 500 || error.status === 502) {
        navigate('/500');
    } else {
        console.error(error);
    }
    });
  }, [key]);

  return (
    <Wrapper>
      {isKeyValid === 'loading' ?
      <InnerWrapper>
        <h1 style={{margin: '5px 0px'}}>키 처리 중...</h1>
        <p style={{margin: '5px 0px'}}>잠시만 기다려주세요.</p>
      </InnerWrapper>
      : <InnerWrapper>
        <h1 style={{margin: '5px 0px'}}>만료된 키입니다.</h1>
        <p style={{margin: '5px 0px'}}>관리자에게 새로운 키를 요청하세요.</p>
      </InnerWrapper>

}
      
    </Wrapper>
  );
};

export default KeyHandler;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #F9DBDD;
`

const InnerWrapper = styled.div`
  padding: 20px 30px;
  background-color: #FAA8B1;
  border-radius: 20px;
`