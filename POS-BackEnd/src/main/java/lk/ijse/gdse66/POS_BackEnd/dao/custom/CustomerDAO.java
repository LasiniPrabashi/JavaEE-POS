package lk.ijse.gdse66.POS_BackEnd.dao.custom;

import lk.ijse.gdse66.POS_BackEnd.dao.CrudDAO;
import lk.ijse.gdse66.POS_BackEnd.entity.CustomerEntity;

import java.sql.Connection;

public interface CustomerDAO extends CrudDAO<CustomerEntity, String, Connection> {
}
