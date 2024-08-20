import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/MainButton";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const navigate = useNavigate();
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validPhone = (phonenumber.length === 11);
        const validPassword = (password.length >= 4);
        setIsValid(validPhone && validPassword);
    }, [phonenumber, password])

    function handlePhonenumberChange(e) {
        const numbersOnly = e.target.value.replace(/\D/g, '');
        setPhonenumber(numbersOnly);
    }

    function formatPhoneNumber(value) {
        // 숫자만 추출
        const numbersOnly = value.replace(/\D/g, '');

        // 하이픈 추가
        if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
            return numbersOnly.replace(/(\d{3})(\d+)/, "$1-$2");
        } else if (numbersOnly.length > 7) {
            return numbersOnly.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
        }
        return numbersOnly;
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleClick() {
        fetchLogin();
    }

    async function fetchLogin(){
        const data = {
            phone: phonenumber,
            password: password,
        }
        await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if(!response.ok){
                throw {status: response.status, message: response.statusText}
            } else {
                navigate('/mypage');
            }
        })
        .catch((error) => {
            if(error.status === 401) {
                alert('가입되지 않은 전화번호 혹은 잘못된 비밀번호입니다.');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }
        })
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    return (
        <LoginWrapper>
            <LoginInnerWrapper>
                <Title>
                    <TitleText>로그인하기</TitleText>
                    <DescriptionText>
                        전화번호와 비밀번호를 입력해주세요.
                    </DescriptionText>
                </Title>
                <Input
                    type="text"
                    name="phonenumber"
                    value={formatPhoneNumber(phonenumber)}
                    onChange={handlePhonenumberChange}
                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} // e, E, +, - 입력 막기
                    placeholder="전화번호"
                    maxLength="13"
                />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    autoComplete="off"
                    onChange={handlePasswordChange}
                    onKeyDown={handleKeyDown} // enter 키 처리
                    placeholder="비밀번호" />
                <DescriptionText2>
                    비밀번호를 잊어버리셨다면 관리자에게 문의해주세요.
                </DescriptionText2>
            </LoginInnerWrapper>
            <Button onClick={handleClick} $valid={isValid} $position="absolute">로그인</Button>
        </LoginWrapper>
    )
};

const LoginWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #F9DBDD;
    overflow: auto;
`

const LoginInnerWrapper = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75vw;
    min-width: 250px;
    max-width: 400px;
    height: auto;
    min-height: max(60vh, 400px);
`

const Title = styled.span`
    width: 100%;
    margin: max(11vh, 80px) 0 max(3vh, 22px) 0;
    top: 100px;
`

const TitleText = styled.div`
    margin: max(1vh, 7px) 0;
    font-size: 25px;
    word-break: keep-all;
`

const DescriptionText = styled.div`
    font-size: 13px;
    color: #464646;
    word-break: keep-all;
`

const Input = styled.input`
    width: calc(100% - 30px);
    height: 45px;

    margin: 10px;
    padding: 0 15px;

    border: solid 3px #000000;
    border-radius: 10px;

    font-size: 15px;

    &::placeholder {
        color: #8F8F8F;
    }

    // type이 number일 경우 화살표 제거
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

const DescriptionText2 = styled.div`
    width: calc(100% - 20px);
    font-size: 12px;
    color: #8F8F8F;
    word-break: keep-all;
`