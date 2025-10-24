import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Close from "../../assets/images/close.svg";
import { editCompanyInfo } from "@/store/actions";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";

const CompanyInfo = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { handleSubmit } = useForm();

  const { user } = useSelector((state) => state.authentication);
  const { activities, areas } = useSelector((state) => state.settings);

  const [companyName, setCompanyName] = useState("");
  const [employeesCount, setEmployeesCount] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [searchActivities, setSearchActivities] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [competitionsCount, setCompetitionsCount] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [etimadCompany, setEtimadCompany] = useState("");

  useEffect(() => {
    setCompanyName(user?.company?.companyName);

    setEtimadCompany(user?.etimadCompany);

    setEmployeesCount({
      value: user?.company?.employees,
      label: user?.company?.employees,
    });

    setSelectedActivities(user?.company?.companyActivity);

    setSelectedRegions(
      user?.company?.companyArea?.map((area) => ({
        value: area.id,
        label: area.name,
      }))
    );

    setCompetitionsCount({
      value: user?.company?.maximumTendersParticipation,
      label: user?.company?.maximumTendersParticipation,
    });

    setPriceRange({
      value: user?.company?.priceRange,
      label: user?.company?.priceRange,
    });

    setSelectedKeywords(user?.company?.companyKeywords);
  }, [user]);

  useEffect(() => {
    setFilteredActivities(activities);
  }, [activities]);

  const submitEditCompanyInfo = (data) => {
    data.name = companyName;
    data.numberOfEmployees = employeesCount?.value;
    data.areas = selectedRegions?.map((region) => {
      return {
        id: region.value,
      };
    });
    data.activities = selectedActivities?.map((activity) => {
      return {
        id: activity.id,
      };
    });
    data.maximumTendersParticipation = competitionsCount?.value;
    data.priceRange = priceRange?.value;
    data.keywords = selectedKeywords?.map((keyword) => keyword.value);

    dispatch(
      editCompanyInfo({
        data,
        toast,
        formatMessage,
        dispatch,
      })
    );
  };

  return (
    <div className="basic-info">
      <div className="setting-title">
        <h3>
          <FormattedMessage id="companyInformation" />
        </h3>
      </div>
      <form onSubmit={handleSubmit(submitEditCompanyInfo)}>
        <div className="form-group flex">
          <label className="form-label">
            {" "}
            <FormattedMessage id="companyName" />
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={formatMessage({ id: "companyName" })}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
          />
        </div>
        <div className="form-group flex">
          <label className="form-label">
            {" "}
            <FormattedMessage id="assignedCompany" />
          </label>

          <input
            type="text"
            className="form-control"
            placeholder={formatMessage({ id: "assignedCompany" })}
            disabled
            value={etimadCompany?.name}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            {" "}
            <FormattedMessage id="employeesNumber" />
          </label>
          <Select
            isRtl={true}
            options={[
              {
                value: 25,
                label: "0-25",
              },
              {
                value: 50,
                label: "26-50",
              },
              {
                value: 100,
                label: "50-100",
              },
              {
                value: 200,
                label: "100-200",
              },
            ]}
            placeholder={formatMessage({ id: "SelectNumberEmployees" })}
            className="form-control select-form"
            classNamePrefix="select"
            onChange={(selected) => {
              setEmployeesCount(selected);
            }}
            value={employeesCount}
          />
        </div>

        <div className="form-group">
          <div className="form-wrapper-block">
            <h4 className="form-title">
              <FormattedMessage id="targetedActivities" />
            </h4>
            <div className="search-activities">
              <input
                type="text"
                className="form-control"
                placeholder={formatMessage({ id: "search" })}
                value={searchActivities}
                onChange={(e) => {
                  setSearchActivities(e.target.value);
                  setFilteredActivities(
                    activities?.filter((activity) =>
                      activity?.name?.includes(e.target.value)
                    )
                  );
                }}
              />
            </div>

            {filteredActivities?.length > 0 ? (
              <div className="selected-regions">
                {filteredActivities?.map((activity, index) => (
                  // <label
                  //   key={index}
                  //   className={
                  //     selectedActivities
                  //       ?.map((selectedActivity) => selectedActivity.id)
                  //       .includes(activity.id)
                  //       ? "selected-region"
                  //       : ""
                  //   }
                  //   title={activity?.name}
                  //   onClick={() => {
                  //     //toggle selected activity from the list
                  //     if (selectedActivities.includes(activity)) {
                  //       setSelectedActivities(
                  //         selectedActivities.filter(
                  //           (selectedActivity) => selectedActivity !== activity
                  //         )
                  //       );
                  //     } else {
                  //       setSelectedActivities([
                  //         ...selectedActivities,
                  //         activity,
                  //       ]);
                  //     }
                  //   }}
                  // >
                  //   {activity?.name}
                  // </label>
                  <label
                    key={index}
                    className={`${
                      selectedActivities
                        ?.map((selectedActivity) => selectedActivity.id)
                        .includes(activity.id)
                        ? "selected-region"
                        : ""
                    }`}
                    title={activity?.name}
                    onClick={() => {
                      // compare between selectedActivities and activity.id and if it exists remove it, else add it
                      if (
                        selectedActivities
                          ?.map((selectedActivity) => selectedActivity.id)
                          .includes(activity.id)
                      ) {
                        setSelectedActivities(
                          selectedActivities.filter(
                            (selectedActivity) =>
                              selectedActivity.id !== activity.id
                          )
                        );
                      } else {
                        setSelectedActivities([
                          ...selectedActivities,
                          activity,
                        ]);
                      }
                    }}
                  >
                    {activity?.name}
                  </label>
                )) || []}
              </div>
            ) : (
              <div className="alert alert-warning text-center">
                <h5>لا يوجد انشطة</h5>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="form-wrapper-block">
            <h4 className="form-title">
              {" "}
              <FormattedMessage id="keywords" />
            </h4>
            <div>
              <CreatableSelect
                isRtl={true}
                isSearchable={true}
                className="form-control select-form keywords-select"
                classNamePrefix="select"
                isMulti={true}
                options={
                  selectedKeywords?.map((keyword) => ({
                    value: keyword?.value,
                    label: keyword?.value,
                  })) || []
                }
                onChange={(selected) => {
                  setSelectedKeywords(selected.map((selected) => selected));
                }}
                value={selectedKeywords}
                placeholder={formatMessage({ id: "keywordSearch" })}
                isClearable={false}
              />
            </div>
            {selectedKeywords?.length > 0 && (
              <div className="form-group">
                <div className="selected-regions">
                  {selectedKeywords?.map((keyword, index) => (
                    <label key={index}>
                      {keyword?.label}
                      <button
                        onClick={() => {
                          setSelectedKeywords(
                            selectedKeywords.filter(
                              (item) => item !== keyword?.value
                            )
                          );
                        }}
                        type="button"
                      >
                        <Close />
                      </button>
                    </label>
                  )) || []}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="form-wrapper-block">
            <div className="form-group">
              <label className="form-label">
                {" "}
                <FormattedMessage id="locations" />
              </label>
              <Select
                isRtl={true}
                isSearchable={false}
                className="form-control select-form"
                classNamePrefix="select"
                isMulti={true}
                options={[
                  {
                    value: null,
                    label: <FormattedMessage id="allRegions" />,
                  },
                  ...(areas?.map((area) => ({
                    value: area.id,
                    label: area.name,
                  })) || []),
                ]}
                onChange={(selected) => {
                  if (selected?.map((item) => item.value).includes(null)) {
                    setSelectedRegions(
                      areas?.map((area) => ({
                        value: area.id,
                        label: area.name,
                      }))
                    );
                  } else {
                    setSelectedRegions(selected);
                  }
                }}
                value={selectedRegions}
                placeholder={formatMessage({ id: "selectRegions" })}
              />
            </div>
            {selectedRegions?.length > 0 && (
              <div className="selected-regions">
                {selectedRegions.map((region, index) => (
                  <label key={index}>
                    {region.label}
                    <button
                      onClick={() => {
                        setSelectedRegions(
                          selectedRegions.filter(
                            (item) => item.value !== region.value
                          )
                        );
                      }}
                      type="button"
                    >
                      <Close />
                    </button>
                  </label>
                )) || []}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <FormattedMessage id="maximumCompetitions" />
          </label>
          <Select
            isRtl={true}
            options={[
              {
                value: 4,
                label: "0-4",
              },
              {
                value: 10,
                label: "5-10",
              },
              {
                value: 100,
                label: "> 10",
              },
            ]}
            placeholder="اختر الحد الأقصى لعدد المpxv360ات"
            className="form-control select-form"
            classNamePrefix="select"
            onChange={(selected) => {
              setCompetitionsCount(selected);
            }}
            value={competitionsCount}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <FormattedMessage id="pricerangeDocuments" />
          </label>
          <Select
            isRtl={true}
            options={[
              {
                value: 1000,
                label: `${formatMessage({ id: "under" })} 1000 `,
              },
              {
                value: 2000,
                label: `${formatMessage({ id: "under" })} 2000 `,
              },
              {
                value: 4000,
                label: `${formatMessage({ id: "under" })} 4000 `,
              },
              {
                value: 10000,
                label: `${formatMessage({ id: "under" })} 10000 `,
              },
            ]}
            placeholder={formatMessage({ id: "selesctPricerangeDocuments" })}
            className="form-control select-form"
            classNamePrefix="select"
            onChange={(selected) => {
              setPriceRange(selected);
            }}
            value={priceRange}
          />
        </div>
        <div className="form-group has-btn">
          <button type="submit" className="btn">
            <FormattedMessage id="save" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInfo;
