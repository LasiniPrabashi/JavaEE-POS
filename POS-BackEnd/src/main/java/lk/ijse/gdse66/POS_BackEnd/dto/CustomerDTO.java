package lk.ijse.gdse66.POS_BackEnd.dto;

import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String cusId;
    private String cusName;
    private String cusAddress;
    private String cusContact;
}
