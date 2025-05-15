import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { PropsFromRedux } from "./AppContainer";
import HeaderContainer from "../Header/HeaderContainer";
import IndexContainer from "../Index/IndexContainer";
import CakeContainer from "../Cake/CakeContainer";
import ChatContainer from "../Chat/ChatContainer";
import CreateCakeContainer from "../CreateCake/CreateCakeContainer";

const App = (props: PropsFromRedux) => {
  useEffect(() => {
    props.getAuth();
  }, []);

  return (
    <>
      <HeaderContainer />
      <main className="main">
        <Routes>
          <Route path="/" element={<IndexContainer />} />
          <Route path="/cakes/:id" element={<CakeContainer />} />
          <Route path="/chats/:id" element={<ChatContainer />} />
          <Route path="/chats" element={<ChatContainer />} />
          <Route path="/create-cake" element={<CreateCakeContainer />} />
        </Routes>
      </main>
    </>
  );
}

export default App;