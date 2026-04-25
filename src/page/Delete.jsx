import React from 'react'
import { Button, Col, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const Delete = () => {

  const params = useParams()
  const navigate = useNavigate()

  const handleDelete = async() => {
    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + '/' + params.id;
      const response = await axios.delete(apiUrl);

      if (response?.data?.statusText === "Ok") {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container>
        <h1>Are you sure to delete this record?</h1>
        <Col xs="12" className='py-5'>
          <Button className="btn btn-danger py-2" onClick={handleDelete}>
            Proceed
          </Button>
        </Col>
      </Container>
    </>
  )
}
