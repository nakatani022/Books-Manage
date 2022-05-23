import { memo, ReactNode, FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


type Props = {
  children: ReactNode;
};


export const Header: FC<Props> = memo((props) => {
  const { children } = props;
  const [active, setActive] = useState<boolean>(false);

  const onClickMenu = ()=> {
    setActive(!active);
    console.log(active);
  }

  return (
    <>
    <SHeader>
      <SHeaderInner>
        <SInner>
          <Slogo to="/">知識の森</Slogo>
          <div>
            <SLink to="/">作成</SLink>
            <SLink to="/mylist">集積所</SLink>
            <SLink to="/login">認証</SLink>
          </div>

          <SheaderSp >
            <SheaderHumburger onClick={onClickMenu} active={active}>
              <Sspan></Sspan>
              <Sspan></Sspan>
              <Sspan></Sspan>
            </SheaderHumburger>
          </SheaderSp>
        </SInner>
      </SHeaderInner>
    </SHeader>
      <SsideBar active={active}>
        <SSideLink onClick={onClickMenu} to="/">作成</SSideLink>
        <SSideLink onClick={onClickMenu} to="/mylist">集積所</SSideLink>
        <SSideLink onClick={onClickMenu} to="/login">認証</SSideLink>
      </SsideBar>
      {children}
    </>
  );
});

const SheaderSp = styled.div`
@media (min-width: 600px){
  display: none;
}
display: flex;
align-items: center;
margin-left: auto;
margin-top: 26px;
`;
const SheaderHumburger = styled.div<{ active: boolean }>`
  width: 74px;
  height: 50px;
  cursor: pointer;
  margin: 0 auto;
  position: relative;
  user-select: none;
  & span {
    display: block;
    margin: 0;
    border: none;
    width: 50%;
    height: 1px;
    background: #fff;
    transform-origin: 0% 50%;
    position: absolute;
    top: 2px;
    left: 25%;
    transition: 0.3s;
    transform: ${(props) => ([props.active && "rotate(45deg)"])};
    top: ${(props) => (props.active ? "0px" : "2px" )};
    &:nth-of-type(2) {
      top: 11px;
      opacity: ${(props) => (props.active ? 0 : 1)}
    }
    &:nth-of-type(3){
      top: ${(props) => (props.active ? "26px" : "20px")};
      transform: ${(props) => ([props.active && "rotate(-45deg)"])};
      width: 50%;
      // top: 20px;
    }
  }
`;

const SHeader = styled.div`
  position: fixed;
  top: 0;
  justify-content: space-between;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 80px;
`;

const SHeaderInner = styled.header`
  height: 80px;
  background: #006c70;
  width: 100%;
  @media (max-width: 1300px){
    padding: 0 40px;
  }
  @media (max-width: 600px){
    padding: 0 20px;
  }
  @media (max-width: 440px){
    padding: 0 10px;
  }
`;

const SsideBar = styled.div<{ active: boolean }>`
@media (min-width: 600px){
  display: none;
}
  display: ${(props) => (props.active ? "block" : "none")};
  display: block;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  right: 0px;
  height: 100%;
  z-index: 4;
  width: 230px;
  text-align: center;
  padding-top: 44px;
  right: ${(props) => (props.active ? "0" : "-100%")};
  transition: right .5s;
  padding-top: 100px;
`;

const SInner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 80px;
`;

const Slogo = styled(Link)`
  text-decoration: none;
  font-size: 32px;
  color: #fff;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  @media (max-width: 430px){
    font-size: 28px;
  }
  @media (max-width: 380px){
    font-size: 22px;
  }
`;

const SLink = styled(Link)`
  color: #fff;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  text-decoration: none;
  margin: 30px;
  @media (max-width: 600px){
    display: none;
  }
`;

const SSideLink = styled(Link)`
  color: #fff;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  text-decoration: none;
  margin: 30px;
  display: block;
`;

const Sspan = styled.span`
`;
