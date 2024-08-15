import styled from 'styled-components';
import Button from '../../../components/MainButton';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

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
                throw { status: response.status, message: response.statusText };
            } else {
                setIsAuthenticated(true);
                return response.json();
            }
        }).then((response) => {
            const qrResponseUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${VITE_LOCAL_URL}/qr/${response.data.key}&size=200x200`;
            setQrImage(qrResponseUrl);
        }).catch((error) => {
            if(error.status === 403) {
                alert('접근 권한이 없습니다.');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                console.error(error);
            }
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
            <QRPageInnerWrapper>
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
                        <img src={qrImage} alt="QR 코드" style={{ width: '25vw', maxWidth: '200px', minWidth: '150px' }}/>
                    </>) : <div>Loading...</div>}
                </QRInnerWrapper>
            </QRWrapper>
            </QRPageInnerWrapper>
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
`

const QRPageInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    height: auto;
    min-height: max(80vh, 400px);
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    height: auto;
`

const TitleText = styled.div`
    margin: 100px 0 10px 0;
    font-size: 32px;
    word-break: keep-all;
    text-align: center;
`
const DescriptionText = styled.div`
    display: flex;
    text-align: center;
    white-space: normal;
    font-size: 17px;
    color: #8F8F8F;
    word-break: keep-all;
`

const QRWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 210px;
    width: 35vw;
    max-width: 280px;
    min-height: 210px;
    height: 35vw;
    max-height: 280px;

    background-color: #FFFFFF;
    border-radius: 10px;
    margin: 20px;
`
const QRInnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 180px;
    width: 30vw;
    max-width: 240px;
    min-height: 180px;
    height: 30vw;
    max-height: 240px;
    
    border: solid 1px #D5D4D4;
    border-radius: 20px;
`