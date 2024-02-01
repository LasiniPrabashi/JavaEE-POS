package lk.ijse.gdse66.POS_BackEnd.dao;

import lk.ijse.gdse66.POS_BackEnd.dao.custom.impl.CustomerDAOImpl;
import lk.ijse.gdse66.POS_BackEnd.dao.custom.impl.ItemDAOImpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory(){

    }

    public static DAOFactory getDaoFactory(){
        if (daoFactory==null){
            daoFactory= new DAOFactory();
        }
        return daoFactory;
    }

    public SuperDAO getDAO(DAOTypes types){
        switch (types){
            case CUSTOMER:
                return new CustomerDAOImpl();
            case ITEM:
                return new ItemDAOImpl();
            default:
                return null;
        }
    }



    public enum DAOTypes{
        CUSTOMER,ITEM
    }
}
