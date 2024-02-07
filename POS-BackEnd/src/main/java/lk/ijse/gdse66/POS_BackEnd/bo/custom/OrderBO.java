package lk.ijse.gdse66.POS_BackEnd.bo.custom;

import javafx.collections.ObservableList;
import lk.ijse.gdse66.POS_BackEnd.bo.SuperBO;
import lk.ijse.gdse66.POS_BackEnd.dto.CustomerDTO;
import lk.ijse.gdse66.POS_BackEnd.dto.ItemDTO;
import lk.ijse.gdse66.POS_BackEnd.dto.OrderDetailsDTO;
import lk.ijse.gdse66.POS_BackEnd.dto.OrdersDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface OrderBO extends SuperBO {

    boolean saveOrder(Connection connection, OrdersDTO ordersDTO) throws SQLException, ClassNotFoundException;

    boolean saveOrderDetail(Connection connection, OrdersDTO ordersDTO) throws SQLException, ClassNotFoundException;

    boolean updateQtyOnHand(Connection connection, String id, int qty) throws SQLException, ClassNotFoundException;

    ObservableList<OrdersDTO> getAllOrders(Connection connection) throws SQLException, ClassNotFoundException;

    ObservableList<OrderDetailsDTO> getAllOrderDetails(Connection connection) throws SQLException, ClassNotFoundException;

    ArrayList<OrderDetailsDTO> searchOrderDetails(String orderId, Connection connection) throws SQLException, ClassNotFoundException;

    String generateNewOrderId(Connection connection) throws SQLException, ClassNotFoundException;

    ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException, ClassNotFoundException;

    ArrayList<ItemDTO> getAllItems(Connection connection) throws SQLException, ClassNotFoundException;


}
