const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./companyModel");
const Employee = require("./employeeModel");
const { bulkSave } = require("./dayScheduleModel");
const debug = require("debug")("app:employeeTimeRequestModel");

// Define collection and schema for Employee
const EmployeeTimeRequest = new Schema(
  {
    // Employee Company Information
    EmployeeTimeRequestCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    EmployeeTimeRequestEmployee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    // Request Information
    EmployeeTimeRequestDate: { type: Date, required: true },
    EmployeeTimeRequestAllDay: { type: Boolean, required: true },
    EmployeeTimeRequestStartTime: { type: Date, required: true },
    EmployeeTimeRequestEndTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmployeeTimeRequest", EmployeeTimeRequest);
