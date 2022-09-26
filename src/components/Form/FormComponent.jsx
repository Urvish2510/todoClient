import React from "react";
import swal from "sweetalert";
import "./form.style.css";

const addActivity = async (event) => {
  event.preventDefault();
  const activity = event.target.activity.value;
  const time = event.target.time.value;
  const date = event.target.date.value;

  if (activity === "" || time === "" || date === "") {
    swal({
      title: "Error!!!",
      text: "Enter valid date or activity or time",
      icon: "error",
    });
  } else {
    try {
      const newActivity = {
        date: date,
        name: activity,
        time: time,
      };

      await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });

      event.target.date.value = "";
      event.target.activity.value = "";
      event.target.time.value = "";

      await swal({
        title: "Done",
        text: "Activity added successfully.",
        icon: "success",
      });
      window.location.reload();
    } catch (error) {
      swal({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  }
};

const FormComponent = () => {
  return (
    <form onSubmit={addActivity}>
      <div className="form__container">
        <div className="form__row">
          <label htmlFor="time" className="form__label">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            autoComplete="off"
            className="form__input"
          />
        </div>
        <div className="form__row">
          <label htmlFor="activity" className="form__label">
            Task:
          </label>
          <input
            type="text"
            id="activity"
            name="activity"
            autoComplete="off"
            className="form__input"
          />
        </div>
        <div className="form__row">
          <label htmlFor="time" className="form__label">
            Time:
          </label>
          <input
            type="text"
            id="time"
            name="time"
            autoComplete="off"
            className="form__input"
          />
        </div>
        <span className="form__row">
          <button type="submit" className="form__button">
            Add
          </button>
        </span>
      </div>
    </form>
  );
};

export default FormComponent;
