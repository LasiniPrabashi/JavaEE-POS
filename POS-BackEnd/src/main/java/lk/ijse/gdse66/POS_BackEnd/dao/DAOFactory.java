package lk.ijse.gdse66.POS_BackEnd.dao;

import lk.ijse.gdse66.POS_BackEnd.dao.custom.impl.CustomerDAOImpl;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.impl.ItemDAOImpl;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.impl.OrderDAOImpl;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.impl.OrderDetailsDAOImpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory() {

    }

    public static DAOFactory getDaoFactory() {
        if (daoFactory == null) {
            daoFactory = new DAOFactory();
        }
        return daoFactory;
    }

    public SuperDAO getDAO(DAOTypes types) {
        switch (types) {
            case CUSTOMER:
                return new CustomerDAOImpl();
            case ITEM:
                return new ItemDAOImpl();
            case ORDERS:
                return new OrderDAOImpl();
            case ORDERDETAILS:
                return new OrderDetailsDAOImpl();
            default:
                return null;
        }
    }


    public enum DAOTypes {
        CUSTOMER, ITEM, ORDERS, ORDERDETAILS

    }

}
