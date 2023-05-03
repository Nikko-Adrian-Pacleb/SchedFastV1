const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./companyModel");
const Employee = require("./employeeModel");

// Define collection and schema for Employee
const EmployeeTimeRequest = new Schema(
  {
    // Employee Company Information
    EmployeeCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    Employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },

    // Request Information
    EmployeeTimeRequestDate: { type: Date, required: true },
    EmployeeTimeRequestAllDay: { type: Boolean, required: true },
    EmployeeTimeRequestStartTime: { type: Date, required: true },
    EmployeeTimeRequestEndTime: { type: Date, required: true },

    // Expire in 30 days
    expireAt: {
      type: Date,
      default: EmployeeTimeRequestDate,
      index: { expires: "30d" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmployeeTimeRequest", EmployeeTimeRequest);
