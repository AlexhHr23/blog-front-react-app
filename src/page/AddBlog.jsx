import React from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddBlog = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      data.file = data.image[0]
      data.image = null

      const apiUrl = process.env.REACT_APP_API_ROOT;
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
        <h1>Add new blog</h1>
        <Form onSubmit={handleSubmit(saveForm)}>
          <Col xs="4" className="py-3">
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                className={errors.title ? "error" : ""}
                type="text"
                defaultValue=""
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
                defaultValue=""
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
                <p className="text-danger">{errors.post.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col xs="4" className="py-3">
            <Form.Group className="mb-3" controlId="FormContent">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className={errors.image ? "error" : ""}
                type="file"
                defaultValue=""
                placeholder="Enter post content"
                {...register("image", {
                  required: { value: true, message: "Content is required" },
                })}
              />
              {errors.image && (
                <p className="text-danger">{errors.image.message}</p>
              )}
            </Form.Group>
          </Col>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Form>
      </Container>
    </>
  );
};
