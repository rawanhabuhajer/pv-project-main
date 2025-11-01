import React, { useState } from "react";
import styles from "./styles/styles.module.scss";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import BlogCard from "./BlogCard";
import { FormattedMessage } from "react-intl";
import { Search, X } from "lucide-react";
import BlurCursor from "../BlurCursor";
import Header from "../header/Index";
import { useSelector } from "react-redux";

const Index = () => {
  const { blogs, categories, loading } = useSelector((state) => state?.blogs);

  const [searchValue, setSearchValue] = useState("");
 

  // Filter only active blogs
  // const activeBlogs = blogs?.filter((b) => b.isActive);

  // Sort by date (newest first)
  const sortedBlogs = blogs?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  console?.log(sortedBlogs , "sb")

  return (
    <div className={styles["blogs-wrapper"]}>
      <BlurCursor />
      <div className="header">
        <Header />
      </div>
      <div className="gl-breadcrumb">
        <Container>
          <h3>
            <FormattedMessage id="blogs.title" defaultMessage="Blogs" />
          </h3>
          <div className="gl-breadcrumb-desc">
            <FormattedMessage
              id="blogs.subtitle"
              defaultMessage="Discover expert tips and updates on electricity and solar energy to power your life sustainably. Explore insights on innovation, energy-saving, and renewable solutions."
            />
          </div>{" "}
          <Row>
            <Col lg={12}>
              <div className="search-wr">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="search for blog name"
                    className="form-control"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (searchValue.trim() === "") return;
                      else if (e.key === "Enter") {
                        e.preventDefault();
                        // handleClickSearch();
                      }
                    }}
                    value={searchValue}
                  />
                  {searchValue?.length > 0 && (
                    <button
                      className="delete-search"
                      onClick={() => {
                        setSearchValue("");
                        setSelectedFilter("");
                      }}
                    >
                      <X color="#fff" size={24} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // handleClickSearch();
                    }}
                    disabled={
                      searchValue?.length < 1 || searchValue.trim() === ""
                    }
                  >
                    <Search color="#ffffff" size={18} />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="blogs-tabs">
        <Container>
          <Row>
            {sortedBlogs?.map((blog) => (
              <Col key={blog.id} lg={4} md={6} sm={12} className="mb-4">
                <BlogCard blog={blog} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Index;
