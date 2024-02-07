package lk.ijse.gdse66.POS_BackEnd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Orders {

    private String oid;
    private String customerId;
    private Date Date;
    private double total;
    private double discount;
    private double subTotal;
}
