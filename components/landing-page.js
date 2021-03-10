import styled from 'styled-components'


const LandingPage = () => {
    return (
        <Container>
            Type in a room name to enter chat! Please note that room names are case sensitive.
        </Container>
    )
}

export default LandingPage



const Container = styled.div`
    color: grey;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 auto;
    text-align: center;
    padding-top: 10rem;
`;