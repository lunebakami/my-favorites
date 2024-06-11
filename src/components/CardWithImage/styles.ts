import Styled from "styled-components";

export const Card = Styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; 
  height: 20rem;
  width: 15rem;
  
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

export const Container = Styled.div`
  padding: 16px;
`;

export const InfoContainer = Styled.div`
  width: 12rem;
  display: inline-block;

  h3, p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  h3 {
    height: 1.4rem;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }

  p {
    height: 1rem;
    font-size: 0.8rem;
    margin: 0;
  }
`;

export const ImageContainer = Styled.div`
  overflow: hidden;
`;

export const Image = Styled.img`
  margin: 0 auto;
  height: 12rem;
`;
