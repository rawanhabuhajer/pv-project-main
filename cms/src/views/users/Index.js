import ControlArea from "components/Layout/ControlArea";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import subscribersIcon from "assets/svgs/subscribers.svg";
import { useDispatch, useSelector } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { getUsers } from "store/actions";

import { Col, Row } from "react-bootstrap";
import CreateAccountModal from "./CreateAccountModal";
const Index = () => {
  const dispatch = useDispatch();
  const { users, metadata } = useSelector((state) => state.authentication);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [SearchValue, setSearchValue] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [logedInDate, setLogedInDate] = useState();
  const [isFreeTrial, setIsFreeTrial] = useState();
  const [IsVerified, setIsVerified] = useState();
  const [IsActive, setIsActive] = useState();
  const [isExternalUser, setIsExternalUser] = useState();
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  useEffect(() => {
    dispatch(
      getUsers({
        pageNumber: page,
        pageSize,
        SearchValue,
        CompanyName,
        IsDesJoiningDate: selectedDate,
        IsVerified: IsVerified,
      })
    );
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <>
      <div className="users-wrap">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <ControlArea cardTxt="المستخدمين" icon={subscribersIcon} />
          </Col>
        </Row>
        <Table
          users={users}
          page={page}
          pageSize={pageSize}
          SearchValue={SearchValue}
          setSearchValue={setSearchValue}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          logedInDate={logedInDate}
          setLogedInDate={setLogedInDate}
          isFreeTrial={isFreeTrial}
          setIsFreeTrial={setIsFreeTrial}
          setIsExternalUser={setIsExternalUser}
          isExternalUser={isExternalUser}
          setIsVerified={setIsVerified}
          IsVerified={IsVerified}
          setIsActive={setIsActive}
          IsActive={IsActive}
          setCompanyName={setCompanyName}
          CompanyName={CompanyName}
          setPage={setPage}
        />
        <div className="table--pagination">
          <PaginationControl
            page={page}
            between={3}
            total={metadata?.count}
            limit={metadata?.pageSize}
            changePage={handlePageChange}
            ellipsis={2}
          />
          <select
            className="form-control form-select"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <CreateAccountModal
        showCreateAccountModal={showCreateAccountModal}
        setShowCreateAccountModal={setShowCreateAccountModal}
      />
    </>
  );
};

export default Index;
