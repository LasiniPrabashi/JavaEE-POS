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

$("#btnSearch").click(function () {
    let customerID = $("#txtSearchCusID").val();
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/backEnd/customer?option=SEARCH&cusId=" + customerID,
        method: "GET",
        success: function (resp) {
            let row = `<tr><td>${resp.id}</td><td>${resp.name}</td><td>${resp.address}</td><td>${resp.contact}</td></tr>`;
            $("#customerTable").append(row);

            bindClickEvents();
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


//--------------validation ----------------------

const customerIdRegEx = /^(C00-)[0-9]{3}$/;
const customerNameRegEx = /^[A-z ]{2,20}$/;
const customerAddressRegEx = /^[A-z]{2,}$/;
const customerTpRegEx = /^[0-9]{2,}$/;


$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
    formValidCus();
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('blur', function () {
    formValidCus();
});

$("#txtCustomerID").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }


    if (eventOb.key == "Control") {
        var typedCustomerId = $("#txtCustomerID").val();
        var srcCustomer = searchCustomerFromId(typedCustomerId);
        $("#txtCustomerID").val(srcCustomer.getCustomerId());
        $("#txtCustomerName").val(srcCustomer.getCustomerName());
        $("#txtCustomerAddress").val(srcCustomer.getCustomerAddress());
        $("#txtCustomerContact").val(srcCustomer.getCustomerTp());
    }
});

$("#txtCustomerName").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#txtCustomerAddress").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#txtCustomerContact").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#btnCustomer").attr('disabled', true);

function clearAll() {
    $('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').val("");
    $('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').css('border', '2px solid #ced4da');
    $('#txtCustomerID').focus();
    $("#btnCustomer").attr('disabled', true);
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcusContact").text("");
}

function formValidCus() {
    var customerId = $("#txtCustomerID").val();
    $("#txtCustomerID").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (customerIdRegEx.test(customerId)) {
        var customerName = $("#txtCustomerName").val();
        if (customerNameRegEx.test(customerName)) {
            $("#txtCustomerName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var customerAddress = $("#txtCustomerAddress").val();
            if (customerAddressRegEx.test(customerAddress)) {
                var customerTp = $("#txtCustomerContact").val();
                var resp = customerTpRegEx.test(customerTp);
                $("#txtCustomerAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtCustomerContact").css('border', '2px solid green');
                    $("#lblcusContact").text("");
                    return true;
                } else {
                    $("#txtCustomerContact").css('border', '2px solid red');
                    $("#lblcusContact").text("Customer Tp is a required field : 701074711");
                    return false;
                }
            } else {
                $("#txtCustomerAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer Address is a required field :  Galle");
                return false;
            }
        } else {
            $("#txtCustomerName").css('border', '2px solid red');
            $("#lblcusname").text("Customer Name is a required field : Nirasha");
            return false;
        }
    } else {
        $("#txtCustomerID").css('border', '2px solid red');
        $("#lblcusid").text("Customer Id is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValidCus() {
    var customerId = $("#txtCustomerID").val();
    if (customerIdRegEx.test(customerId)) {
        $("#txtCustomerName").focus();
        var customerName = $("#txtCustomerName").val();
        if (customerNameRegEx.test(customerName)) {
            $("#txtCustomerAddress").focus();
            var customerAddress= $("#txtCustomerAddress").val();
            if (customerAddressRegEx.test(customerAddress)) {
                $("#txtCustomerContact").focus();
                var customerTp = $("#txtCustomerContact").val();
                var resp = customerTpRegEx.test(customerTp);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        clearAll();
                    }
                } else {
                    $("#txtCustomerContact").focus();
                }
            } else {
                $("#txtCustomerAddress").focus();
            }
        } else {
            $("#txtCustomerName").focus();
        }
    } else {
        $("#txtCustomerID").focus();
    }
}

function setButtonCus() {
    let b = formValidCus();
    if (b) {
        $("#btnCustomer").attr('disabled', false);
    } else {
        $("#btnCustomer").attr('disabled', true);
    }
}

$('#btnCustomer').click(function () {
    checkIfValidCus();
});


//--------------validation End----------------------