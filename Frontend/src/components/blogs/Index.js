import React from "react";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { getSectionData } from "@/helpers/functions";
import BlogCard from "./BlogCard";
import Loading from "../Shared/Loading";
import { FormattedMessage } from "react-intl";

const Index = () => {
  // const { blogs, categories, loading } = useSelector((state) => state?.blogs);
  // const { allCmsHome } = useSelector((state) => state?.cms);
  // const blogHeaderData = getSectionData(allCmsHome, "blogs");

  // const order = ["المنافسات", "دليلك", "المزايدات"];

  // const sortedCategories = categories.sort((a, b) => {
  //   const indexA = order.indexOf(a.name.trim());
  //   const indexB = order.indexOf(b.name.trim());
  //   return indexA - indexB;
  // });

  const sortedCategories = [{ name: "ff" }, { name: "ss" }];

  const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Health" },
    { id: 3, name: "Lifestyle" },
  ];

  const blogs = [
    {
      id: 101,
      title: "The Rise of AI in Everyday Life",
      content:
        "Explore how artificial intelligence is transforming daily life, from smart assistants to advanced automation.",
      date: "2025-01-08",
      isActive: true,
      author: "John Doe",
      cmsCategory: { id: 1, name: "Technology" },
    },
    {
      id: 102,
      title: "Top 10 Gadgets of 2025",
      content:
        "Discover the must-have tech gadgets of 2025 that are revolutionizing the way we work and play.",
      date: "2025-01-06",
      isActive: true,
      author: "Jane Smith",
      cmsCategory: { id: 1, name: "Technology" },
    },
    {
      id: 103,
      title: "Understanding Mental Health in 2025",
      content:
        "An insightful look at the importance of mental health and how to prioritize it in the modern world.",
      date: "2025-01-07",
      isActive: true,
      author: "Dr. Emily Brown",
      cmsCategory: { id: 2, name: "Health" },
    },
    {
      id: 104,
      title: "10 Healthy Habits for a Better Life",
      content:
        "Learn about simple, effective habits that can improve your physical and mental well-being.",
      date: "2025-01-05",
      isActive: false, // Inactive blog
      author: "Sarah Johnson",
      cmsCategory: { id: 2, name: "Health" },
    },
    {
      id: 105,
      title: "2025 Trends in Interior Design",
      content:
        "Stay ahead of the curve with the latest trends in interior design that are reshaping modern homes.",
      date: "2025-01-09",
      isActive: true,
      author: "Michael Davis",
      cmsCategory: { id: 3, name: "Lifestyle" },
    },
    {
      id: 106,
      title: "The Minimalist Lifestyle: Pros and Cons",
      content:
        "A balanced look at the benefits and challenges of adopting a minimalist lifestyle in 2025.",
      date: "2025-01-04",
      isActive: true,
      author: "Laura Wilson",
      cmsCategory: { id: 3, name: "Lifestyle" },
    },
  ];

  const renderCategories = categories?.map((category, index) => {
    return (
      <Nav.Item key={index}>
        <Nav.Link eventKey={index} className="tab">
          {category?.name}
        </Nav.Link>
      </Nav.Item>
    );
  });

  // render blogs by category
  const renderBlogs = categories?.map((category, index) => {
    const categoryBlogs = blogs
      ?.filter((blog) => blog?.cmsCategory?.id === category?.id)
      ?.sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
      <Tab.Pane eventKey={index} key={index}>
        <Row>
          {categoryBlogs?.length > 0 ? (
            categoryBlogs?.map((blog, index) => {
              if (blog?.isActive === false) return null;
              return (
                <Col key={index} lg={4} md={6} sm={12}>
                  <BlogCard blog={blog} />
                </Col>
              );
            })
          ) : (
            <div className="no-blogs alert alert-warning text-center">
              <FormattedMessage id="noBlogs" />
            </div>
          )}
        </Row>
      </Tab.Pane>
    );
  });

  // if (loading) return <Loading loading={loading} />;

  return (
    <>
      <div className={styles["blogs-wrapper"]}>
        <div className="gl-breadcrumb">
          <Container>
            <h3>Blogs</h3>
            <div className="gl-breadcrumb-desc">
              Discover expert tips and updates on electricity and solar energy
              to power your life sustainably. Explore insights on innovation,
              energy-saving, and renewable solutions.
            </div>
          </Container>
        </div>
        <div className="blogs-tabs">
          <Container>
            <Tab.Container
              defaultActiveKey={0}
              transition={true}
              timeout={1000}
            >
              <Nav>{renderCategories}</Nav>
              <Tab.Content>{renderBlogs}</Tab.Content>
            </Tab.Container>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Index;
