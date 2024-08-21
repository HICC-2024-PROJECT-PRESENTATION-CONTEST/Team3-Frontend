import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UserTable } from "../../../components/UserTable";

const API_URL = import.meta.env.VITE_API_URL;

export default function Users() {
    const navigate = useNavigate();
    const [countUsers, setCountUsers] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [size, setSize] = useState(50);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetchUserCount();
        // setProfiles([
        //     {
        //         "uid": "00000000-0000-0000-0000-000000000000",
        //         "name": "히이익",
        //         "phone": "01000000000",
        //         "instagram": "hiiiiiccccc",
        //         "gender": "F",
        //         "birthyear": 2003,
        //         "birthyear_offset": {
        //           "plus": 3,
        //           "minus": 1
        //         },
        //         "height": 165,
        //         "major": "자율전공",
        //         "mbti": "ICBM",
        //         "looklike": "MISSILE",
        //         "smoking": false
        //     },
        //     {
        //         "uid": "00000000-0000-0000-0000-000000000000",
        //         "name": "히이익",
        //         "phone": "01000000000",
        //         "instagram": "hiiiiiccccc",
        //         "gender": "F",
        //         "birthyear": 2003,
        //         "birthyear_offset": {
        //           "plus": 3,
        //           "minus": 1
        //         },
        //         "height": 165,
        //         "major": "자율전공",
        //         "mbti": "ICBM",
        //         "looklike": "MISSILE",
        //         "smoking": false
        //     }
        // ]);
    }, [page]);

    async function fetchUserCount() {
        await fetch(`${API_URL}/profiles?count`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => {
            if(!response.ok) {
                throw {status: response.status, message: response.statusText}
            }
            else
                return response.json();
        })
        .then((result) => {
            setCountUsers(result.data);
        })
        .catch((error) => {
            if(error.status === 403) {
                alert('접근 권한이 없습니다.');
                navigate('/admin/login');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                console.error(error);
            }
        })
    }

    async function fetchSearch() {
        await fetch(`${API_URL}/profiles?find=${searchValue}&page=${page}&size=${size}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => {
            if(!response.ok) {
                throw {status: response.status, message: response.statusText}
            }
            else
                return response.json();
        })
        .then((result) => {
            setProfiles(result.data);
            setPage(1);
        })
        .catch((error) => {
            if(error.status === 403) {
                alert('접근 권한이 없습니다.');
                navigate('/admin/login');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                console.error(error);
            }
        })
    }

    async function fetchSearchCount() {
        await fetch(`${API_URL}/profiles?find=${searchValue}&count`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => {
            if(!response.ok) {
                throw {status: response.status, message: response.statusText}
            }
            else
                return response.json();
        })
        .then((result) => {
            setMaxPage(Math.ceil(result.data/size));
        })
        .catch((error) => {
            if(error.status === 403) {
                alert('접근 권한이 없습니다.');
                navigate('/admin/login');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                console.error(error);
            }
        })
    }

    return(
        <AdminUserWrapper>
            <UserCountWrapper>이용자 수: {countUsers}명</UserCountWrapper>
            <SearchBoxWrapper>
                <SearchBox type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="이름, 전화번호, 인스타 아이디"/>
                <Button onClick={() => {
                    fetchSearch();
                    fetchSearchCount();
                }}>
                    검색
                </Button>
            </SearchBoxWrapper>
            <ResultWrapper>
                <thead>
                    <tr>
                        <Th>이름</Th>
                        <Th>전화번호</Th>
                        <Th>인스타</Th>
                        <Th>성별</Th>
                        <Th>보기</Th>
                        <Th>삭제</Th>
                    </tr>
                </thead>
                <tbody>
                    {profiles ? profiles.map((profiles, index) => {
                        return <UserTable key={index} data={profiles} />
                    }) : ""}
                </tbody>
            </ResultWrapper>
            <Pagination>
                <Prev onClick={() => {setPage(page - 1)}} style={{visibility: page > 1 ? 'visible' : 'hidden'}}>이전</Prev>
                <span>{page}</span>
                <Next onClick={() => {setPage(page + 1)}} style={{visibility: page < maxPage ? 'visible' : 'hidden'}}>다음</Next>
            </Pagination>
        </AdminUserWrapper>
    )
};

const AdminUserWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #2d2b39;
    overflow: auto;
`

const UserCountWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    text-align: end;
    padding: 20px;
    color: #FFFFFF;
    font-size: 17px;
    font-family: sans-serif;
`

const SearchBoxWrapper = styled.div`
    box-sizing: border-box;
    width: fit-content;
    min-width: 300px;
    background-color: #1e1e29;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
`

const SearchBox = styled.input`
    box-sizing: border-box;
    width: 50vw;
    min-width: 180px;
    height: 25px;
    border: none;
    border-radius: 5px;
    padding: 0 5px;
    margin: 0 10px;
    font-size: 15px;
    font-family: sans-serif;

    &::placeholder{
        font-size: 12px;
    }
`


const Button = styled.button`
    box-sizing: border-box;
    
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    
    font-size: 15px;
    font-family: sans-serif;
    font-weight: 600;
    color: #FFFFFF;

    background-color: #161616;
    box-shadow: 0 0 5px #555487;

    cursor: pointer;

    &:hover {
        background-color: #000000;
    }
`

const ResultWrapper = styled.table`
    box-sizing: border-box;
    
    min-width: 320px;
    width: 90%;
    max-width: 800px;
    margin: 10px 0;
    background-color: #1e1e29;

    border-collapse: collapse;

    padding: 10px;
`

const Th = styled.th`
    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;
    border: solid 1px #44485d;

    padding: 5px 0;
`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;
`

const Prev = styled.button`
    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;

    background-color: transparent;
    border: none;
`

const Next = styled.button`
    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;

    background-color: transparent;
    border: none;
`