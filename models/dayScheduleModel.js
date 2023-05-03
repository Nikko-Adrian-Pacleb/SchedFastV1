const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./companyModel");
const Employee = require("./employeeModel");

// Define collection and schema for Schedule
const DaySchedule = new Schema(
  {
    // Schedule Company Information
    ScheduleCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    ScheduleDate: { type: Date, required: true },
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

    // Expire in 30 days
    expireAt: {
      type: Date,
      default: ScheduleDate,
      index: { expires: "30d" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DaySchedule", DaySchedule);
