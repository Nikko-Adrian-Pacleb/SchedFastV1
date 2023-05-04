const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./companyModel");
const Employee = require("./employeeModel");
const debug = require("debug")("app:dayScheduleModel");

// Define collection and schema for Schedule
const DaySchedule = new Schema(
  {
    // Schedule Company Information
    DayScheduleCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    DayScheduleDate: { type: Date, required: true },
    ScheduleInformation: [
      {
        ScheduleEmployee: {
          type: Schema.Types.ObjectId,
          ref: "Employee",
          required: true,
        },
        ScheduleStartTime: { type: Date, required: true },
        ScheduleEndTime: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DaySchedule", DaySchedule);
