import styled from 'styled-components';

export const Header = styled.header`
text-align: center;
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
font-weight: 600;
border: solid 1px blue;
`
export const ButtonSecondary = styled.button`
border-radius: 0.5rem;
padding: 0.2rem 1rem;
background-color: none;
border: solid 1px blue;

font-weight: 600
`

export const ModalButtons = styled.div`
display:flex;
justify-content:center;
gap: 1.2rem;
margin-top: 2rem;
`

export const ModalTitle = styled.div`
text-align:center;
font-weight: 600;
font-size: 1.2rem;
`

export const List = styled.ol`
margin-top:1rem;
`