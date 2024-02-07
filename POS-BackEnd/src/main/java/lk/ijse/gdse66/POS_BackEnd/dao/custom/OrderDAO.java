package lk.ijse.gdse66.POS_BackEnd.dao.custom;

import lk.ijse.gdse66.POS_BackEnd.dao.CrudDAO;
import lk.ijse.gdse66.POS_BackEnd.entity.Orders;

import java.sql.Connection;
import java.sql.SQLException;

public interface OrderDAO extends CrudDAO<Orders, String, Connection> {

    boolean ifOrderExist(String oid, Connection connection) throws SQLException, ClassNotFoundException;

    String generateNewOrderId(Connection connection) throws SQLException, ClassNotFoundException;

}
