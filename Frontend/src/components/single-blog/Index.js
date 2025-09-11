import React from "react";
import Hero from "./hero";
import Content from "./content";
import NewBlogs from "./newBlogs";
import BlogsCategories from "./blogsCategories";
import KeyWords from "./keyWords";
import styles from "./styles/style.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
const index = () => {
  const { singleBlog, blogs } = useSelector((state) => state.blogs);

  return (
    <>
      <div className={styles["blog-wrapper"]}>
        <Container>
          <Row>
            <Col lg={9} md={12} sm={12}>
              <div className="rigth-side">
                <Hero singleBlog={singleBlog} />
                <Content singleBlog={singleBlog} />
              </div>
            </Col>
            <Col lg={3} md={12} sm={12}>
              <div className="left-side">
                <NewBlogs blogs={blogs} />
                <BlogsCategories />
                <KeyWords singleBlog={singleBlog} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default index;
