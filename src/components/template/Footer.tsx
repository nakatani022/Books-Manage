import { memo, ReactNode, FC } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const Footer: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <SFooter>
        <SInner>
          <Slogo>Copyright@nakatani</Slogo>
        </SInner>
      </SFooter>
      {children}
    </>
  );
});

const SFooter = styled.footer`
  height: 80px;
  background: #006c70;
`;

const SInner = styled.div`
  height: 80px;
  background: #006c70;
`;

const Slogo = styled.div`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  color: white;
  font-size: 22px;
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
`;

