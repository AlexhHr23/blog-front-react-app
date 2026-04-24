import React from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditBlog = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const [apiData, setapiData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
        const response = await axios.get(apiUrl);

        if (response?.data?.statusText === "Ok") {
          setapiData(response?.data?.record);
        }

        console.log(apiData);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();

    return () => {};
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
      const response = await axios.put(apiUrl, data);

      if (response?.data?.statusText === "Ok") {
        navigate("/");
        //   setapiData(response?.data?.blog_records);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Edit blog</h1>
        {apiData && (
          <Form onSubmit={handleSubmit(saveForm)}>
            <Col xs="4" className="py-3">
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  className={errors.title ? "error" : ""}
                  type="text"
                  defaultValue={apiData.title}
                  placeholder="Enter post title"
                  {...register("title", {
                    required: { value: true, message: "Title is required" },
                    min: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                />
                {errors.title && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
              </Form.Group>
            </Col>

            <Col xs="4" className="py-3">
              <Form.Group className="mb-3" controlId="FormContent">
                <Form.Label>Post content</Form.Label>
                <Form.Control
                  className={errors.post ? "error" : ""}
                  type="text"
                  defaultValue={apiData.post}
                  placeholder="Enter post content"
                  {...register("post", {
                    required: { value: true, message: "Content is required" },
                    min: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                />
                {errors.post && (
                  <p className="text-danger">{errors.content.message}</p>
                )}
              </Form.Group>
            </Col>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};
