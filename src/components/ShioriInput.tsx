import { memo, FC } from "react";
import styled from "styled-components";


type Props = {
  changePage: any;
  changeTerm: any;
  changeText: any;
  clickShiori: any;
  page: number;
  term: string;
  text: string;
  validate: boolean;
};


export const ShioriInput: FC<Props> = memo((props) => {
  const { changePage, changeTerm, changeText, clickShiori, 
  page, term, text, validate } = props;

  return (
    <>
      <Sdiv>
        <St>ページ:</St><Spage type="number" min={0} value={page} onChange={changePage} />
        <St>単語:</St><Sterm value={term} onChange={changeTerm} />
      </Sdiv>
        <Stext value={text} onChange={changeText} placeholder="解説を記入" />
        <Svalidate validate={validate}>※ページ、単語、解説を記入してください。</Svalidate>
        <Sbutton onClick={clickShiori}>栞を挟む</Sbutton>
    </>
  );
});

const Sdiv = styled.div`
  margin: 0px auto;
  width: 804px;
  display: flex;
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  @media (max-width: 900px) {
    display: block;
    width: auto;
  }
`;

const Spage = styled.input`
  width: 60px;
  font-size: 18px;
  outline: none;
  height: 26px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 12px;
  background: #fff;
  border: 1px solid #00000052;
  border-radius: 6px;
  display: block;
  @media (max-width: 900px){
    margin-top: 0px;
    margin-left: 0px;
  }
`;

const Sterm = styled.input`
  width: 300px;
  font-size: 18px;
  outline: none;
  height: 26px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 12px;
  background: #fff;
  border: 1px solid #00000052;
  border-radius: 6px;
  &:focus {
    // border: 2px solid #16B286; 
    z-index: 10;
    outline: 0;
  }
  @media (max-width: 900px){
    margin-top: 0px;
    margin-left: 0px;
  }
  @media (max-width: 430px){
    width: auto;
    margin-left: 0px;
  }
`;

const Stext = styled.textarea`
  width: 250px;
  font-size: 18px;
  outline: none;
  height: 60px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  margin-right: 5px;
  background: #fff;
  border: 1px solid #00000052;
  border-radius: 6px;
  width: 700px;
  height: 140px;
  padding: 10px;
  @media (max-width: 900px) {
    width: 95%;
  }
`;

const Svalidate = styled.p<{ validate: boolean}>`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  display: ${(props) => (props.validate ? "block" : "none")};
`;

const Sbutton = styled.button`
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
  display: block;
  margin-top: 20px;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #16B286;
    padding: 13px 53px;
    border: 2px solid #16B286;
    font-weight: 800;
  }
`;

const St = styled.p`
  @media (max-width: 900px){
    margin-bottom: 0px;
  }
`;