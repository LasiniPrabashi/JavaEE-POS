package lk.ijse.gdse66.POS_BackEnd.Servlet;

import jakarta.json.*;
import javafx.collections.ObservableList;
import lk.ijse.gdse66.POS_BackEnd.bo.BOFactory;
import lk.ijse.gdse66.POS_BackEnd.bo.custom.ItemBO;
import lk.ijse.gdse66.POS_BackEnd.dto.ItemDTO;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(name = "itemServlet", value = "/item")
public class ItemServlet extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource dataSource;

    private final ItemBO itemBO = (ItemBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.ITEM);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        resp.addHeader("Access-Control-Allow-Origin", "*");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        try {
            Connection connection =dataSource.getConnection();

            ItemDTO itemDTO = new ItemDTO(
                    jsonObject.getString("itemCode"),
                    jsonObject.getString("itemName"),
                    Integer.parseInt(jsonObject.getString("itemQty")),
                    Double.parseDouble(jsonObject.getString("itemPrice"))
            );

            try {
                if (itemBO.addItem(connection, itemDTO)){
                    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    resp.setStatus(HttpServletResponse.SC_CREATED);
                    objectBuilder.add("status", 200);
                    objectBuilder.add("message", "Successfully Added");
                    objectBuilder.add("data", "");
                    writer.print(objectBuilder.build());
                }

            }catch (SQLException e){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Error");
                objectBuilder.add("data", e.getLocalizedMessage());
                writer.print(objectBuilder.build());
                resp.setStatus(HttpServletResponse.SC_OK);
                e.printStackTrace();
            }catch (ClassNotFoundException e){
                e.printStackTrace();
            }
            connection.close();

        }catch (SQLException e){
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 400);
            objectBuilder.add("message", "Error");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
            resp.setStatus(HttpServletResponse.SC_OK);
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String option = req.getParameter("option");
            String code = req.getParameter("iCode");
            resp.setContentType("application/json");
            Connection connection = dataSource.getConnection();
            PrintWriter writer = resp.getWriter();

        resp.addHeader("Access-Control-Allow-Origin", "*");

            switch (option) {
                case "SEARCH":

                    ItemDTO itemDTO1 = itemBO.searchItem(code, connection);
                    JsonObjectBuilder objectBuilder1 = Json.createObjectBuilder();

                    objectBuilder1.add("itemCode", itemDTO1.getItemCode());
                    objectBuilder1.add("name", itemDTO1.getDescription());
                    objectBuilder1.add("qtyOnHand", itemDTO1.getQtyOnHand());
                    objectBuilder1.add("price", itemDTO1.getUnitPrice());

                    writer.print(objectBuilder1.build());

                    break;

                case "GETALL":

                    ObservableList<ItemDTO> allItems = itemBO.getAllItem(connection);
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    for (ItemDTO itemDTO : allItems) {

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("itemCode", itemDTO.getItemCode());
                        objectBuilder.add("itemName", itemDTO.getDescription());
                        objectBuilder.add("itemQty", itemDTO.getQtyOnHand());
                        objectBuilder.add("itemPrice", itemDTO.getUnitPrice());
                        arrayBuilder.add(objectBuilder.build());

                    }
                    JsonObjectBuilder response1 = Json.createObjectBuilder();
                    response1.add("status", 200);
                    response1.add("message", "Done");
                    response1.add("data", arrayBuilder.build());
                    writer.print(response1.build());

                    break;
            }

            connection.close();

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

   /* @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        PrintWriter writer = resp.getWriter();
        resp.setContentType("Application/json");

        resp.addHeader("Access-Control-Allow-Origin", "*");

        try {
            Connection connection = dataSource.getConnection();

            ItemDTO itemDTO = new ItemDTO(
                    jsonObject.getString("itemCode"),
                    jsonObject.getString("itemName"),
                    Integer.parseInt(jsonObject.getString("itemQty")),
                    Double.parseDouble(jsonObject.getString("itemPrice"))
            );
            if (itemBO.updateItem(connection, itemDTO)) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Updated");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Update Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }

            connection.close();

        } catch (SQLException | ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Update Failed");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
            e.printStackTrace();
        }
    }*/

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "DELETE, PUT");
        resp.addHeader("Access-Control-Allow-Headers", "Content-Type");

    }
}
