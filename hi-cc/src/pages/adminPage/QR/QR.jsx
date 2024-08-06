import styled from 'styled-components';
import Button from '../../../components/MainButton';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Qr() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [qrImage, setQrImage] = useState(null);

    function handleClick() {
        fetchQr();
    }

    async function fetchQr() {
        await fetch(`${API_URL}/auth/qr`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                setIsAuthenticated(false);
                throw new Error('error');
            } else {
                setIsAuthenticated(true);
                return response.json();
            }
        }).then((response) => {
            const qrResponseUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${response.data.key}&size=200x200`;
            setQrImage(qrResponseUrl);
        }).catch((error) => {
            console.error(error.message);
        });
    }

    useEffect(() => {
        fetchQr();
    }, [])

    if(isAuthenticated === null) {
        return (
            <div>Loading...</div>
        );
    }

    return(
        <QRPageWrapper>
            <TextWrapper>
                <TitleText>
                    QR코드를 스캔하세요.
                </TitleText>
                <DescriptionText>
                    웹 접속을 위한 QR코드입니다.<br />
                    접속 시 만료됩니다.
                </DescriptionText>
            </TextWrapper>
            <QRWrapper>
                <QRInnerWrapper>
                    {isAuthenticated ? (<>
                        <img src={qrImage} alt="QR 코드" style={{ width: '25vw' }}/>
                    </>) : <div>Loading...</div>}
                </QRInnerWrapper>
            </QRWrapper>
            <Button onClick={handleClick} $valid={true}>QR 코드 생성</Button>
        </QRPageWrapper>
    )
};

const QRPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #F9DBDD;
    overflow: auto;
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    height: auto;
`

const TitleText = styled.div`
    margin: 17vw 0 10px 0;
    
    font-size: 32px;
`
const DescriptionText = styled.div`
    display: flex;
    text-align: center;
    white-space: normal;
    font-size: 17px;
    color: #8F8F8F;
`

const QRWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 35vw;
    height: 35vw;

    background-color: #FFFFFF;
    border-radius: 10px;
    margin: 20px;
`
const QRInnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30vw;
    height: 30vw;
    
    border: solid 1px #D5D4D4;
    border-radius: 20px;
`