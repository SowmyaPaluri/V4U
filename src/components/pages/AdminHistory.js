import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import users from "./userhis.png";
import workers from "./workhis.jpg";
import booking from "./booking.png";

const AdminHistory = () => {
  const navigate = useNavigate();
  const toBookingHistory = () => {
    let path = "/bookingHistory";
    navigate(path);
  };
  const toWorkersHistory = () => {
    let path = "/workersHistory";
    navigate(path);
  };
  const toUsersHistory = () => {
    let path = "/usersHistory";
    navigate(path);
  };

  return (
    <div>
      <br></br>
      <br></br>
      <center>
        <center>
          <h1>History Details</h1>
          <br></br>
        </center>
        <button
          type="submit"
          onClick={toBookingHistory}
          style={{ borderRadius: "50%", outline: "none" }}
        >
          <img
            src={booking}
            height="250"
            width="250"
            alt="Users"
            style={{ borderRadius: "50%" }}
          />
        </button>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <button
          type="submit"
          onClick={toUsersHistory}
          style={{ borderRadius: "50%" }}
        >
          <img
            src={users}
            height="250"
            width="250"
            alt="Users"
            style={{ borderRadius: "50%" }}
          />
        </button>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <button
          type="submit"
          onClick={toWorkersHistory}
          style={{ borderRadius: "50%" }}
        >
          <img
            src={workers}
            height="250"
            width="250"
            alt="Users"
            style={{ borderRadius: "50%" }}
          />
        </button>
        <h1>
          Booking History &emsp;&emsp;User's History &emsp;&emsp;Worker's
          History
        </h1>
      </center>
    </div>
  );
};

export default AdminHistory;
