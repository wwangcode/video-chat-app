import React, { useState, useRef } from "react";
import axios from 'axios'
import ReactDOM from "react-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import styled from 'styled-components'



export const rtc = {
    // For the local client
    client: null,
    // For the local audio and video tracks
    localAudioTrack: null,
    localVideoTrack: null,
  };
  
// export const options = {
//     // Pass your app ID here
//     appId: `${process.env.AGORA_APP_ID}`,
//     certificate: `${process.env.AGORA_APP_CERTIFICATE}`,
//     // Pass a token if your project enables the App Certificate
//     // token: `${process.env.AGORA_TEST_TOKEN}`,
// };

function VideoCall() {
    const [joined, setJoined] = useState(false);
    const [volume, setVolume] = useState(100);

    const channelRef = useRef("");
    const remoteRef = useRef("");
    const leaveRef = useRef("");

  async function handleSubmit(e) {
    try {
      if (channelRef.current.value === "") {
        return console.log("Please Enter Room Name");
      }

      setJoined(true);

      rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

      // Create an audio track from the audio captured by a microphone
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Create a video track from the video captured by a camera
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

      rtc.localVideoTrack.play("local-stream");

      rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");
        // console.log(user);

        if (mediaType === "video") {
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;
          console.log(remoteVideoTrack);

          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          const PlayerContainer = React.createElement("div", {
            id: user.uid,
            className: "stream",
          });
          ReactDOM.render(
            PlayerContainer,
            document.getElementById("remote-stream")
          );

          user.videoTrack.play(`${user.uid}`);
        }

        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.setVolume(volume)
          // Play the audio track. Do not need to pass any DOM element
          remoteAudioTrack.play();
        }
      });

      rtc.client.on("user-unpublished", (user) => {
        // Get the dynamically created DIV container
    
        // const playerContainer = document.getElementById(user.uid);
        const playerContainer = document.getElementById((user.uid));
        console.log(playerContainer);
        
        // Destroy the container
        ReactDOM.unmountComponentAtNode(
            playerContainer,
            document.getElementById('remote-stream')
        )
      });

    // gets generated channel key token from server 
      const res = await axios.post('/api/channel-token-generator', {channelName: channelRef.current.value})

      console.log(res)
      const { token: channelKey } = res.data

      const uid = await rtc.client.join(
        //   channelKey replaces app ID for increased security 
          channelKey,
        // channel name
        channelRef.current.value,
        // uid - null or 0, client will create uid on success
        null,
      );

      // Publish the local audio and video tracks to the channel
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

      console.log("publish success!");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLeave() {
    try {
      const localContainer = document.getElementById("local-stream");

      rtc.localAudioTrack.close();
      rtc.localVideoTrack.close();

      setJoined(false);
      localContainer.textContent = "";

      // Traverse all remote users
      rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV container
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
      });

      // Leave the channel
      await rtc.client.leave();
    } catch (err) {
      console.error(err);
    }
  }

  // const [ volume, setVolume ] = useState(100)
  // // Sets the volume of the recorded signal.
  // rtcEngine.adjustRecordingSignalVolume(volume);


  return (
    <>
    <Container>
      <InputContainer joined={joined}>
        <Input
          type="text"
          ref={channelRef}
          id="channel"
          placeholder="Enter Room Name"
          disabled={joined ? true : false}
          style={{backgroundColor: 'white', color: 'black'}}
        />
          {joined ?
            <>
              <Input
                type="button"
                ref={leaveRef}
                value="Leave"
                onClick={handleLeave}
                disabled={joined ? false : true}
              />
            </>
          : 
            <>
              <Input
                type="submit"
                value="Join"
                onClick={handleSubmit}
                disabled={joined ? true : false}
              />
            </>
          }
      </InputContainer>
      {joined ? (
        <VideoStreamContainer>          
          <div id="local-stream" className="stream local-stream" />
          <div
            id="remote-stream"
            ref={remoteRef}
            className="stream remote-stream"
          />
        </VideoStreamContainer>
      ) : null}
    </Container>
    </>
  );
}

export default VideoCall;


const VideoStreamContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.input`
  cursor: pointer;
  padding: .5rem;
  outline: none;
  margin: 0 .25rem;
  background-color: rgba(113,125,231,1);
  border-radius: 1rem;
  border: 0;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;

`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 1rem;
  background-color: rgba(231, 113, 125, 1);
  margin: 0 auto;
  ${Input} {
    &:hover {
      background-color: rgba(133,145,250,1);
    }
  }
`;

const Container = styled.div`
  margin: 0 auto;

`;
