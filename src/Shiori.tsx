import { memo, FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShioriInput } from "./components/ShioriInput";
import { ShioriList } from "./components/ShioriList";
import { db } from "./firebase";
import Bgbook from "./book4.jpg";
import styled from "styled-components";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

type shioriType = {
  authors: string;
  imageLinks: number;
  title: string;
  memo: string;
};

export const Shiori: FC = memo(() => {
  const { state } = useLocation();

  // タイトル著者メモ取得、出力
  const [shiori, setShiori] = useState<Array<shioriType>>(
    state as Array<shioriType>
  );
  const shioriAuthors = shiori[0].authors;
  const title = shiori[2].title;
  const memo = shiori[3].memo;
  // 


  const [page, setPage] = useState<number>(0);
  const [term, setTerm] = useState<string>("");
  const [text, setText] = useState<string>("");
  // const [id, setId] = useState<any>(0);
  const [shioriArray, setShioriArray] = useState<any>([]);
  const [validate, setValidate] = useState<boolean>(false);
  // const [datas, setDatas] = useState<any>([]);

  const onChangeTerm = (event: any) => setTerm(event.target.value);
  const onChangeText = (event: any) => setText(event.target.value);
  const onChangePage = (event: any) => setPage(event.target.value);


  const outputData = () => {
    const saveData = collection(db, "shiori-list");
    const q = query(saveData, orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setShioriArray(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setDocumentId(querySnapshot.docs.map((doc) => console.dir((doc.data()))));
    });
  };
  // console.dir(documentId);


  const onClickShiori = (event: any) => {
    if (!term || !page || !text) {
    setValidate(true);
    return;
    } 
    event.preventDefault();

    addDoc(collection(db, "shiori-list"), {
      title: title,
      page: page,
      term: term,
      text: text,
      timestamp: serverTimestamp(),
    });

    setValidate(false);
    setTerm("");
    setText("");
    setPage(0);
    outputData();
  };

  const clickRemove = (id: any) => {
    deleteDoc(doc(db, "shiori-list", id))
  }
  
  useEffect(() => {
    outputData();
  }, [db]);


  const shioriFilter = shioriArray.filter((shiori: any) => {
    return (shiori.title === title);
  })


  return (
    <>
      <Ssection>
        <Sdiv>
          <Stitle>{title}</Stitle>
          <Sauthors>著者:{shioriAuthors}</Sauthors>
          <Smemo>所感:{memo}</Smemo>
          <ShioriInput changePage={onChangePage} changeTerm={onChangeTerm}
            changeText={onChangeText} clickShiori={onClickShiori} 
            page={page} term={term} text={text} validate={validate}/>
        </Sdiv>
        <Scontainer>
          <ShioriList shioriFilter={shioriFilter} clickRemove={clickRemove}/>
        </Scontainer>
      </Ssection>
    </>
  );
});

const Ssection = styled.section`
  background-image: url(${Bgbook});
  background-size: contain;
  position: relative;
  background-size: contain;
  padding-bottom: 40px;
  min-height: 85vh;
  padding-top: 44px;
`;

const Sdiv = styled.div`
  margin: 0px auto;
  width: 804px;
  position: relative;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 120px;
  @media (max-width: 900px) {
    display: block;
    width: 470px;
  }
  @media (max-width: 620px) {
    width: 370px;
  }
  @media (max-width: 430px){
    width: auto;
    margin: 12px;
    margin-top: 120px;
  }
`;

const Stitle = styled.h1`
  font-family: "Open Sans","Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  font-size: 24px;
  padding: 20px 7px;
  padding-bottom: 0px;
`;

const Sauthors = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  font-size: 18px;
  padding: 20px;
  line-height: 40px;
  padding-top: 0px;
  padding-left: 4px;
  padding-bottom: 0px;
  margin-bottom: 0px;
`;

const Smemo = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  font-size: 16px;
  margin: 0px;
  padding: 12px 7px;
  padding-left: 3px;
`;

const Scontainer = styled.div`
  height: auto;
  width: 877px;
  margin: 50px auto 0px;
  overflow-y: scroll;
  max-height: 400px;
  @media (max-width: 900px){
    width: 570px;
  }
  @media (max-width: 620px){
    width: auto;
  }
`;