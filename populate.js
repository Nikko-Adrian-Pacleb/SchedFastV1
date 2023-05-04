console.log("Populating database...");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const company = require("./models/companyModel");
const employee = require("./models/employeeModel");
const daySchedule = require("./models/dayScheduleModel");
const employeeTimeRequest = require("./models/employeeTimeRequestModel");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

populate().catch((error) => console.error(error.stack));

// Populate the database with dummy data
async function populate() {
  // Connect to MongoDB
  await mongoose.connect(mongoDB);

  // Create a Company
  const company1 = new company({
    CompanyCode: "1234",
    CompanyID: "1234",
    CompanyPassword: "1234",
    CompanyName: "Company 1",
    CompanyPositions: ["Position 1", "Position 2", "Position 3"],
  });

  // Create an Employee
  const employee1 = new employee({
    EmployeeCompany: company1._id,
    EmployeePosition: "Position 1",
    EmployeeID: "1234",
    EmployeePin: "1234",
    EmployeeFirstName: "Employee",
    EmployeeLastName: "1",
  });
  // Add Employee to Company
  company1.CompanyEmployees.push(employee1._id);

  // Create a non expired DaySchedule
  const daySchedule1 = new daySchedule({
    DayScheduleCompany: company1._id,
    DayScheduleDate: new Date("2023-08-08"),
    ScheduleInformation: [
      {
        ScheduleEmployee: employee1._id,
        ScheduleStartTime: new Date("2023-01-01 08:00:00"),
        ScheduleEndTime: new Date("2023-01-01 16:00:00"),
      },
    ],
  });
  // Add DaySchedule to Company
  company1.CompanyDailySchedule.push(daySchedule1._id);

  // Create an expired DaySchedule
  const daySchedule2 = new daySchedule({
    DayScheduleCompany: company1._id,
    DayScheduleDate: new Date("2020-08-08"),
    ScheduleInformation: [
      {
        ScheduleEmployee: employee1._id,
        ScheduleStartTime: new Date("2020-01-01 08:00:00"),
        ScheduleEndTime: new Date("2020-01-01 16:00:00"),
      },
    ],
  });
  // Add DaySchedule to Company
  company1.CompanyDailySchedule.push(daySchedule2._id);

  // Create a non expired EmployeeTimeRequest
  const employeeTimeRequest1 = new employeeTimeRequest({
    EmployeeTimeRequestCompany: company1._id,
    EmployeeTimeRequestEmployee: employee1._id,
    EmployeeTimeRequestDate: new Date("2023-08-08"),
    EmployeeTimeRequestAllDay: false,
    EmployeeTimeRequestStartTime: new Date("2023-01-01 08:00:00"),
    EmployeeTimeRequestEndTime: new Date("2023-01-01 16:00:00"),
  });
  // Add EmployeeTimeRequest to Company and Employee
  company1.AllEmployeeTimeRequests.push(employeeTimeRequest1._id);
  employee1.EmployeeTimeRequests.push(employeeTimeRequest1._id);

  // Create an expired EmployeeTimeRequest
  const employeeTimeRequest2 = new employeeTimeRequest({
    EmployeeTimeRequestCompany: company1._id,
    EmployeeTimeRequestEmployee: employee1._id,
    EmployeeTimeRequestDate: new Date("2020-08-08"),
    EmployeeTimeRequestAllDay: false,
    EmployeeTimeRequestStartTime: new Date("2020-01-01 08:00:00"),
    EmployeeTimeRequestEndTime: new Date("2020-01-01 16:00:00"),
  });
  // Add EmployeeTimeRequest to Company and Employee
  company1.AllEmployeeTimeRequests.push(employeeTimeRequest2._id);
  employee1.EmployeeTimeRequests.push(employeeTimeRequest2._id);

  // Save Company
  await company1.save();
  // Save Employee
  await employee1.save();
  // Save DaySchedule
  await daySchedule1.save();
  await daySchedule2.save();
  // Save EmployeeTimeRequest
  await employeeTimeRequest1.save();
  await employeeTimeRequest2.save();

  // Disconnect from MongoDB
  await mongoose.disconnect();
}
