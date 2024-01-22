package lk.ijse.gdse66.POS_BackEnd.bo.custom.impl;

import lk.ijse.gdse66.POS_BackEnd.bo.custom.CustomerBO;
import lk.ijse.gdse66.POS_BackEnd.dao.DAOFactory;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.CustomerDAO;
import lk.ijse.gdse66.POS_BackEnd.dto.CustomerDTO;
import lk.ijse.gdse66.POS_BackEnd.entity.CustomerEntity;

import java.sql.Connection;
import java.sql.SQLException;

public class CustomerBOImpl implements CustomerBO {

    private final CustomerDAO customerDAO = (CustomerDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);

    public boolean addCustomer(Connection connection, CustomerDTO customerDTO) throws SQLException, ClassNotFoundException {
        CustomerEntity customer = new CustomerEntity(
                customerDTO.getId(), customerDTO.getName(), customerDTO.getAddress(),customerDTO.getAddress()

        );
        return customerDAO.add(customer,connection);
    }
}
