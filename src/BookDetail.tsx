import { memo, FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import styled from "styled-components";
import Bgbook from "./book4.jpg";

type authors = {
  authors: string;
  imageLinks: number;
  title: string;
  description?: string;
  memo?: string;
  readDate?: string;
};

const BookDetail: FC = memo(() => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectId, setSelectId] = useState<Array<authors>>(
    state as Array<authors>
  );
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState();
  const [validate, setValidate] = useState<boolean>(false);
  const onClickLink = () => navigate(-1);

  const image = selectId[1].imageLinks ? (
    <Simg
      src={`https://books.google.com/books/content?id=${selectId[1].imageLinks}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
      alt=""
    />
  ) : (
    <p>なし</p>
  );

  const authors = selectId[0].authors;


  const onClickList = (e: any) => {
    if(!date || !memo) {
      setValidate(true);
      return;
    }
    navigate("/mylist");
    e.preventDefault();
    addDoc(collection(db, "google-books"), {
      title: title,
      memo: memo,
      authors: authors,
      image: selectId[1].imageLinks,
      description: description,
      readDate: date,
      id: Math.random(),
      timestamp: serverTimestamp(),
    });
    setValidate(false);
  };

  const title = selectId[2].title;
  const description = selectId[3].description;

  const onChange = (e: any) => setMemo(e.target.value);

  const onChangeDate = (e: any) => setDate(e.target.value);


  return (
    <Scontainer>
      <SbackImage>
        <Sdiv>
          {image}
          <SbookDetail>
            <Stitle>{title}</Stitle>
            <Sauthor>{authors}</Sauthor>
            {description}
            <Sbox>
              <p>読了日:</p>
              <Sinput type="date" value={date} onChange={onChangeDate} />
            </Sbox>
            <Stextarea
              value={memo}
              onChange={onChange}
              placeholder="感想を記入してください。"
            ></Stextarea>
            <Svalidate validate={validate}>※読了日と感動を記入して送信してください。</Svalidate>
            <SbuttonBox>
              <SsendButton onClick={onClickList}>情報送信</SsendButton>
              <SbackButton onClick={onClickLink}>戻る</SbackButton>
            </SbuttonBox>
          </SbookDetail>
        </Sdiv>
      </SbackImage>
    </Scontainer>
  );
});

const SbackImage = styled.div`
  background-image: url(${Bgbook});
  background-size: contain;
  position: relative;
  background-size: contain;
  padding-bottom: 40px;
  min-height: 85vh;
  padding-top: 160px;
`;

const Scontainer = styled.div`
  width: 800px;
  margin: 0px auto;
  width: 100%;
`;

const Sdiv = styled.div`
  margin: 0px auto;
  width: 804px;
  display: flex;
  position: relative;
  padding-top: 20px;
  padding-bottom: 72px;
  @media (max-width: 870px) {
    display: block;
    width: 470px;
  }
  @media (max-width: 490px){
    width: 370px;
  }
  @media (max-width: 380px){
    width: 330px;
  }
  @media (max-width: 340px){
    width: 280px;
  }
`;

const SbookDetail = styled.div`
  padding: 35px;
  z-index: 2;
  left: 200px;
  top: 40px;
  padding-left: 110px;
  padding-right: 50px;
  background-color: #fff;
  position: relative;
  top: 48px;
  left: -20px;
  padding-left: 50px;
  @media (max-width: 870px) {
    margin: 0 auto;
    position: static;
    padding: 35px 20px;
  }
  @media (max-width: 440px){
    width: auto;
  }
`;

const Stitle = styled.h1`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  font-size: 28px;
  @media (max-width: 440px){
    font-size: 24px;
  }
`;

const Sauthor = styled.h2`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  @media (max-width: 440px){
    font-size: 22px;
  }
`;

const Simg = styled.img`
  height: 450px;
  z-index: 3;
  @media (max-width: 870px) {
    display: block;
    margin-left: 15px;
    height: 300px;
  }
  // @media (max-width: 440px){
    margin-left: 0px;
  }
`;

const SbuttonBox = styled.div`
  padding-top: 20px;
`;

const Sbox = styled.div`
  display: flex;
  align-items: center;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  @media (max-width: 440px){
    width: 330px;
  }
  @media (max-width: 400px){
    width: auto;
  }
`;

const Sinput = styled.input`
  width: 200px;
  font-size: 18px;
  outline: none;
  height: 26px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  margin-left: 20px;
  background: content-box;
  border-radius: 6px;
  position: relative;
  display: inline-block;
  width: 200px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0px 12px;
  box-shadow: 1px 2px #ccc;
  &:hover,active{
    box-shadow: none;
  }
  @media (max-width: 500px){
    width: 180px;
  }
`;


const Stextarea = styled.textarea`
  display: flex;
  outline: none;
  width: 400px;
  height: 200px;
  font-size: 16px;
  font-weight: 400;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  background: content-box;
  @media (max-width: 600px){
    width: 100%;
  }
`;

const Svalidate = styled.p<{ validate: boolean}>`
  display: ${(props) => (props.validate ? "block" : "none")};
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
`;

const SsendButton = styled.button`
  padding: 0;
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-color: #999;
  padding: 15px 55px;
  color: #fff;
  font-size: 18px;
  margin-right: 20px;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #999;
    padding: 13px 53px;
    border: 2px solid #999;
    font-weight: 600;
  }
`;

const SbackButton = styled.button`
  padding: 0;
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-color: #1b224c;
  padding: 15px 55px;
  color: #fff;
  font-size: 18px;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #1b224c;
    font-weight: 600;
    padding: 13px 53px;
    border: 2px solid #1b224c;
  }
  // @media (max-width: 390px){
  //   margin-top: 12px;
  // }
`;

export default BookDetail;
