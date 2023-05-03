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
        StartTime: { type: Date, required: true },
        EndTime: { type: Date, required: true },
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

module.exports = mongoose.model("Employee", Employee);
