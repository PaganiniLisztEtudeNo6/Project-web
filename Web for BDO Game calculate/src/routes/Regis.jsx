import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/4544706.jpg");
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

  const [t, st] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Email , setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3333/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Name: username, Password: password , Email})
    })
      .then(response => response.json())
      .then(data => {
        console.log('Status:', data);

        if (data.status === 'OK') {
          console.log('Complete EEEEEEEEE!')
          window.location.reload()
          //เปลี่ยนไปหน้า Dashboard 
        }else{
          st(data.message)
  
        }

      })
      .catch((error) => {
        console.log(t)
        st('User not already')
        console.error('Error:', 'Regis : 84 Error');
      });
};return (

    <SignInWrapper>
      <form>
      <label>Enter your name:
        <input
          type="text" 
          value={"kaveewat"} 
        />
      </label>
    </form>
    </SignInWrapper>
  );
}

export default SignIn;
