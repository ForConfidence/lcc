package edu.zju.cims201.GOF.service.department;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.Department;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;

public interface DepartmentService {


	public List getEmployeeByDepartment(String id);
	public List<Employee> getEmployee();
	public Employee getEmployeeByid(String id);
	public Department getDepartmentByid(String id);
	public List<Department> getAllDepartments();



}
