import { Box, Button, Col, Container, Flex, Select , SimpleGrid , Text} from '@mantine/core'
import React , {useState , useRef , useEffect} from 'react'
import Header from './CompoMain/Header'
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';


export default function Main() {


  const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 1rem;
  color: #333;
  font-family: sans-serif;
  margin-top: 20px;
  text-align: center;
  
  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
  
  th {
    background-color: #ccc;
    font-weight: bold;
  }
  
  td {
    background-color: #FFFFFF;
  }
  `;


  const [areas, setAreas] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const classOptions = [...selectedClass.map(cls => ({ label: cls.Name, value: cls.Name }))];
  classOptions.unshift({ label: "ALL", value: "" });
  const areaOptions = [...areas.map(area => ({ label: area.Area, value: area.Area }))];
  areaOptions.unshift({ label: "ALL", value: "" });
  const token = localStorage.getItem('token')
  const [username, setUsername] = useState(null);



  

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
            //
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      
  },[])

  const [filteredDataByUsername, SetfilteredDataByUsername] = useState([]);



  useEffect(() => {
    fetch(`http://localhost:3333/gethis`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFilteredData(data);
        setShowTable(true);
        console.log(username);
        const filteredDataByUsernames = data.filter(row => row.User === username);
        console.log(filteredDataByUsernames); // ตรวจสอบค่าที่ถูกต้องก่อนที่จะอัปเดต
        SetfilteredDataByUsername(filteredDataByUsernames);
        console.log(filteredDataByUsername.length);
      })
      .catch(error => console.error(error));
    }, [username]);
  
  



  useEffect(() => {
    fetch('http://localhost:3333/class')
      .then(response => response.json())
      .then(data => {
        setSelectedClass(data);
        console.log(data)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3333/locations')
      .then(response => response.json())
      .then(data => {
        setAreas(data);
        console.log(data)
      })
      .catch(error => console.error(error));
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [showTable, setShowTable] = useState(false);



  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState([]);

  const handleNextPage = () => {
    fetch(`http://localhost:3333/gethis?start=${startIndex + 10}&end=${startIndex + 20}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setStartIndex(startIndex + 10);
      })
      .catch(error => console.error(error));
  };
  
  const handlePrevPage = () => {
    if (startIndex >=10) {
      setStartIndex(startIndex - 10);
    }
  };


const change = () => {
  const totalSum = DataItemdrop.reduce((sum, item) => sum + parseInt(item.Totalprice), 0);
  console.log(totalSum);

  DataItemdrop.map((i,k) => {
    fetch(`http://localhost:3333/UpdateItem` , {
    method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Price: i.Price,
          QTY: i.QTY,
          Totalprice: i.Totalprice,
          Id: i.Id
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data
    })
    .catch(error => console.error(error));
    window.location.reload();
  
});


  fetch(`http://localhost:3333/Updatehis` , {
  method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TotalMoney: totalSum,
        hisid : hisid
      })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data
  })
  .catch(error => console.error(error));





}


  const [showItemdropTable, setShowItemdropTable] = useState(false);
  const [DataItemdrop, setDataItemdrop] = useState([]);
  const [hisid, sethisid] = useState([]);

  const handleButtonClick = hisid => {
    console.log(hisid);
    sethisid(hisid);
    
    fetch(`http://localhost:3333/hisid` , {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({hisid})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setDataItemdrop(data);
      setShowItemdropTable(true);
  
    })
    .catch(error => console.error(error));
  };


  const handleDelete = e =>{
    console.log(e)
    fetch(`http://localhost:3333/DeleteItem` , {
    method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({e})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));

    
     fetch(`http://localhost:3333/DeleteItem2` , {
    method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({e})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));

    
    window.location.reload();

  };






  return (
    <Box h= "100vh" w= "100vw" bg= "dark.4" Display = "flex" sx={
      {
        flexDirection : "column"
      }
    }>
      
      <Header/>
      <Container p={"xl"} sx={{flexGrow: "1"}} bg= "dark.8" size={"80%"} mt={"xl"}> 
          <Flex justify = "center" wrap = "wrap" gap={"50px"}>
          <Box w="80%" h="100px" bg="dark" px="lg" py="md">
          <Text color="white">Account : {username}</Text>
          <Text color="white">Amount item : {filteredDataByUsername.length}</Text>
          </Box>
          </Flex>
          <Container p="md" sx={{flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center"}} bg="dark.8" size="80%" mt="xl" justify="center">
  <div id="table-container" style={{ textAlign: 'center' }}>
    {showTable ?  (
      <StyledTable>
        <thead>
          <tr>
            <th>Class</th>
            <th>Location</th>
            <th>Ap</th>
            <th>Dp</th>
            <th>Time</th>
            <th>Total Money</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .filter(row => row.User === username)
            .slice(startIndex, startIndex + 10)
            .map(row => (
              <tr key={row.Id}>
                <td>{row.Class}</td>
                <td>{row.Location}</td>
                <td>{row.Ap}</td>
                <td>{row.Dp}</td>
                <td>{row.Time}</td>
                <td>{row.TotalMoney}</td>
                <td>{row.Itemdrop}</td>
                <td>
                  <button onClick={() => {handleButtonClick(row.Itemdrop) ; }}>View</button>
                </td>
                <td>
                  <button onClick={() => {handleDelete(row.Itemdrop) ; }}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
        </StyledTable>
      
    ) : (
      <p>No data to display.</p>
    )}
    <button onClick={handlePrevPage} disabled={startIndex < 10} >{"<"}</button>
    <button onClick={handleNextPage} disabled={startIndex + 10 >= filteredData.length}>{">"}</button>
  </div>
  
</Container>
{showItemdropTable && (
  <Flex justify="center" align="center" mt="md">
    <Box width="50%">
      <StyledTable>
        <thead>
          <tr>
            <th>ItemName</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Totalprice</th>
            <td>
              <button onClick={() => change(DataItemdrop)}>Change</button>
            </td>
          </tr>
        </thead>
        <tbody>
  {DataItemdrop.map(item => (
    <tr key={item.Id}>
      <td>{item.ItemName}</td>
      <td>
        <input
          type="number"
          value={item.QTY}
          onChange={event => {
            const newValue = event.target.value;
            setDataItemdrop(prevState => {
              return prevState.map(prevItem => {
                if (prevItem.Id === item.Id) {
                  return {
                    ...prevItem,
                    QTY: newValue,
                    Totalprice: newValue * prevItem.Price
                  };
                }
                return prevItem;
              });
            });
          }}
        />
      </td>
      <td>
        <input
          type="number"
          value={item.Price}
          onChange={event => {
            const newValue = event.target.value;
            setDataItemdrop(prevState => {
              return prevState.map(prevItem => {
                if (prevItem.Id === item.Id) {
                  return {
                    ...prevItem,
                    Price: newValue,
                    Totalprice: prevItem.QTY * newValue
                  };
                }
                return prevItem;
              });
            });
          }}
        />
      </td>
      <td>{item.Totalprice}</td>
    </tr>
  ))}
  <tr>
   
  </tr>
</tbody>
      </StyledTable>
    </Box>
  </Flex>
)}
      </Container>
    </Box>
  )
}
