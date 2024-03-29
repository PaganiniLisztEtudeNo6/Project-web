import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate  } from 'react-router-dom';

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/1283670.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #A0A0A0;
  border-top: 2px solid #A0A0A0;
  border-bottom: 3px dotted #A0A0A0;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const InputWrapper = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ButtonWrapper = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const LinkWrapper = styled(Link)`
  margin-top: 1rem;
`;

function SignIn() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [t, st] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log('Output :', username, password);
    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Name: username, Password: password })
    })

      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 'ok') {
          localStorage.setItem('token' , data.token)
          navigate("/Menu")
        }else{
          st(data.message)
          console.log(t)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <SignInWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Sign In</h1>
        <InputWrapper type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <InputWrapper type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <p style={{color : "red"}}>{t}</p>
        <ButtonWrapper type="submit">Sign In</ButtonWrapper>
        <LinkWrapper to="/signup" style={{ marginTop: '1rem' }}>
          Don't have an account?
        </LinkWrapper>
      </FormWrapper>
    </SignInWrapper>
  );
}

export default SignIn;
