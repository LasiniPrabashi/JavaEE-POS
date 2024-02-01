package lk.ijse.gdse66.POS_BackEnd.bo;


import lk.ijse.gdse66.POS_BackEnd.bo.custom.impl.CustomerBOImpl;

public class BOFactory {
    private static BOFactory boFactory;

    private BOFactory(){

    }

    public static BOFactory getBoFactory(){
        if (boFactory == null){
            boFactory = new BOFactory();
        }
        return  boFactory;
    }

    public SuperBO getBO(BOTypes types){
        switch (types){
            case CUSTOMER:
                return new CustomerBOImpl();
//            case ITEM:
//                return new ItemBOImpl();
//            case ORDERS:
//                return new OrderBOImpl();
            default:
                return null;
        }
    }

    public enum BOTypes{
        CUSTOMER, ITEM, ORDERS, ORDERDETAILS
    }
}
