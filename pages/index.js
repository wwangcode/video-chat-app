import dynamic from "next/dynamic";
import styled from 'styled-components'

import Header from '../components/header'
const NoSSRVideoCall = dynamic(() => import("../components/video-call"), {
  ssr: false,
});


const App = () => {
  return (
    <Container>
      <Header />
      <NoSSRVideoCall />
    </Container>
  );
}

export default App

const Container = styled.main`
  margin: 0 auto;
`;