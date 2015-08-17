package edu.zju.cims201.GOF.service.department;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.Department;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public List getEmployeeByDepartment(String id) {
		return sessionFactory.getCurrentSession().createQuery("from Employee e where e.department.id=?").setParameter(0, Long.valueOf(id)).list();
	}
	public List<Employee> getEmployee() {
		return sessionFactory.getCurrentSession().createQuery("from Employee e").list();
	}
	public Employee getEmployeeByid(String id) {
		return (Employee)sessionFactory.getCurrentSession().get(Employee.class, Long.valueOf(id));
	}
	public Department getDepartmentByid(String id) {
		return (Department)sessionFactory.getCurrentSession().get(Department.class, Long.valueOf(id));
	}
	public List<Department> getAllDepartments() {
		return sessionFactory.getCurrentSession().createQuery("from Department d").list();
	}
}

