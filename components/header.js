import styled from 'styled-components'


const Header = () => {
    return (
        <Container>
            <Title>Video Room - real time video chat</Title>
        </Container>
    )
}

export default Header

const Container = styled.div`
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

