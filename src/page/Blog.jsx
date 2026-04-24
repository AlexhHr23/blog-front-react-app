import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export const Blog = () => {
    const params  = useParams();
  const [apiData, setapiData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + '/' + params.id;
        const response = await axios.get(apiUrl);

        if (response?.data?.statusText === "Ok") {
          setapiData(response?.data?.record);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  console.log(apiData);
  return (
    <Container>
        <Row>
            <Col xs="12"><h1>{apiData.title}</h1></Col>
            <Col xs="12"><p>{apiData.post}</p></Col>
        </Row>
  </Container>
  );
};
