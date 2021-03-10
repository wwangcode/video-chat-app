import dynamic from "next/dynamic";
const NoSSRVideoCall = dynamic(() => import("../components/video-call"), {
  ssr: false,
});


const App = () => {
  return (
    <NoSSRVideoCall /> 
  );
}

export default App
