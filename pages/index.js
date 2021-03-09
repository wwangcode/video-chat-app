import dynamic from "next/dynamic";
import '../styles/Home.module.css'

const NoSSRVideoCall = dynamic(() => import("../components/video-call"), {
  ssr: false,
});


const App = () => {
  return (
    <>
      <NoSSRVideoCall />
    </>
  );
}

export default App