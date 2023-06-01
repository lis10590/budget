"use client";
import { Nav, Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import styles from "../_styles/navbar.module.css";

const NavbarComp = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link className={`${styles.navbarLink} me-3`} href="/home">
                דף הבית
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={`${styles.navbarLink} me-3`} href="/buildBudget">
                הוספת תקציב חדש
              </Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item>
              <Link className={`${styles.navbarLink} me-3`} href="/">
                התחבר
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={`${styles.navbarLink} me-3`} href="/">
                הרשם
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={`${styles.navbarLink} me-3`} href="/">
                התנתק
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
