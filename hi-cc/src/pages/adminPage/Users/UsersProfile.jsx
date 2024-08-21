import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;

export default function UsersProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        fetchProfilePicture(data.uid);
    }, []);

    async function fetchProfilePicture(uid) {
        await fetch(`${API_URL}/profiles/${uid}/image?size=200`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText }
                } else {
                    setProfilePicture(`${API_URL}/profiles/${uid}/image?size=200`);
                }
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert('접근 권한이 없습니다.');
                    navigate('/admin/login');
                } else if (error.status === 404) {
                    setProfilePicture(null);
                } else if (error.status === 500 || error.status === 502) {
                    navigate('/500');
                } else {
                    console.error(error);
                }
            })
    }

    function handleProfilePictureDelete(uid) {
        fetchProfilePicutreDelete(uid);
    }

    function handleDelete(uid) {
        fetchDeleteProfile(uid);
    }

    async function fetchDeleteProfile(uid) {
        await fetch(`${API_URL}/profiles/${uid}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText }
                } else {
                    alert('사용자의 프로필이 정상적으로 삭제되었습니다.');
                    navigate(-1);
                }
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert('접근 권한이 없습니다.');
                    navigate('/admin/login');
                } else if (error.status === 500 || error.status === 502) {
                    navigate('/500');
                } else {
                    console.error(error);
                }
            })
    }


    async function fetchProfilePicutreDelete(uid) {
        fetch(`${API_URL}/profiles/${uid}/image`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText }
                } else {
                    alert("프로필 사진이 정상적으로 삭제되었습니다.");
                    setProfilePicture(null);
                };
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
                } else if (error.status === 404) {
                    // 프로필 사진 등록 안한 경우
                    return;
                } else if (error.status === 500 || error.status === 502) {
                    navigate("/500");
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            });
    }

    return (
        <ResultWrapper>
            <ResultInnerWrapper>
                <Result>
                    <Data>uid: {data.uid}</Data>
                </Result>
            </ResultInnerWrapper>
            <ResultInnerWrapper>
                <Result>
                    <Data style={{ width: '100px', height: '100px' }}>
                        {profilePicture ?
                            <Image src={profilePicture} alt="프로필 사진" />
                            :
                            <span>프로필 사진 없음</span>
                        }
                    </Data>
                    <Data>
                        <Button onClick={() => handleProfilePictureDelete()}>
                            사진 삭제
                        </Button>
                    </Data>
                </Result>
                <Result>
                    <Data>이름: {data.name}</Data>
                    <Data>전화번호: {data.phone}</Data>
                    <Data>인스타: {data.instagram}</Data>
                    <Data>성별: {data.gender}</Data>
                    <Data>전공: {data.major}</Data>
                    <Data>키: {data.height}</Data>
                    <Data>닮은꼴: {data.looklike}</Data>
                    <Data>나이차: 위로 {data.birthyear_offset.plus}살, 아래로 {data.birthyear_offset.minus}살</Data>
                    <Data>MBTI: {data.mbti}</Data>
                    <Data>흡연여부: {data.smoking ? "예" : "아니오"}</Data>
                    <Data>
                        <Button onClick={() => handleDelete(data.uid)}>사용자 삭제</Button>
                    </Data>
                </Result>
            </ResultInnerWrapper>
        </ResultWrapper>
    );
}

const ResultWrapper = styled.div`
    box-sizing: border-box;
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    min-width: 100vw;
    width: auto;
    min-height: 100vh;
    height: auto;
    background-color: #1e1e29;
`

const ResultInnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Result = styled.div`
    box-sizing: border-box;
    font-family: sans-serif;
`

const Data = styled.div`
    text-align: start;

    border: solid 1px #44485d;
    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;
    padding: 5px;
`

const Image = styled.img`
    width: 90px;
    height: 90px;
`

const Button = styled.button`
    box-sizing: border-box;

    background-color: #c54e4e;
    color: #FFFFFF;
    font-family: sans-serif;
    border: none;
    box-shadow: 0 0 1px #FFFFFF;
    
    cursor: pointer;
`