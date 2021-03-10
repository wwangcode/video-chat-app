import styled from 'styled-components'
import Image from 'next/image'


const Footer = ({handleMute, handleUnmute, muteMic, joined, handleTurnOffCam, handleTurnOnCam, camOff}) => {
    return (
        <>
            {joined ?         
                <Container>
                    {muteMic ?            
                        <IconButton onClick={() => {handleUnmute()}}>
                            <Image src='/mute-microphone.svg' alt='unmute-microphone' height='40px' width='40px' />
                            Unmute Mic
                        </IconButton>
                    :
                        <IconButton onClick={() => {handleMute()}}>
                            <Image src='/microphone.svg' alt='mute-microphone' height='40px' width='40px' />
                            Mute Mic
                        </IconButton>
                    }
                    {camOff ? 
                        <IconButton onClick={() => {handleTurnOnCam()}}>
                            <Image src='/eye-slash.svg' alt='turn-on-cam' height='40px' width='40fpx' />
                            Turn On Webcam
                        </IconButton>
                    :
                        <IconButton onClick={() => {handleTurnOffCam()}}>
                            <Image src='/eye.svg' alt='turn-off-cam' height='45px' width='45px' />
                            Turn Off Webcam
                        </IconButton>

                }
                </Container>
                : <Container />
            }
        </>
    )
}

export default Footer


const Container = styled.footer`
    margin: 0 auto;
    text-align: center;
    width: 100vw;
    height: 8rem;
    padding: 1rem 0;
    background-color: rgba(231, 113, 125, 1);
    position: absolute;
    bottom: 0;
    color: white;
    padding-top: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const IconButton = styled.div`
    cursor: pointer;
    padding: 0 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;