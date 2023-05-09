const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Employee = require("./employeeModel");
const DaySchedule = require("./dayScheduleModel");
const EmployeeTimeRequest = require("./employeeTimeRequestModel");

// Define collection and schema for Company
const Company = new Schema(
  {
    // Company Logins
    CompanyCode: { type: String },
    CompanyID: { type: String, required: true },
    CompanyPassword: { type: String, required: true },

    // Company Information
    CompanyName: { type: String, required: true },
    CompanyPositions: [{ type: String }],
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

function generateCompanyCode() {
  const characters = "0123456789";
  const charactersLength = characters.length;
  let newCompanyCode = "";
  for (let i = 0; i < 4; ++i) {
    newCompanyCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return newCompanyCode;
}
Company.pre("save", async function (next) {
  this.CompanyCode = generateCompanyCode();
  next();
});

module.exports = mongoose.model("Company", Company);
