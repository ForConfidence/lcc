package edu.zju.cims201.GOF.rs.dto;

import java.util.List;

public class UsersAndRolesDTO {
	
	
	List<UserDTO> userDtos;
	
	List<RoleDTO> roleDtos;

	public List<RoleDTO> getRoleDtos() {
		return roleDtos;
	}

	public void setRoleDtos(List<RoleDTO> roleDtos) {
		this.roleDtos = roleDtos;
	}

	public List<UserDTO> getUserDtos() {
		return userDtos;
	}

	public void setUserDtos(List<UserDTO> userDtos) {
		this.userDtos = userDtos;
	}
	
	
	

}
