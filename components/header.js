import styled from 'styled-components'
import {forwardRef} from 'react'

const Header = forwardRef(({channelRef, leaveRef, joined, handleSubmit, handleLeave}) => {
    return (
        <Container>
            <Title>Video Room - real time video chat</Title>
            <InputContainer joined>
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

        </Container>
    )
})

export default Header

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
  padding-top: 1rem;
  background-color: rgba(231, 113, 125, 1);
  margin: 0 auto;
  ${Input} {
    &:hover {
      background-color: rgba(133,145,250,1);
    }
  }
`;

const Container = styled.header`
    padding: 1rem;
    margin: 0 auto;
    text-align: center;
    background-color: rgba(231, 113, 125, 1);
`;

const Title = styled.div`
    font-size: 3rem;
    font-weight: 500;
    color: white;
`;

