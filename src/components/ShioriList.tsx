import { memo, FC } from "react";
import styled from "styled-components";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  shioriFilter: any;
  clickRemove: any;
};


export const ShioriList: FC<Props> = memo((props) => {
  const { shioriFilter, clickRemove } = props;

  const shioriMap = shioriFilter.map((shiori: any) => {
    return (
      <>
        <Sdiv key={shiori.id}>
          <SpageNumber>P{shiori.page}</SpageNumber>
          <Stitle>単語{shiori.term}</Stitle>
          <SwrapperExplain>
            <Sexplain>{shiori.text}</Sexplain>
          </SwrapperExplain>
          <SiconBox onClick={() => clickRemove(shiori.id)}>
            <SFontAwesomeIcon icon={faBook} />
          </SiconBox>
        </Sdiv>
      </>
    );
  });

  return <>{shioriMap}</>;
});


const Sdiv = styled.div`
  margin: 0px auto;
  width: 804px;
  display: flex;
  position: relative;
  padding: 10px 20px;
  background-color: #fff;
  margin: 20px auto;
  min-height: 90px;
  border: 2px solid;
  @media (max-width: 900px) {
    display: block;
    width: 470px;
  }
  @media (max-width: 620px){
    width: 370px;
  }
  @media (max-width: 430px){
    width: auto;
    margin: 4px;
  }
`;

const Stitle = styled.h1`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  font-size: 24px;
  padding: 20px;
  margin: 0px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  max-width: 265px;
  word-break: break-all;
  @media (max-width: 900px){
    padding: 0px;
    max-width: initial;
  }
  @media (max-width: 430px){
    font-size: 18px;
  }
`;

const SpageNumber = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  font-size: 24px;
  padding: 20px;
  padding-left: 0px;
  margin: 0px;
  display: flex;
  align-items: center;
  @media (max-width: 900px){
    font-size: 18px;
    padding: 0px;
  }
`;

const Sexplain = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  font-size: 18px;
  padding: 0px 20px;
  margin: 0px;
  padding-right: 40px;
  width: 480px;
  word-wrap: break-word;
  @media (max-width: 900px){
    padding: 0px;
  }
  @media (max-width: 620px){
    width: auto;
  }
`;

const SwrapperExplain = styled.div`
`;

const SiconBox = styled.div`
  right: 13px;
  top: 0px;
  bottom: 0;
  margin: auto;
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;
  @media (max-width: 900px){
    position: static;
  }
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 22px;
  color: #16b286;
  &:hover {
    cursor: pointer;
  }
`;
