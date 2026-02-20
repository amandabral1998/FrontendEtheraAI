import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  BusinessCenter as BusinessIcon,
} from "@mui/icons-material";

const AttendanceManagement = ({
  employees,
  attendance,
  selectedEmployee,
  addAttendance,
  fetchAttendance,
}) => {
  const [newAttendance, setNewAttendance] = useState({
    employee_id: "",
    date: "",
    status: "present",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendance({ ...newAttendance, [name]: value });
  };

  const handleStatusChange = (e) => {
    setNewAttendance({ ...newAttendance, status: e.target.value });
  };

  const handleAddAttendance = async () => {
    const success = await addAttendance(newAttendance);
    if (success) {
      setNewAttendance({
        employee_id: "",
        date: "",
        status: "present",
      });
    }
  };

  const selectedEmployeeData = employees.find(
    (emp) => emp.employee_id === selectedEmployee
  );

  const filteredAttendance = selectedEmployee
    ? attendance.filter((att) => att.employee_id === selectedEmployee)
    : [];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Mark Attendance
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Select Employee</InputLabel>
                  <Select
                    name="employee_id"
                    value={newAttendance.employee_id}
                    onChange={handleInputChange}
                    label="Select Employee"
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.employee_id}>
                        {employee.full_name} ({employee.employee_id})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  name="date"
                  value={newAttendance.date}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newAttendance.status}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    <MenuItem value="present">
                      <Box display="flex" alignItems="center">
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                        Present
                      </Box>
                    </MenuItem>
                    <MenuItem value="absent">
                      <Box display="flex" alignItems="center">
                        <CancelIcon color="error" sx={{ mr: 1 }} />
                        Absent
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddAttendance}
                  fullWidth
                  disabled={!newAttendance.employee_id || !newAttendance.date}
                >
                  Mark Attendance
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Attendance Records
            </Typography>
            {selectedEmployee ? (
              <>
                <Box mb={2}>
                  <Typography variant="subtitle1">
                    {selectedEmployeeData?.full_name} (
                    {selectedEmployeeData?.employee_id})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedEmployeeData?.department}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {filteredAttendance.length > 0 ? (
                  <List>
                    {filteredAttendance.map((record) => (
                      <ListItem
                        key={record.id || record._id}
                        sx={{
                          border: "1px solid #e0e0e0",
                          borderRadius: 1,
                          mb: 1,
                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItemText
                          primary={new Date(record.date).toLocaleDateString()}
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {record.status === "present" ? (
                                <>
                                  <CheckCircleIcon color="success" fontSize="small" />
                                  <Typography
                                    variant="body2"
                                    color="success.main"
                                    component="span"
                                  >
                                    Present
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <CancelIcon color="error" fontSize="small" />
                                  <Typography
                                    variant="body2"
                                    color="error.main"
                                    component="span"
                                  >
                                    {record.status === "absent" ? "Absent" : record.status}
                                  </Typography>
                                </>
                              )}
                            </Box>
                          }
                          secondaryTypographyProps={{ component: "div" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    No attendance records found for this employee.
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body1" color="textSecondary">
                Select an employee to view attendance records.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AttendanceManagement;
