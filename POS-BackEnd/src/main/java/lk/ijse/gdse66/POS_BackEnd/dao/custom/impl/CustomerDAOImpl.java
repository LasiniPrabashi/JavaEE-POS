package lk.ijse.gdse66.POS_BackEnd.dao.custom.impl;

import lk.ijse.gdse66.POS_BackEnd.dao.CrudUtil;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.CustomerDAO;
import lk.ijse.gdse66.POS_BackEnd.entity.CustomerEntity;

import java.sql.Connection;
import java.sql.SQLException;

public class CustomerDAOImpl implements CustomerDAO {

    @Override
    public boolean add(CustomerEntity customer, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"INSERT INTO Customer VALUES(?,?,?,?)",
                customer.getId(),
                customer.getName(),
                customer.getAddress(),
                customer.getContact());
    }
}
