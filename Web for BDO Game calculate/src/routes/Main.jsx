import { Box,  Container, Flex, Select , SimpleGrid , Text , Button} from '@mantine/core'
import React , { useState , useRef }from 'react'
import { Link } from 'react-router-dom';
import Header from './CompoMain/Header'
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
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

  .styled-table td {
    background-color: #FFFFFF;

`;




  const [areaData, setAreaData] = useState();
  const [areas, setAreas] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [classes, setClasses] = useState([]);


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

    const handleClassSelect = e =>{
      console.log(classOptions)
      SetClasses(e)
      


    }

    const [imageUrl, setImageUrl] = useState("https://storage.cloud.google.com/cscwebdev/logo.png");

    
    const handleAreaSelect = e => {
      setAreaData(e)
      SetLocation(e)
      const selectedArea = areas.find(area => area.Area === e);
      if (selectedArea) {
        const imageUrl = selectedArea.Pic;
        console.log(imageUrl);
        setImageUrl(imageUrl);
      }
      console.log(selectedClass);
      setClasses(selectedClass.value);
    };


  const classOptions = selectedClass.map(cls => ({ label: cls.Name, value: cls.Name }));
  const areaOptions = areas.map(area => ({ label: area.Area, value: area.Area }))
  const [Classes, SetClasses] = useState(null);
  const [Location, SetLocation] = useState(null);
  
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [startIndex, setStartIndex] = useState(0);


  const [filteredData, setFilteredData] = useState([]);
  const [showItemdropTable, setShowItemdropTable] = useState(false);

const Show = () => {
  fetch('http://localhost:3333/gethis')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const filtered = data.filter(row => row.Class === Classes && row.Location === areaData);
      setFilteredData(filtered);
      setShowTable(true);
      setStartIndex(0);
      
    })
    .catch(error => console.error(error));

};

const [DataItemdrop, setDataItemdrop] = useState([]);

const handleButtonClick = hisid => {
  console.log(hisid);
  
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

const handleNextPage = () => {
  fetch(`http://localhost:3333/gethis?start=${startIndex + 5}&end=${startIndex + 10}`)
    .then(response => response.json())
    .then(data => {
      setData(data);
      setStartIndex(startIndex + 5);
    })
    .catch(error => console.error(error));
};

const handlePrevPage = () => {
  if (startIndex >= 5) {
    setStartIndex(startIndex - 5);
  }
};


return (
  <Box h="130vh" w="100vw" bg="dark.4" Display="flex" sx={{flexDirection: "column"}}>
    
    <Header />
    <Container p="xl" sx={{flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center"}} bg="dark.8" size="80%" mt="xl">
    <Flex justify="center" wrap="wrap" gap="80px">
            <Box h="280px" w="280px" bg="dark.2">
              <img src={imageUrl} alt="My Image" style={{width: '280px', height: '280px', objectFit: 'cover'}}/>
            </Box>
            <Flex direction="column">
              <Box display="flex" sx={{gap: "80px"}}>
                <Select
                  w="300px"
                  fc={"blue.3"}
                  labelProps={{c: "White"}}
                  label="Select your class"
                  placeholder="Pick one"
                  data={classOptions}
                  onChange={(e) => handleClassSelect(e)}
                  
                />
                <Select
                  w="300px"
                  fc="blue.3"
                  labelProps={{c: "White"}}
                  label="Location"
                  placeholder="Pick one"
                  data={areaOptions}
                  onChange={(e) => handleAreaSelect(e)}
                />
              </Box>
              <SimpleGrid bg={""} cols={3} spacing={'85px'} mt={"xl"}>
                <Box sx={{alignSelf: 'flex-end', marginTop: '20px'}}>
                  <Button radius="" size="xl" mx="10px" mb="10px" onClick={Show}>
                    Search
                  </Button>
                </Box>
              </SimpleGrid>
            </Flex>
          </Flex>
        </Container>
   
      {showTable ? (
        <Container p="xl" sx={{flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center"}} bg="dark.8" size="80%" mt="xl" justify="center">
        <div id="table-container" style={{ textAlign: 'center' }}>
        <table className="styled-table">
        <StyledTable>
        <div id="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Location</th>
                <th>User</th>
                <th>Ap</th>
                <th>Dp</th>
                <th>Time</th>
                <th>Total Money</th>
                <th>ID</th>
              </tr>
            </thead>
            
            <tbody>
          {filteredData.slice(startIndex, startIndex + 5).map((row, index) => {
            
            if (Classes !== null && areaData !== null && row.Class === Classes && row.Location === areaData) {
              return (
                <tr key={index}>
                  <td>{row.Class}</td>
                  <td>{row.Location}</td>
                  <td>{row.User}</td>
                  <td>{row.Ap}</td>
                  <td>{row.Dp}</td>
                  <td>{row.Time}</td>
                  <td>{row.TotalMoney}</td>
                  <td>{row.Itemdrop}</td>
                  <td>
                    <button onClick={() => handleButtonClick(row.Itemdrop)}>View</button>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
            </tbody>
          </table>
        </div>
        </StyledTable>
        </table>
        <Container>
          {/* โค้ดของตาราง */}
          <button onClick={handlePrevPage} disabled={startIndex < 5} >{"<"}</button>
          <button onClick={handleNextPage} disabled={startIndex + 5 >= filteredData.length}>{">"}</button>
        </Container>
      </div>    
      </Container>

      
      ) : (
        <>
        </>
      )}
   
{showItemdropTable && (
  <Container p="xl" sx={{flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center"}} bg="dark.8" size="80%" mt="xl" justify="center">
    <div id="table-container" style={{ textAlign: 'center' }}>
      <table className="styled-table">
        <StyledTable>
          <div id="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ItemName</th>
                  <th>QTY</th>
                  <th>Price</th>
                  <th>Totalprice</th>
                </tr>
              </thead>
              <tbody>
                {DataItemdrop.map(item => (
                  <tr key={item.Id}>
                    <td>{item.ItemName}</td>
                    <td>{item.QTY}</td>
                    <td>{item.Price}</td>
                    <td>{item.Totalprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyledTable>
      </table>
    </div>
  </Container>
)}
      {console.log("areaData:", areaData)}
      {console.log("Classes:", Classes)}
  </Box>
)}
