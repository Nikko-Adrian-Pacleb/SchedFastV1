const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Employee = require("./employeeModel");
const DaySchedule = require("./dayScheduleModel");
const EmployeeTimeRequest = require("./employeeTimeRequestModel");

// Define collection and schema for Company
const Company = new Schema(
  {
    // Company Logins
    CompanyCode: { type: String, required: true },
    CompanyID: { type: String, required: true },
    CompanyPassword: { type: String, required: true },

    // Company Information
    CompanyName: { type: String, required: true },
    CompanyPositions: [{ type: String, required: true }],
    CompanyEmployees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],

    // Company Schedule Information
    CompanyDailySchedule: [{ type: Schema.Types.ObjectId, ref: "DaySchedule" }],
    AllEmployeeTimeRequests: [
      { type: Schema.Types.ObjectId, ref: "EmployeeTimeRequest" },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", Company);
