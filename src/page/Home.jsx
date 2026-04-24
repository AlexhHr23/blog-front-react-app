import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
        }, 1000);
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
          <Spinner animation="border" variant="primary" size="lg" />
        </Container>
      </>
    );
  }

  return (
    <Container>
      <Row>
        <h3>
          <Link to="/add" className="btn btn-primary">
            Add new
          </Link>
        </h3>
        {apiData &&
          apiData.map((record, index) => (
            <Col xs="3" className="py-5 box" key={index}>
              <div className="title">
                <Link to={`/blog/${record.id}`}>{record.title}</Link>
              </div>
              <div className="title">
                <Link to={`/edit/${record.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <Link to="" className="text-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
              </div>
              <div>{record.post}</div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
