import { memo, FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  title: string;
  authors: string;
  description: string;
  imageLinks: string;
};

export const BooksList: FC<Props> = memo((props) => {
  const { title, authors, description, imageLinks } = props;
  const navigate = useNavigate();
  const onClickLink = () =>
    navigate("/bookDetail", {
      state: [
        { authors: authors },
        { imageLinks: imageLinks },
        { title: title },
        { description: description },
      ],
    });

  const image = imageLinks ? (
    <Simg
      src={`https://books.google.com/books/content?id=${imageLinks}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
      alt=""
    />
  ) : (
    <p>なし</p>
  );

  return (
    <>
      <Scoard>
        <Stitle>{title}</Stitle>
        {image}
        <Sauthor>{authors}</Sauthor>
        <Sdescription>{description}</Sdescription>
        <Sbutton onClick={onClickLink}>記録・編集</Sbutton>
      </Scoard>
    </>
  );
});

// // メディアクエリ
// @mixin mq($width: 1200px) {
//   @media (max-width: $width) {
//     @content;
//   }
// }

const Scoard = styled.div`
  max-width: 290px;
  background: rgb(0, 108, 112);
  margin: 15px 15px 15px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  padding-bottom: 20px;
  width: 25%;
  &:nth-last-child(2n) {
    background: rgb(5, 135, 140);
  }
  @media (max-width: 1400px){
    width: 33%;
  }
  @media (max-width: 1020px){
    width: 45%;
  }
  @media (max-width: 665px){
    max-width: 350px;
    width: 100%;
  }
`;

const Stitle = styled.h1`
  color: white;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
`;

const Simg = styled.img`
  height: 270px;
  display: flex;
  margin: 0 auto;
`;

const Sauthor = styled.h3`
  color: white;
  display: flex;
  justify-content: center;
  margin: 0 15px;
  padding-top: 20px;
`;

const Sdescription = styled.p`
  color: white;
  padding: 10px;
`;

const Sbutton = styled.button`
  padding: 0;
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-color: #fff;
  padding: 15px 55px;
  border-radius: 4px;
  box-shadow: 12px 12px 2px 1px transparent;
  color: rgb(0, 108, 112);
  font-size: 14px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  font-weight: bold;
  display: flex;
  margin: 0 auto;
  &:hover {
    opacity: 0.9;
  }
`;

// const
