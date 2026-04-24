import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [apiData, setapiData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT;
        const response = await axios.get(apiUrl);

        if (response?.data?.statusText === "Ok") {
          setapiData(response?.data?.blog_records);
        }

        setTimeout(() => {
          setLoading(false);
        } , 1000);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();

    return () => {};
  }, []);

  if (loading) {
    return (
      <>
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" size="lg"/>
        </Container>
      </>
    );
  }

  return (
    <Container>
      <Row>
        {apiData &&
          apiData.map((record, index) => (
            <Col xs="3" className="py-5 box" key={index}>
              <div className="title">
                <Link to={`/blog/${record.id}`}>{record.title}</Link>
              </div>
              <div>{record.post}</div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
