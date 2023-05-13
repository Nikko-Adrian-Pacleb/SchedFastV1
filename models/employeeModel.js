const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./companyModel");
const EmployeeTimeRequest = require("./employeeTimeRequestModel");

// Define collection and schema for Employee
const Employee = new Schema(
  {
    // Employee Company Information
    EmployeeCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    EmployeePosition: { type: String, required: true },
    EmployeeCompanyID: { type: String }, // Login Information
    EmployeeID: { type: String, required: true }, // Login Information
    EmployeePin: { type: String, required: true }, // Login Information

    // Employee Information
    EmployeeFirstName: { type: String, required: true },
    EmployeeLastName: { type: String, required: true },

    // Employee Schedule
    EmployeeWeeklyAvailability: [
      {
        Day: { type: String, required: true },
        AllDay: { type: Boolean, required: true },
        StartTime: { type: Object },
        EndTime: { type: Object },
      },
    ],
    EmployeeTimeRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "EmployeeTimeRequest",
      },
    ],
  },
  {
    timestamps: true,
  }
);

Employee.pre("save", async function (next) {
  // EmployeeWeekAvailability Setup
  const employeeWeekAvailability = [];
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0; i < 7; ++i) {
    const employeeDayAvailability = {
      Day: daysOfTheWeek[i],
      AllDay: true,
      StartTime: {
        hour: 0,
        minute: 0,
      },
      EndTime: {
        hour: 23,
        minute: 59,
      },
    };
    employeeWeekAvailability.push(employeeDayAvailability);
  }
  this.EmployeeWeeklyAvailability = employeeWeekAvailability;
  next();
});

module.exports = mongoose.model("Employee", Employee);
