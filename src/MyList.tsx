import { useState, FC, memo, useEffect } from "react";
import "./App.css";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import styled from "styled-components";
import book4 from "./book4.jpg";


const MyList: FC = memo(() => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const postData = collection(db, "google-books");
    const q = query(postData, orderBy("timestamp", "desc"));
    // getDocs(q).then((querySnapshot) => {
    //   setPosts(querySnapshot.docs.map((doc) => doc.data()));
    // });
    /* リアルタイムでデータを取得 */
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id })));
    });
  }, []);


  const navigate = useNavigate();
  
  const myListTest = posts.map((post: any, index: string) => (
    {authors: post.authors, image: post.image, title: post.title, memo: post.memo, description: post.description, readDate: post.readDate}
    ));
    

    const onClickLink = (index: string)=> {
      navigate("/bookDetail", {
        state: [
          { authors: myListTest[index].authors },
          { imageLinks: myListTest[index].image },
          { title: myListTest[index].title },
          { description: myListTest[index].description},
          { memo: myListTest[index].memo },
          { readDate: myListTest[index].readDate}
        ],
    })
  };

  const removeDate = (id: any) => {
    deleteDoc(doc(db, "google-books", id))
  }

  const onClickShiori = (index: string) => {
    navigate(`/bookDetail/${index}`, {
      state: [
        { authors: myListTest[index].authors },
        { imageLinks: myListTest[index].image },
        { title: myListTest[index].title },
        { memo: myListTest[index].memo },
      ],
    })
  };

  const myList = posts.map((post: any, index: string) => (
    <>
      <Srow key={post.id}>
        <SbookImage
          alt=""
          src={`https://books.google.com/books/content?id=${post.image}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
        />
        <StextBox>
          <Stitle>{post.title}</Stitle>
          <Sauthors>著者:{post.authors}</Sauthors>
          <SreadTime>登録日:{post.readDate}</SreadTime>
          <Smemo>所感:{post.memo}</Smemo>
          <Sclick onClick={()=> onClickLink(index)}>編集</Sclick>
          <SclickRemove onClick={() => removeDate(post.id)}>削除</SclickRemove>
          <SclickShiori onClick={() => onClickShiori(index)}>栞</SclickShiori>
        </StextBox>
      </Srow>
    </>
  ));


  return (
    <>
      <Sbackground>
        <SbackMask>
          <Scontainer>
            {myList}
          </Scontainer>
        </SbackMask>
      </Sbackground>
    </>
  );
});

const Sbackground = styled.div`
  background-image: url(${book4});
  width: 100%;
  background-size: contain;
  position: relative;
  min-height: 100vh;
`;

const SbackMask = styled.div`
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  top: 0;
`

const Scontainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  // width: 1400px;
  padding-bottom: 32px;
  max-width: 1500px;
  justify-content: space-between;
  @media (max-width: 1456px){
    justify-content: center;
  }
`;

const Srow = styled.div`
  display: flex;
  margin: 20px;
  position: relative;
  width: 680px;
  padding-top: 120px;
  @media (max-width: 750px){
    width: 400px;
    flex-direction: column;
  }
`;

const StextBox = styled.div`
  // width: 270px;
  background-color: #fff;
  padding: 10px 20px;
  position: relative;
    top: 20px;
    left: 0px;
    right: 0px;
    border: 0px;
    width: 397px;
  @media (max-width: 750px){
    width: auto;
    top: 0px;
  }
`;

const Stitle = styled.h1`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
    font-size: 24px;
`;

const SbookImage = styled.img`
  width: 250px;
  z-index: 2;
  height: 380px;
  @media (max-width: 750px){
    width: 200px;
    height: 270px;
    }
`;

const Sauthors = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
`;

const Smemo = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
`;

const Sclick = styled.button`
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
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #999;
    padding: 13px 53px;
    border: 2px solid #999;
    font-weight: 600;
  }
`;

const SclickRemove = styled.button`
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
  margin-right: 20px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #1b224c;
    padding: 13px 53px;
    border: 2px solid #1b224c;
    font-weight: 600;
  }
  @media (max-width: 392px){
    margin-top: 12px;
  }
`;

const SclickShiori = styled.button`
  padding: 0;
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-color: #16B286;
  padding: 15px 55px;
  color: #fff;
  font-size: 18px;
  margin-right: 20px;
  margin-top: 20px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #03a59d;
    padding: 13px 53px;
    border: 2px solid #03a59d;
    font-weight: 600;
  }
  @media (max-width: 392px){
    margin-top: 12px;
    min-width: 146px;
  }
`;

const SreadTime = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
`;

export default MyList;
