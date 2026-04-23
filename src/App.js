import {Container, Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [apiData, setapiData] = useState(false)

  useEffect(() => {
    const  fetchData = async () =>  {

      try {
        const apiUrl = "http://localhost:8080";
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          setapiData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  
    return () => {

    }
  }, [])
  
  console.log(apiData)

  return (
    <Container>
      <Row>
        <Col xs="12 py-2">
        <h1 className="text-center fw-bold">
          React application wuth go fiber backend
        </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
