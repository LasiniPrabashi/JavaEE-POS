package lk.ijse.gdse66.POS_BackEnd.dao;

import java.sql.Connection;
import java.sql.SQLException;

public interface CrudDAO <T, ID,C>extends SuperDAO{

    boolean add(T t, Connection connection) throws SQLException, ClassNotFoundException;
}
