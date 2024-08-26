import { useState, useEffect } from "react";
import styled from "styled-components";

import ProfileCard from "../../../components/MyPageProfileCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyChoice() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchChoiceTo();
    }, []);

    // 상대방의 선택 가져오기
    async function fetchChoiceTo() {
        await fetch(`${API_URL}/profiles/@me/choices`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok)
                    throw { status: response.status, message: response.statusText }
                else return response.json();
            })
            .then((result) => {
                setData(result.data.choices_from);
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert('접근 권한이 없습니다.');
                    navigate('/');
                } else if (error.status === 404) {
                    alert('상대의 프로필 정보를 찾을 수 없습니다.');
                } else if (error.status === 500 || error.status === 502) {
                    navigate('/500');
                } else {
                    console.error(error);
                }
            })
    }

    return (
        <OthersChoiceWrapper>
            <ProfileCardWrapper>
                {data ?
                    (data.length !== 0) ? data.map((data) => {
                        return <ProfileCard id={data.uid} key={data.uid} data={data}  $delete={data.delete}/>
                    })
                        : <Error>나를 선택한 상대가 없습니다.</Error>
                     :
                    <Error>정보를 불러올 수 없습니다.</Error>
                }
            </ProfileCardWrapper>
        </OthersChoiceWrapper>
    )
};

const OthersChoiceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    flex-grow: 1;
`

const ProfileCardWrapper = styled.div`
    width: calc(100% - 30px);
    height: auto;
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const Error = styled.div`
    box-sizing: border-box;
    padding: 10px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 40px;

    background-color: #FFDEE2;
    border-radius: 10px;
`