const DaySchedule = require("../models/dayScheduleModel");
const EmployeeTimeRequest = require("../models/employeeTimeRequestModel");
const Company = require("../models/companyModel");
const Employee = require("../models/employeeModel");

async function deleteExpiredObjects() {
  console.log("Deleting expired objects...");
  // Expiration Date 30 days ago
  const currentDate = new Date();
  const TimeAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));

  // // Expiration Date 5 minutes ago
  // const TimeAgo = new Date(
  //   currentDate.setMinutes(currentDate.getMinutes() - 1)
  // );

  // Delete all Day Schedules past 30 days
  const expiredDaySchedules = await DaySchedule.find({
    DayScheduleDate: { $lte: TimeAgo },
  });
  for (let i = 0; i < expiredDaySchedules.length; i++) {
    const company = await Company.findById(
      expiredDaySchedules[i].DayScheduleCompany
    );
    const CompanyAllDailySchedule = company.CompanyDailySchedule;
    const CompanyAllDailyScheduleIndex = CompanyAllDailySchedule.indexOf(
      expiredDaySchedules[i]._id
    );
    CompanyAllDailySchedule.splice(CompanyAllDailyScheduleIndex, 1);
    company.CompanyDailySchedule = CompanyAllDailySchedule;
    await company.save();
    await DaySchedule.findByIdAndDelete(expiredDaySchedules[i]._id);
  }

  //Delete all Employee Time Requests past 30 days
  const expiredEmployeeTimeRequests = await EmployeeTimeRequest.find({
    EmployeeTimeRequestDate: { $lte: TimeAgo },
  });
  for (let i = 0; i < expiredEmployeeTimeRequests.length; i++) {
    const employee = await Employee.findById(
      expiredEmployeeTimeRequests[i].EmployeeTimeRequestEmployee
    );
    const EmployeeAllTimeRequests = employee.EmployeeTimeRequests;
    const EmployeeAllTimeRequestsIndex = EmployeeAllTimeRequests.indexOf(
      expiredEmployeeTimeRequests[i]._id
    );
    EmployeeAllTimeRequests.splice(EmployeeAllTimeRequestsIndex, 1);
    employee.EmployeeAllTimeRequests = EmployeeAllTimeRequests;
    await employee.save();
    await EmployeeTimeRequest.findByIdAndDelete(
      expiredEmployeeTimeRequests[i]._id
    );
  }
}

module.exports = deleteExpiredObjects;
