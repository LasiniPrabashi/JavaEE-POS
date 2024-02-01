package lk.ijse.gdse66.POS_BackEnd.dao.custom;

import lk.ijse.gdse66.POS_BackEnd.dao.CrudDAO;
import lk.ijse.gdse66.POS_BackEnd.entity.Customer;

import java.sql.Connection;

public interface CustomerDAO extends CrudDAO<Customer, String, Connection> {
}
