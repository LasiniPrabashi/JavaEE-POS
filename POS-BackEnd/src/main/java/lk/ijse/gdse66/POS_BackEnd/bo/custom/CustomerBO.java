package lk.ijse.gdse66.POS_BackEnd.bo.custom;

import javafx.collections.ObservableList;
import lk.ijse.gdse66.POS_BackEnd.bo.SuperBO;
import lk.ijse.gdse66.POS_BackEnd.dto.CustomerDTO;

import java.sql.Connection;
import java.sql.SQLException;

public interface CustomerBO extends SuperBO {

    boolean addCustomer(Connection connection, CustomerDTO customerDTO) throws SQLException, ClassNotFoundException;
    ObservableList<CustomerDTO> getAllCustomer (Connection connection) throws SQLException, ClassNotFoundException;
    boolean updateCustomer(Connection connection, CustomerDTO customerDTO) throws SQLException, ClassNotFoundException;
    boolean deleteCustomer(Connection connection, String id) throws SQLException, ClassNotFoundException;
    CustomerDTO searchCustomer(String id, Connection connection) throws SQLException, ClassNotFoundException;
}
