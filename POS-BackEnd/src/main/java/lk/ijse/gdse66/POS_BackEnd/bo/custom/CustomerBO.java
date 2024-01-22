package lk.ijse.gdse66.POS_BackEnd.bo.custom;

import lk.ijse.gdse66.POS_BackEnd.bo.SuperBo;
import lk.ijse.gdse66.POS_BackEnd.dto.CustomerDTO;

import java.sql.Connection;
import java.sql.SQLException;

public interface CustomerBO extends SuperBo {

    boolean addCustomer(Connection connection, CustomerDTO customerDTO) throws SQLException, ClassNotFoundException;
}
