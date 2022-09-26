import React, { useEffect, useState } from "react";
import { FidgetSpinner } from "react-loader-spinner";
import swal from "sweetalert";
import { MdCheckCircleOutline } from "react-icons/md";

import { fetchActivities, deleteActivity } from "../../api/index";

import "./activities.style.css";

const deleteTask = async (id) => {
  try {
    await deleteActivity(id);
    await swal({
      title: "Task Complete.",
      icon: "success",
    });
    window.location.reload();
  } catch (error) {
    swal({
      title: "Error!!!",
      text: "Internal Server Error. Please try again later.",
      icon: "error",
    });
  }
}

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fatchedData = async () => {
      try {
        const { data } = await fetchActivities();
        setActivities(data);
      } catch (error) {
        swal({
          title: "Error!!!",
          text: "Internal Server Error. Please try again later.",
          icon: "error",
        });
      }
    };
    fatchedData();
  }, [activities.length]);

  return (
    <div className="container">
      {activities && activities.length > 0 ? (
        <div className="row">
          {activities.map((activity) => (
            <ol className="col" key={activity._id}>
              <ul>
                <span className="row__prop">Date:- </span>{" "}
                {activity.date.slice(0, 10).split("-").reverse().join("-")}
              </ul>
              <ul><span className="row__prop">Task:- </span>{activity.name}</ul>
              <ul><span className="row__prop">Time:- </span>{activity.time}</ul>
              <ul>
                <button className="row__done" onClick={() => deleteTask(activity._id)}>
                  <MdCheckCircleOutline
                    style={{ fontSize: "20px", color: "lightgreen" }}
                  />
                </button>
              </ul>
            </ol>
          ))}
        </div>
      ) : (
        <span className="loder">
          <FidgetSpinner
            visible={true}
            width="100%"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#ff0000", "#00ff00", "#0000ff"]}
            backgroundColor="#F4442E"
          />
        </span>
      )}
    </div>
  );
};

export default Activities;
