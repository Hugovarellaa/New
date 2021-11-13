import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    @media(max-width: 1080px){
      font-size: 93.75%
    }
    @media(max-height: 720px){
      font-size: 87.5%;
    }
  }

  :root{
    --blue: #5429CC;
    --blue-light: #6933ff;
    --green: #33CC95;
    --red: #E62E4D;
    --shape: #FFFFFF;
    --text-title: #363F5F;
    --text-body: #969CB3;
    --background: #EDF2F7;
  }

  body{
    background-color: var(--background);
    --webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button{
    font: 400 1rem "Poppins", sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
  }

  button{
    cursor: pointer;
  }

  [disabled]{
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
