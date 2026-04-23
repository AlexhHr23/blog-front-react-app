import {Container, Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

function App() {

  const [apiData, setapiData] = useState(false)

  useEffect(() => {
    const  fetchData = async () =>  {

      try {
        const apiUrl = process.env.REACT_APP_API_ROOT;
        const response = await axios.get(apiUrl);

        if (response?.data?.statusText === "Ok") {
          setapiData(response?.data?.blog_records);
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
        <Col xs="12" className="py-2">
        <h1 className="text-center fw-bold">
          React application wuth go fiber backend
        </h1>
        </Col>

        {apiData && (
          apiData.map((record, index) => (
            <Col xs="4" className="py-5 box" key={index}>
              <div className="title">{record.title}</div>
              <div>{record.post}</div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default App;
