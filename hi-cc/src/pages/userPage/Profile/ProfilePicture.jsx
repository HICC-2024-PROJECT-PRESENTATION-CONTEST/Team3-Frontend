import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PersonIcon from "../../../assets/personIcon.png";
import AddButton from "../../../assets/AddButton.png";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePicture() {
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        fetch(`${API_URL}/profiles/@me/image`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if(!res.ok) {
                    const error = new Error();
                    error.status = res.status;
                    throw error;
                }
                return res.blob();
            })
            .then((blob) => {
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
                } else if (error.status === 404) {
                    alert("프로필 정보를 찾을 수 없습니다.");
                } else if (error.status === 500) {
                    navigate("/500");
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            });
    }, []);

    function handleRegister() {
        if (!selectedFile) {
            document.getElementById('fileInput').click();
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        fetch(`${API_URL}/profiles/@me/image`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        })
            .then((res) => {
                if(!res.ok) {
                    const error = new Error();
                    error.status = res.status;
                    throw error;
                } else {
                    navigate('/recommends');
                }
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
                } else if (error.status === 404) {
                    alert("프로필 정보를 찾을 수 없습니다.");
                } else if (error.status === 400) {
                    console.error("필수가 필드 누락되었습니다.");
                } else if (error.status === 500) {
                    navigate("/500");
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            });
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');

                    // vw 계산
                    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                    // 150px 이상, 300px 이하
                    let width = Math.min(Math.max(0.3* vw, 150), 300);
                    let height = width;

                    const size = Math.min(img.width, img.height);
                    canvas.width = width;
                    canvas.height = height;

                    // 캔버스를 정사각형으로 자름
                    // img 객체, x 자르기 시작할 위치, y 자르기 시작할 위치,이미지 내의 x, y 중심으로 그려질 높이, 캔버스의 x, y 좌표, 캔버스에 그릴 x 크기, 캔버스에 그릴 y 크기
                    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, width, height);

                    // 캔버스 내용을 Blob 객체로 변환. 원래 파일 이름, JPEG 형식 사용.
                    canvas.toBlob((blob) => {
                        const newFile = new File([blob], file.name, { type: 'image/jpeg' });
                        setSelectedFile(newFile);
                        setImageSrc(URL.createObjectURL(blob));

                        // 필요 없어진 URL 해제
                        return () => URL.revokeObjectURL(URL.createObjectURL(blob));
                    }, 'image/jpeg');
                };
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSkip() {
        navigate('/recommends');
    }

    return (
        <ProfilePictureWrapper>
            <ProfilePictureInnerWrapper>
                <Title>프로필 사진 등록</Title>
                <IconWrapper>
                    {imageSrc ? <ImgPreview src={imageSrc} /> : <Icon src={PersonIcon} alt="person icon" />}
                    <AddButtonWrapper src={AddButton} alt="사진을 추가하려면 클릭하세요." onClick={() => document.getElementById('fileInput').click()} />
                </IconWrapper>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <DescriptionWrapper>
                    <DescriptionTitle>
                        유의사항
                    </DescriptionTitle>
                    <DescriptionText>
                        사진을 등록한 경우 프로필 사진을 등록한 사람끼리는 사진을 볼 수 있지만, 사진을 등록하지 않은 경우 상대방의 프로필 사진을 볼 수 없습니다.
                    </DescriptionText>
                </DescriptionWrapper>
            </ProfilePictureInnerWrapper>
            <ButtonWrapper>
                <Button onClick={handleSkip}>건너뛰기</Button>
                <Button
                    onClick={handleRegister}
                    style={{ color: "#000000", backgroundColor: "#F94364", border: "solid 4px #000000" }}
                >
                    등록하기
                </Button>
            </ButtonWrapper>
        </ProfilePictureWrapper>
    )
};

const ProfilePictureWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    align-items: center;
    background: #F9DBDD;
`

const ProfilePictureInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 83vh;
`

const Title = styled.span`
    display: flex;
    justify-content: center;
    width: 75vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    margin: 11vh 0 4vh 0;
    top: 100px;

    font-size: 25px;
`

const IconWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30vw;
    height: 30vw;
    min-width: 150px;
    min-height: 150px;
    max-width: 300px;
    max-height: 300px;

    border: solid 7px;
    border-radius: 20%;

    background-color: #FAA8B1;

    z-index: 10;
`

const ImgPreview = styled.img`
    position: absolute;
    
    width: 30vw;
    height: 30vw;
    min-width: 150px;
    min-height: 150px;
    max-width: 300px;
    max-height: 300px;

    border-radius: 20%;
    object-fit: cover;
    
    z-index: 100;
`

const Icon = styled.img`
    width: 18vw;
    height: 18vw;
    min-width: 90px;
    min-height: 90px;
    max-width: 180px;
    max-height: 180px;
`

const AddButtonWrapper = styled.img`
    position: absolute;
    right: -10px;
    bottom: -14px;

    width: 8vw;
    min-width: 40px;
    max-width: 80px;
    height: auto;

    cursor: pointer;

    z-index: 10000;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    margin: 5vh 0;
`

const DescriptionTitle = styled.div`
    text-align: center;
    margin-bottom: 5px;

    font-size: 18px;
`

const DescriptionText = styled.div`
    text-align: center;
    
    white-space: normal;
    word-break: keep-all; 
    font-size: 15px;
    color: #747474;
`
const ButtonWrapper = styled.div`
    display: flex;
    width: 75vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    justify-content: center;
`

const Button = styled.button`
    width: 35vw;
    min-width: 130px;
    height: 60px;
    margin: 0 1.5vw;

    border: solid 4px #5D5D5D;
    border-radius: 20px;

    background-color: #9B9B9B;

    font-size: 25px;
    color: #FFFFFF;

    cursor: pointer;

    @media screen and (max-width: 360px) {
        font-size: 23px;
    }
`