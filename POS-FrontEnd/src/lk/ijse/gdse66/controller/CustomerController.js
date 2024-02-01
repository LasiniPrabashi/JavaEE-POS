loadAllCustomer();

$("#btnCustomer").click(function (){

    let data = $("#customerForm").serialize();
    console.log(data);

    $.ajax({
        url: "http://localhost:8080/backEnd/customer",
        method: "POST",
        data: data,

        success: function (res){
            console.log(res);
            if (res.status==200){
                loadAllCustomer();
                alert(res.message);
                resetCustomer();
            }else {
                console.log(res)
                alert(res.data);
            }
        },
        error: function (ob, textStatus, error){
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
});

$("#btnGetAllCustomer").click(function () {
    resetCustomer();
    loadAllCustomer();

});

function resetCustomer(){
    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerContact").val("");
}

function loadAllCustomer() {
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/backEnd/customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);

            }
            bindClickEvents();
        }
    });
}

    $("#btnUpdate").click(function (){
        let cusOb = {
            id: $("#txtCustomerID").val(),
            name: $("#txtCustomerName").val(),
            address: $("#txtCustomerAddress").val(),
            contact: $("#txtCustomerContact").val()
        };

        $.ajax({
            url: "http://localhost:8080/backEnd/customer",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(cusOb),

            success: function (res){
                if (res.status == 200) {
                    alert(res.message);
                    resetCustomer();
                    loadAllCustomer()
                } else if (res.status == 400) {
                    alert(res.message);
                } else {
                    alert(res.data);
                }
            },
            error: function (ob, errorStus) {
                console.log(ob);
                console.log(errorStus);
            }

        });
    });

$("#btnDelete").click(function () {
    let customerID = $("#txtCustomerID").val();

    $.ajax({
        url: "http://localhost:8080/backEnd/customer?txtCustomerID=" + customerID,
        method: "DELETE",

        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                resetCustomer();
                loadAllCustomer();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {
            console.log(ob);
            console.log(status);
            console.log(t);
        }
    });
});

    function bindClickEvents(){
        $("#customerTable>tr").click(function (){
            let cusId = $(this).children().eq(0).text();
            let name = $(this).children().eq(1).text();
            let address = $(this).children().eq(2).text();
            let contact = $(this).children().eq(3).text();

            $("#txtCustomerID").val(cusId);
            $("#txtCustomerName").val(name);
            $("#txtCustomerAddress").val(address);
            $("#txtCustomerContact").val(contact);
        });



    }

