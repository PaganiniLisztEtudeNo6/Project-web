import { Box, Button, Center , Flex } from '@mantine/core'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect , useState  } from 'react';




export default function Header() {

  const [username, setUsername] = useState("");
  const navigate = useNavigate();

    const token = localStorage.getItem('token')
    
    useEffect(() => {
      fetch('http://localhost:3333/authen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      })
  
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.status === 'success') {
            setUsername(data.decoded.Name);

              //
          }else{

            navigate("/")
              //
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },[])
  
  return (    
    <Flex h="80px" bg={"dark.7"} justify="Center" align="center">
  <Box>
    <Flex justify="center" gap={"30px"}>
      <Link to="/MyAccount">
        <Button radius="" size="xl">
          Account
        </Button>
      </Link>

      <Link to="/Menu">
        <Button radius="" size="xl">
          Explore
        </Button>
      </Link>

      <Link to="/Setting">
        <Button radius="" size="xl">
          Settings
        </Button>
      </Link>
    </Flex>

  </Box>
  </Flex>
  )
}

