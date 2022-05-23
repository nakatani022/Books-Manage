import { FC, memo } from "react";
import "./App.css";
import { signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import Bgbook from "./book4.jpg";

const Login: FC = memo(() => {
  const [user] = useAuthState(auth);


  const SignInButton = () => {
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider);
    };

    return (
      <Sbutton onClick={signInWithGoogle}>
        <p>GoogleSignIn</p>
      </Sbutton>
    );
  };

  const UserInfo = () => {
    const googleImage = auth.currentUser?.photoURL
      ? auth.currentUser.photoURL
      : undefined;
    return (
      <>
        <SimgIcon src={googleImage} alt="" />
        <SgoogleName>{auth.currentUser?.displayName}</SgoogleName>
      </>
    );
  };

  const SignOutButton = () => {
    return (
      <SbuttonBack onClick={() => auth.signOut()}>SignOut</SbuttonBack>
    );
  };

  return (
    <>
      <SloginBack>
        <Scontainer>
          {user ? (
            <>
              <UserInfo />
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </Scontainer>
      </SloginBack>
    </>
  );
});

const SloginBack = styled.section`
  background-image: url(${Bgbook});
  background-repeat: repeat;
  background-size: contain;
  height: 85vh;
  padding-top: 120px;
`;

const Scontainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding-top: 100px;
  @media (max-width: 400px){
    width: auto;
  }
`;

const SimgIcon = styled.img`
  width: 200px;
  margin-top: 24px;
  margin: 0 auto;
  display: block;
`;

const SgoogleName = styled.p`
  font-family: "Yu Mincho", "游明朝体", "YuMincho", "ヒラギノ明朝 Pro W3",
    "Hiragino Mincho Pro", "HiraMinProN-W3", "HGS明朝E", "MS P明朝",
    "MS PMincho", serif;
  font-size: 24px;
  color: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const Sbutton = styled.button`
  padding: 0;
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-color: #008489;
  padding: 15px 55px;
  color: #fff;
  font-size: 18px;
  margin-right: 20px;
  margin: 0 auto;
  display: block;
  border-radius: 9px;
  &:hover {
    background-color: #fff;
    color: #008489;
    padding: 13px 53px;
    border: 2px solid #008489;
    font-weight: 600;
  }
`;

const SbuttonBack = styled.button`
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
  margin: 0 auto;
  display: block;
  padding: 22px 55px;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    color: #1b224c;
    font-weight: 600;
    padding: 20px 55px;
    border: 2px solid #1b224c;
  }
`;

export default Login;
