import styled from 'styled-components';

export const Header = styled.header`
text-align: center;
margin-bottom: 1rem;
`;
export const Title = styled.h1`
font-size: 2rem;
font-weight: 600;
text-align: left;
margin-bottom: 1rem;
`;
export const AddContact = styled.button`
font-size: 1rem;
font-weight: 400;
color: blue;
margin-bottom: 0.3rem;
`;
export const Input = styled.input`
width: 100%;
background-color: ${props => props.readOnly ? '#a6a6a6' : 'lightgray'};
border-radius: 0.5rem;
padding: 0.2rem 0.6rem;
outline: none;
`;
export const AppContainer = styled.div`
padding: 1rem;
`;

export const Button = styled.button`
border-radius: 0.5rem;
padding: 0.2rem 1rem;
background-color: blue;
color:white;
font-weight: 600
`