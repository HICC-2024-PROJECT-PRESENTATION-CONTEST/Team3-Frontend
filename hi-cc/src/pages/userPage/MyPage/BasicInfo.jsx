import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Modal from "../../../components/QuitModal";

const API_URL = import.meta.env.VITE_API_URL;

export default function BasicInfo() {
    const [data, setData] = useState(null);
    const dialog = useRef();

    useEffect(() => {
        fetchMyProfile();
    }, []);

    async function fetchMyProfile() {
        await fetch(`${API_URL}/profiles/@me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function renderData(data) {
        return (
            <DataWrapper>
                <Data>
                    <DataKey>이름</DataKey>
                    <DataValue>{data.name}</DataValue>
                </Data>
                <Data>
                    <DataKey>성별</DataKey>
                    <DataValue>{data.gender === 'F' ? "여" : "남"}</DataValue>
                </Data>
                <Data>
                    <DataKey>전화번호</DataKey>
                    <DataValue>{data.phone}</DataValue>
                </Data>
                {data.major ?
                    <Data>
                        <DataKey>학과</DataKey>
                        <DataValue>{data.major}</DataValue>
                    </Data> : ""}
                <Data>
                    <DataKey>나이</DataKey>
                    <DataValue>{data.birthyear}년생</DataValue></Data>
                <Data>
                    <DataKey>상대 나이차</DataKey>
                    <DataValue>위로 {data.birthyear_offset.plus} 아래로 {data.birthyear_offset.minus}</DataValue>
                </Data>
                {data.mbti ?
                    <Data>
                        <DataKey>MBTI</DataKey>
                        <DataValue>{data.mbti}</DataValue>
                    </Data> : ""}
                <Data>
                    <DataKey>닮은꼴</DataKey>
                    <DataValue>{data.looklike}</DataValue>
                </Data>
                <Data>
                    <DataKey>흡연여부</DataKey>
                    <DataValue>{data.smoking ? "예" : "아니오"}</DataValue>
                </Data>
            </DataWrapper>
        )
    }

    // 탈퇴 버튼 클릭 시
    function handleQuit() {
        dialog.current.showModal();
    }

    return (
        <BasicInfoWrapper>
            {/* 기본 정보 표시 */}
            <BasicInfoInnerWrapper>
                {data ? renderData(data) : <div>로딩중</div>}
            </BasicInfoInnerWrapper>

            <ButtonWrapper>
                <QuitButton onClick={handleQuit}>탈퇴하기</QuitButton>
            </ButtonWrapper>

            {/* 탈퇴 버튼 클릭 시 모달 열림 */}
            <Modal ref={dialog} />
        </BasicInfoWrapper>
    )
};

const BasicInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 1;
`

const BasicInfoInnerWrapper = styled.div`
    box-sizing: border-box;
    width: calc(100% - 30px);
    height: auto;
    margin-top: 20px;

    background-color: #FFDEE2;

    border: solid 3px #000000;
    border-radius: 10px;
`

const ButtonWrapper = styled.div`
    display: flex;
    width: calc(100% - 15px);
    justify-content: end;
`

const QuitButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    width: 62px;
    height: 22px;
    margin: 10px;

    background: #F94364;
    border: 2px solid #000000;
    border-radius: 5px;

    font-size: 10px;

    cursor: pointer;
`

const DataWrapper = styled.div`
    margin: 19px;
`

const Data = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 18px 0;
    font-size: 18px;
`

const DataKey = styled.div`
    
`

const DataValue = styled.div`
    
`