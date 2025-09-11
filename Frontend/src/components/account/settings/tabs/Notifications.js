import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";

import { useDispatch } from "react-redux";

import SettingIcon from "../../assets/images/settings/settingsIcon.svg";
import { useSelector } from "react-redux";
import { updateEmailSettings } from "@/store/actions";

const Notifications = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { register, handleSubmit, reset } = useForm();

  const { user } = useSelector((state) => state.authentication);

  const [selectedUserProfiles, setSelectedUserProfiles] = useState([]);

  useEffect(() => {
    reset({
      allEmailsSent: user?.profiles?.allEmailsSent,
    });
    setSelectedUserProfiles(user?.profiles?.userProfiles);
  }, [user]);

  const handleProfileCheckboxChange = (profileId, isChecked) => {
    const updatedProfiles = selectedUserProfiles.map((profile) =>
      profile.userProfileId === profileId
        ? { ...profile, isEmailSent: isChecked }
        : profile
    );
    setSelectedUserProfiles(updatedProfiles);
  };

  const submitForm = (formData) => {
    formData.userProfiles = selectedUserProfiles;
    dispatch(
      updateEmailSettings({
        formData,
        toast,
        formatMessage,
      })
    );
  };

  return (
    <div className="basic-info">
      <div className="setting-title">
        <h3>
          <SettingIcon />
         <FormattedMessage id="changeNotificationSettings" />
        </h3>
      </div>
      <div className="email-settings">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="email-setting-item">
            <div className="switcher-wrap">
              <label className="switch">
                <input type="checkbox" {...register("allEmailsSent")} />
                <span className="slider"></span>
              </label>
              <h4 className="form-label"> <FormattedMessage id="receiveWeeklyEmail" /></h4>
            </div>
          </div>
          <div className="email-setting-item">
            {user?.profiles?.userProfiles?.map((profile, index) => (
              <div className="switcher-wrap" key={index}>
                <label className="switch">
                  <input
                    type="checkbox"
                    defaultChecked={profile.isEmailSent}
                    onChange={(e) =>
                      handleProfileCheckboxChange(
                        profile.userProfileId,
                        e.target.checked
                      )
                    }
                  />
                  <span className="slider"></span>
                </label>
                <h4 className="form-label">
                  <FormattedMessage id="receiveEmailAbout" /> <b>{profile?.name}</b>
                </h4>
              </div>
            ))}
          </div>
          <div className="email-setting-item">
            <button type="submit" className="btn">
            <FormattedMessage id="save" />
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={handleSubmit(submitForm)}></form>
    </div>
  );
};

export default Notifications;
