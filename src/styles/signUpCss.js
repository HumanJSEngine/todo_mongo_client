import styled from 'styled-components'

const SignUpDiv = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  form {
    width:100%;
    padding:20px;
    box-shadow: 0px 19px 38px rgba(0,0,0,0.03);
    display:flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input {
      border-radius: 10px;
      border:1px solid #c6c6c6;
      padding: 5px;
      margin-bottom: 10px;
      &:active,
      &:focus{
        outline:none;
      }
    }
    button {
      border: 1px solid wheat;
      border-radius: 15px;
      padding:10px;
      background-color: skyblue;
      color:wheat;
      margin-bottom: 10px;
      &:hover{
        background-color: #fff;
        color:#000;
      }
    }
  }
`;

export default SignUpDiv;