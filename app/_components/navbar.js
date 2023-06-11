"use client";
import { Nav, Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import styles from "../_styles/navbar.module.css";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NavbarComp = () => {
  const router = useRouter();
  const { data } = useSession();

  const onLogout = async () => {
    await signOut({ callbackUrl: "/" });

    router.push("/");
  };
  return (
    <Navbar expand="lg" className={styles.navbarDiv}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {data?.user && (
            <Nav className="me-auto">
              <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/home">
                  דף הבית
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  className={`${styles.navbarLink} me-3`}
                  href="/buildBudget"
                >
                  הוספת תקציב חדש
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  className={`${styles.navbarLink} me-3`}
                  href="/categories"
                >
                  קטגוריות
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/settings">
                  הגדרות
                </Link>
              </Nav.Item>
            </Nav>
          )}

          <Nav className="ms-auto">
            {!data?.user ? (
              <>
                <Nav.Item>
                  <Link className={`${styles.navbarLink} me-3`} href="/">
                    התחבר
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    className={`${styles.navbarLink} me-3`}
                    href="/register"
                  >
                    הרשם
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Link
                  className={`${styles.navbarLink} me-3`}
                  href="/"
                  onClick={onLogout}
                >
                  התנתק
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
