import { useState, FC } from "react";
import "./App.css";
import axios from "axios";
import { BooksList } from "./components/BooksList";
import SearchBar from "./components/SearchBar";
import styled from "styled-components";
import bgImage from "./book2.jpg";

const App: FC = () => {
  const [todos, setTodos] = useState<any>([]);
  const [active, setActive] = useState<boolean>(false);

  const onClickFetchData = async (word: any) => {
    setTodos("");
    const params = {
      q: `intitle:${word}`,
      maxResults: 40,
    };

    try {
      await axios
        .get("https://www.googleapis.com/books/v1/volumes?", { params })
        .then((response) => {
          if (!response.data.items) return;
          setTodos(response.data.items);
          setActive(true);
        });
    } catch (error) {
      console.log("error111");
      setActive(false);
    }
  };
  const error = "該当なし";

  return (
    <>
      <Ssection>
        <Simage active={active} alt="画像テスト" src={bgImage} />
        <Smask active={active}/>

        <SearchBar onSubmit={onClickFetchData} />

        <Sflex>
          {todos
            ? 
              todos.map((item: any) => {
                return (
                  <BooksList
                    title={item.volumeInfo.title}
                    authors={item.volumeInfo.authors}
                    description={item.volumeInfo.description}
                    imageLinks={item.id}
                  />
                );
              })
            : error}
        </Sflex>
      </Ssection>
    </>
  );
};

const Ssection = styled.section`
  position: relative;
  width: 100%;
`;
const Smask = styled.div<{ active: boolean }>`
  height: ${(props) => (props.active ? "400px" : "900px")};
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  top: 0;
`;

const Simage = styled.img<{ active: boolean }>`
  height: ${(props) => (props.active ? "400px" : "900px")};
  width: 100%;
  object-fit: cover;
`;
const Sflex = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  @media (max-width: 1400px){
    max-width: 960px
  }
  @media (max-width: 1020px){
    max-width: 600px
  }
  @media (max-width: 665px){
    max-width: 400px;
  }
  @media (max-width: 444px){
    width: 280px;
  }
  @media (max-width: 340px){
    width: 240px;
  }
`;

export default App;
