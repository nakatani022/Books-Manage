import { memo, FC } from 'react';
import { Route, Routes } from "react-router-dom";
// import { onClickFetchData } from "../App";
// import onClickFetchData from "../App";
// import  SearchBar  from '../components/SearchBar';
import App from "../App";
import MyList from "../MyList";
import BookDetail from '../BookDetail';
import Login from "../Login";
import { Shiori } from "../Shiori";
import { Header } from '../components/template/Header';


export const Router: FC = memo(()=>{
  return(
    <Routes>
      {/* <Route path="/" element={<SearchBar onSubmit={onClickFetchData} />} /> */}

      <Route path="/" element={<Header><App /></Header>} />
      <Route path="/mylist" element={<Header><MyList /></Header>} />
      {/* <Route path="/app" element={<App />} /> */}
      <Route path="/bookDetail" element={<Header><BookDetail /></Header>} />
      <Route path="/login" element={<Header><Login /></Header>} />
      <Route path="/bookDetail/:id" element={<Header><Shiori /></Header>} />
      {/* <Route path='*' element={<Page404 />} /> */}
    </Routes>
  )
});