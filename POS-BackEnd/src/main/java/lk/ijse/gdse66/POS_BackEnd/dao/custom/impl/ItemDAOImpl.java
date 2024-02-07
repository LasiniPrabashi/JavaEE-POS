package lk.ijse.gdse66.POS_BackEnd.dao.custom.impl;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import lk.ijse.gdse66.POS_BackEnd.dao.CrudUtil;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.ItemDAO;
import lk.ijse.gdse66.POS_BackEnd.entity.Item;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemDAOImpl implements ItemDAO{

    @Override
    public boolean add(Item item, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"INSERT INTO Item VALUES(?,?,?,?)",item.getCode(),
                item.getDescription(),item.getQtyOnHand(),item.getUnitPrice());
    }

    @Override
    public boolean delete(String itemCode, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"DELETE FROM item WHERE code=?", itemCode);
    }

    @Override
    public boolean update(Item item, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection, "UPDATE item SET description=?,qtyOnHand=?,unitPrice=? WHERE code=?",item.getDescription(),
                item.getQtyOnHand(),item.getUnitPrice(),item.getCode());
    }

    @Override
    public Item search(String code, Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery(connection,"SELECT * FROM Item WHERE Code=?",code);
        if (rst.next()){
            return new Item(
                    rst.getString(1),
                    rst.getString(2),
                    rst.getInt(3),
                    rst.getDouble(4)
            );
        }else {
            return null;
        }
    }

    @Override
    public ObservableList<Item> getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM Item");

        ObservableList<Item> obList = FXCollections.observableArrayList();

        while (resultSet.next()) {
            Item item = new Item(
                    resultSet.getString(1),
                    resultSet.getString(2),
                    resultSet.getInt(3),
                    resultSet.getDouble(4)
            );

            obList.add(item);
        }

        return obList;
    }

    @Override
    public boolean updateQtyOnHand(Connection connection, String id, int qty) throws SQLException, ClassNotFoundException {
        return  CrudUtil.executeUpdate(connection, "UPDATE Item SET qtyOnHand=(qtyOnHand - "+ qty +")WHERE itemCode=?", id);
    }

}
