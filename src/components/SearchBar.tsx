import { memo, FC, useState } from "react";
import styled from "styled-components";

type Props = {
  onSubmit: any;
};

const SearchBar: FC<Props> = memo((props) => {
  const { onSubmit } = props;
  const [word, setword] = useState<string>("");

  const onFromSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(word);
    setword('');
  };
  const onChangeInput = (event: any) => setword(event.target.value);
  return (
    <>
      <Sform className="ui form" onSubmit={onFromSubmit}>
        <div className="field">
          <Sinput
            type="text"
            name="search"
            placeholder="書籍検索"
            value={word}
            onChange={onChangeInput}
          />
        </div>
      </Sform>
    </>
  );
});

const Sform = styled.form`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const Sinput = styled.input`
  outline: none;
  width: 450px;
  border-radius: 24px;
  padding: 14px;
  outline: none;
  border: none;
  font-size: 16px;
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
  "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
  "MS PMincho", serif;
  margin-top: 120px;
  &focus{
    background-color: white;
  }
  &:-webkit-autofill{
    box-shadow: 0 0 0px 1000px #fff inset;
  }
  @media(max-width: 600px){
    width: 300px;
  }
  @media (max-width: 380px){
    width: 230px;
    height: 20px;
  }
`


export default SearchBar;