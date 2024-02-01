package lk.ijse.gdse66.POS_BackEnd.bo.custom.impl;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import lk.ijse.gdse66.POS_BackEnd.bo.custom.ItemBO;
import lk.ijse.gdse66.POS_BackEnd.dao.DAOFactory;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.ItemDAO;
import lk.ijse.gdse66.POS_BackEnd.dto.ItemDTO;
import lk.ijse.gdse66.POS_BackEnd.entity.Item;

import java.sql.Connection;
import java.sql.SQLException;

public class ItemBOImpl implements ItemBO {
    private final ItemDAO itemDAO = (ItemDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ITEM);

    @Override
    public boolean addItem(Connection connection, ItemDTO itemDTO) throws SQLException, ClassNotFoundException {
        Item item = new Item(
                itemDTO.getCode(), itemDTO.getDescription(), itemDTO.getQtyOnHand(), itemDTO.getUnitPrice()

        );
        return itemDAO.add(item, connection);
    }

    @Override
    public ObservableList<ItemDTO> getAllItem(Connection connection) throws SQLException, ClassNotFoundException {
        ObservableList<Item> items = itemDAO.getAll(connection);

        ObservableList<ItemDTO> obList = FXCollections.observableArrayList();

        for (Item temp : items) {
            ItemDTO itemDTO = new ItemDTO(
                    temp.getCode(),temp.getDescription(),temp.getQtyOnHand(),temp.getUnitPrice()
            );

            obList.add(itemDTO);
        }
        return obList;
    }

    @Override
    public ItemDTO searchItem(String itemCode, Connection connection) throws SQLException, ClassNotFoundException {
        Item item = itemDAO.search(itemCode, connection);

        ItemDTO itemDTO = new ItemDTO(
                item.getCode(),item.getDescription(),item.getQtyOnHand(),item.getUnitPrice()
        );
        return itemDTO;
    }

    @Override
    public boolean deleteItem(Connection connection, String itemCode) throws SQLException, ClassNotFoundException {
        return itemDAO.delete(itemCode, connection);
    }

    @Override
    public boolean updateItem(Connection connection, ItemDTO itemDTO) throws SQLException, ClassNotFoundException {
        Item item = new Item(
                itemDTO.getCode(),itemDTO.getDescription(),itemDTO.getQtyOnHand(),itemDTO.getUnitPrice()

        );
        return itemDAO.update(item,connection);
    }
}