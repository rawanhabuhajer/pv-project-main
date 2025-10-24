import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Col } from "react-bootstrap";

import Filter from "components/shared/Filter";
import Loader from "components/shared/Loader";

import { getFullDate } from "helpers/functions";
import { useIntl } from "react-intl";
import successCheckIcon from "assets/images/mark.png";
import failCheckIcon from "assets/images/delete.png";

const Table = ({ healthStatus }) => {
  const { locale } = useIntl();

  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const [filterText, setFilterText] = useState("");

  const filteredItems = healthStatus?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };

    return (
      <Filter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const checkDateStatus = (dateTimeStamp) => {
    const currentDate = new Date();
    const givenDate = new Date(dateTimeStamp);
    const differenceInDays = (currentDate - givenDate) / (1000 * 3600 * 24);
    return differenceInDays >= 2;
  };

  const columns = [
    {
      name: "اسم الجدول",
      selector: (row) => row?.tableName,
      sortable: true,
    },
    {
      name: "التاريخ",
      selector: (row) => getFullDate(row?.dateTimeStamp, locale),
      sortable: true,
    },
    {
      name: "عدد الصفوف",
      selector: (row) => row?.rowCount,
      sortable: true,
    },
    {
      cell: (row) =>
        checkDateStatus(row?.dateTimeStamp) ? (
          <img src={failCheckIcon} alt="fail" />
        ) : (
          <img src={successCheckIcon} alt="success" />
        ),
      width: "56px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <div className="table-wrap">
        <div className="card">
          <Col xl={6} md={12} xs={12}>
            <div className="card-head">
              <div>
                <h4>سجل فحص الموقع</h4>
                <p>يعرض هذا الجدول جميع وظائف النظام</p>
              </div>
            </div>
          </Col>
          <div className="card-body">
            <DataTable
              columns={columns}
              data={filteredItems}
              progressPending={pending}
              progressComponent={<Loader />}
              defaultSortField="name"
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
