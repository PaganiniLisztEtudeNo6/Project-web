/* eslint-disable no-const-assign */
import { Box,  Container , Select , Flex , SimpleGrid , Text , Autocomplete , Button , Input} from '@mantine/core'
import React , { useState , useRef }from 'react'
import { Link } from 'react-router-dom';
import Header from './CompoMain/Header'
import { useEffect } from 'react';
import ItemIn from './CompoMain/ItemIn';
import ItemIn2 from './CompoMain/ItemIn2';

export default function Main() {

  const [username, setUsername] = useState(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [areaData, setAreaData] = useState();
  const [areas, setAreas] = useState([]);
  const token = localStorage.getItem('token')
  const [items, setItems] = useState(Array(7).fill({ name: '', detail1: '', detail2: '', detail3: '', detail4: '' }));
  const [selectedClass, setSelectedClass] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ap, setAp] = useState(null);
  const [dp, setDp] = useState(null);
  const [time, setTime] = useState(null);
  const [total , setTotal] = useState(null);
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100000000) + 1; // สุ่มเลขจำนวนเต็มตั้งแต่ 1-10000
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const handleCalculate = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      const qty = parseFloat(item.detail2);
      const price = parseFloat(item.detail3);
      if (!isNaN(qty) && !isNaN(price)) {
        totalPrice += qty * price;
      }
    });
    return totalPrice;
  };
  

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

    useEffect(() => {
      fetch('http://localhost:3333/locations')
        .then(response => response.json())
        .then(data => {
          setAreas(data);
          console.log(data)
        })
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
      async function getdata(){
        await fetch('http://localhost:3333/getItem',{
        method:"post",
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          data:areaData
        })
      }).then(res => res.json()).then(data =>{
        setSelectedArea(data[0])
      })
      } 
      
      getdata()
    }, [areaData]);
    

    useEffect(() => {
      fetch('http://localhost:3333/class')
        .then(response => response.json())
        .then(data => {
          setSelectedClass(data);
          console.log(selectedClass)
        })
        .catch(error => console.error(error));
    }, []);


    const handleClassSelect = e =>{
      console.log(classOptions)
      setClasses(e)
    }

    const [imageUrl, setImageUrl] = useState("https://storage.cloud.google.com/cscwebdev/logo.png");
    
    const handleAreaSelect = e => {
      setAreaData(e)
      const selectedArea = areas.find(area => area.Area === e);
      if (selectedArea) {
        const imageUrl = selectedArea.Pic;
        console.log(imageUrl);
        setImageUrl(imageUrl);
      }
    };


  const classOptions = selectedClass.map(cls => ({ label: cls.Name, value: cls.Name }));
  const areaOptions = areas.map(area => ({ label: area.Area, value: area.Area }))
  const tableRef = useRef(null);
  


  const handleSave = () => {
    // สร้างเลขสุ่มขึ้นมา 1 ตัว
    const randomNumber = generateRandomNumber();
    const calculatedTotal = handleCalculate();

      console.log("Class:", classes);
      console.log("Location:", areaData);
      console.log("User:", username);
      console.log("AP:", ap);
      console.log("DP:", dp);
      console.log("Time:", time);
      console.log("Total:", calculatedTotal);
      console.log("randomNumber:", randomNumber);
  
    const table = tableRef.current;
    const data = [];
      
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const rowData = {};
      rowData.User = username
      rowData.Area = areaData
      rowData.ItemName = row.cells[0].querySelector("input").value;
      rowData.QTY = row.cells[1].querySelector("input").value;
      rowData.Price = row.cells[2].querySelector("input").value;
      rowData.hisId = randomNumber;
      rowData.totalPrice = row.cells[3].querySelector("input").value;
  
      data.push(rowData);
      
      try {
        const response = fetch('http://localhost:3333/Itemdrop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            User: username,
            Area: areaData,
            ItemName: row.cells[0].querySelector("input").value,
            QTY: row.cells[1].querySelector("input").value,
            Price: row.cells[2].querySelector("input").value,
            hisid:  randomNumber,
            Totalprice: row.cells[3].querySelector("input").value,
          }),
        });
        const data =  response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetch('http://localhost:3333/his', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Class: classes,
        Location: areaData,
        User: username,
        Ap: ap,
        Dp: dp,
        Time: time,
        TotalMoney: calculatedTotal,
        Itemdrop: randomNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // ทำอย่างอื่น
      })
      .catch((error) => console.error(error));

setItems(Array(7).fill({ name: '', detail1: '', detail2: '', detail3: '', detail4: '' }));
  };

  return (
    <Box h= "130vh" w= "100vw" bg= "dark.4" Display = "flex" sx={
      {
        flexDirection : "column"
      }
    }>
      
      <Header/>
      <Container p={"xl"} sx={{flexGrow: "1"}} bg= "dark.8" size={"80%"} mt={"xl"}> 
          <Flex justify = "center" wrap = "wrap" gap={"80px"}>
            <Box h={"280px"} w={"280px"} bg="dark.2">
            <img src={imageUrl} alt="" style={{ width: '280px', height: '280px', objectFit: 'cover' }}/>
            </Box>
            <Flex direction={'column'}>
              <Box display={"flex"} sx={{gap:"80px"}}>

                  <Select 
                      w="300px" 
                      fc={"blue.3"} 
                      labelProps={{c:"White"}}
                      label="Select your class"
                      placeholder="Pick one"
                      data={classOptions}
                      onChange={(e) => handleClassSelect(e)}
                    
                  />
                  <Select 
                      w="300px"
                      fc="blue.3"
                      labelProps={{ c: "White" }}
                      label="Location"
                      placeholder="Pick one"
                      data={areaOptions}
                      onChange={(e) => handleAreaSelect(e) }
                    />
                  </Box>
                
                <SimpleGrid bg={""}  w={"100%"} cols={3} spacing={'40px'} mt={"xl"}>

                  <Box c = "White" > Time 
                    <Input sx={{ borderRadius: "15px" }} c = "dark" bg={"white"} id="input-1" mx="auto" radius="md"size="xs" placeholder="Per Hour" value={time} onChange={(e) => setTime(e.target.value)}/>
                  </Box>

                  <Box c = "White" > User 
                    <Text sx={{ borderRadius: "5px" }} c = "dark" bg={"white"} id="input-1" mx="auto" radius="Md"size="2xL">
                       {username}
                    </Text>
                  </Box>

                </SimpleGrid>

                <SimpleGrid bg={""}  w={"100%"} cols={3} spacing={'40px'} mt={"xl"}>

                  <Box c = "White" > Ap 
                    <Input sx={{ borderRadius: "15px" }} c = "dark" bg={"white"} id="input-1" mx="auto" radius="md"size="xs" placeholder="Your Ap" value={ap} onChange={(e) => setAp(e.target.value)}/>
                  </Box>

                  <Box c = "White" > Dp 
                    <Input sx={{ borderRadius: "15px" }} c = "dark" bg={"white"} id="input-1" mx="auto" radius="md"size="xs" placeholder="Your Dp" value={dp} onChange={(e) => setDp(e.target.value)}/>
                  </Box>

                  <Box c = "White" > Total 
                  <Text
                        sx={{ borderRadius: "5px" }}
                        c="dark"
                        bg={"white"}
                        id="input-1"
                        mx="auto"
                        radius="Md"
                        size="2xL"
                        placeholder="Total"
                        onChange={(e) => setTotal(e.target.value)}
                      >
                        {handleCalculate()}
                      </Text>
                    </Box>

                </SimpleGrid>

              </Flex>
          </Flex>
          
      </Container>
      <Box >
        <Container p={'xl'} sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }} bg="dark.8" size={'80%'} mt={'20px'}>
              <table className="custom-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">QTY</th>
                    <th className="table-header">Price</th>
                    <th className="table-header">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} >
                      <td>
                        <input type="text" value={selectedArea?selectedArea[index+1]:null} onChange={(e) => handleInputChange(e, index, 'name')} />
                      </td>
                      <td>
                        <input type="text" value={item.detail2} onChange={(e) => handleInputChange(e, index, 'detail2')} />
                      </td>
                      <td>
                        <input type="text" value={item.detail3} onChange={(e) => handleInputChange(e, index, 'detail3')} />
                      </td>
                      <td>
                        <input type="text" value={item.detail2 * item.detail3} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Box sx={{ alignSelf: 'flex-end', marginTop: '20px'}}>
              </Box>
              <Box sx={{ alignSelf: 'flex-end', marginTop: '20px'}}>
                <Button radius="" size="xl" mx="10px"  mb="10px" onClick={handleSave}>
                  Save
                </Button>

              </Box>
      
            <style jsx>{`
            .custom-table {
              border-collapse: collapse;
              width: 100%;
              margin-top: 24px;
              margin-bottom: 24px;
            }

            .custom-table td,
            .custom-table th {
              padding: 8px;
              text-align: center;
            }

            .table-header {
              background-color: #333;
              color: white;
              text-align: center;
            }

            .custom-table input {
              border: none;
              background-color: #646464;
              padding: 8px;
              width: 100%;
            }
          `}</style>
          </Container>
         
      </Box>
          
    </Box>
    
  )
}
