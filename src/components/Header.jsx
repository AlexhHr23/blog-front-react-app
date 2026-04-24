import React from "react";
import { Container, Nav} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-primary bg-gradient py-4">
      <Container className="mx-auto container">
        <div className="flex justify-between items-center">
            <h1 className="text-center fw-bold text-white">
              React application wuth go fiber backend
            </h1>

            <Nav className="gap-3">
                <NavLink className="text-white fw-bold" to="/">Home</NavLink>
                <NavLink className="text-white fw-bold" to="/blog">Blog</NavLink>
            </Nav>
        </div>
      </Container>
    </header>
  );
};
