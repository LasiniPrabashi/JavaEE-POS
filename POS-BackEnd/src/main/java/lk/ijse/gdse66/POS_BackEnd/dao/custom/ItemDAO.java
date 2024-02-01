package lk.ijse.gdse66.POS_BackEnd.dao.custom;

import lk.ijse.gdse66.POS_BackEnd.dao.CrudDAO;
import lk.ijse.gdse66.POS_BackEnd.entity.Item;

import java.sql.Connection;
import java.sql.SQLException;

public interface ItemDAO extends CrudDAO<Item, String, Connection> {

    boolean updateQtyOnHand(Connection connection, String id, int qty) throws SQLException, ClassNotFoundException;

}
