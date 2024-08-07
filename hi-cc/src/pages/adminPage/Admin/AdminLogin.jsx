import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault(); // form 기본 동작 중단
        try {
            const response = await fetch(`${API_URL}/auth/manager/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({key: key})
            });

            if(!response.ok){
                throw new Error('error');
            }

            navigate('/admin');

        } catch(error) {
            setError(true);
            console.error(error);
        }
    }

    return(
        <AdminLoginWrapper onSubmit={handleSubmit}>
            <StyledInput
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
                placeholder="관리자키 입력"
            />
            <Button type="submit">로그인</Button>
            {error ? <Error>올바른 관리자키를 입력해주세요.</Error> : ""}
        </AdminLoginWrapper>
    )
};

const AdminLoginWrapper = styled.form`
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;

    justify-content: center;
    align-items: center;

    background-color: #2d2b39;
`
const StyledInput = styled.input`
    width: 160px;
    height: 50px;

    border: solid 2px;
    border-radius: 10px;

    font-size: 20px;

    padding: 0 20px;
`

const Error = styled.div`
    font-family: sans-serif;
    font-size: 15px;
    color: #ff5c5c;
`

const Button = styled.button`
    width: 200px;
    height: 50px;
    
    border: 0px;
    border-radius: 10px;
    margin: 10px 0;
    
    font-size: 20px;
    color: #FFFFFF;

    background-color: #161616;

    cursor: pointer;

    &:hover {
        background-color: #000000;
    }
`