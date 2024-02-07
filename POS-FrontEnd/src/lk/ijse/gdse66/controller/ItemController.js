loadAllItem();

$("#btnItem").click(function () {
    let itemOb = {
        "itemCode": $("#txtItemId").val(),
        "itemName": $("#txtItemName").val(),
        "itemQty": $("#txtQty").val(),
        "itemPrice": $("#txtPrice").val()
    };

    $.ajax({
        url: "http://localhost:8080/backEnd/item",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res) {
            if (res.status == 200) {
                loadAllItem();
                alert(res.message);
                resetItem();
            } else {
                alert(res.data);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
});

$("#btnGetAllItem").click(function () {
    resetItem();
    loadAllItem();
});

function resetItem() {
    $("#txtItemId").val("");
    $("#txtItemName").val("");
    $("#txtQty").val("");
    $("#txtPrice").val("");
}

function loadAllItem() {
    $("#itemTable").empty();
    $.ajax({
        url: "http://localhost:8080/backEnd/item?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const item of resp.data) {
                let row = `<tr><td>${item.itemCode}</td><td>${item.itemName}</td><td>${item.itemQty}</td><td>${item.itemPrice}</td></tr>`;
                $("#itemTable").append(row);
            }
            bindClickEvent();
        }
    });
}

$("#btnItemUpdate").click(function (){
    let itemOb = {
        itemCode: $("#txtItemId").val(),
        itemName: $("#txtItemName").val(),
        itemQty: $("#txtQty").val(),
        itemPrice: $("#txtPrice").val()
    };
    $.ajax({
        url: "http://localhost:8080/backEnd/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res){
            if (res.status == 200){
                alert(res.message);
                resetItem();
                loadAllItem();
            } else if (res.status == 400){
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

$("#btnItemSearch").click(function (){
    let itemCode = $("#txtSearchItemCode").val();
    $("#itemTable").empty();
    $.ajax({
        url:"http://localhost:8080/backEnd/item?option=SEARCH&iCode=" + itemCode,
        method:"GET",
        success:function (resp){
            let row = `<tr><td>${resp.itemCode}</td><td>${resp.name}</td><td>${resp.qtyOnHand}</td><td>${resp.price}</td></tr>`;
            $("#itemTable").append(row);
            bindClickEvent();
        }
    });
});

$("#btnItemDelete").click(function (){
    let itemCode = $("#txtItemId").val();

    $.ajax({
        url: "http://localhost:8080/backEnd/item?txtItemId=" + itemCode,
        method: "DELETE",

        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                resetItem();
                loadAllItem();
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

function bindClickEvent() {
    $("#itemTable>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qtyOnHand = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#txtItemId").val(id);
        $("#txtItemName").val(name);
        $("#txtQty").val(qtyOnHand);
        $("#txtPrice").val(price);
    });
}




//-------------------Validation -------------

const itemCodeRegEx = /^(I00-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const itemQuantityRegEx = /^[0-9]{2,}$/;
const itemPriceRegEx = /^[0-9]{2,}$/;

$('#txtItemId,#txtItemName,#txtQty,#txtPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
    formValid();
});

$('#txtItemId,#txtItemName,#txtQty,#txtPrice').on('blur', function () {
    formValid();
});

$("#txtItemId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#txtItemId").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#txtItemId").val(srcItem.getItemCode());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtQty").val(srcItem.getItemQuantity());
        $("#txtPrice").val(srcItem.getItemPrice());
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtQty").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnItem").attr('disabled', true);

function clearAll() {
    $('#txtItemId,#txtItemName,#txtQty,#txtPrice').val("");
    $('#txtItemId,#txtItemName,#txtQty,#txtPrice').css('border', '2px solid #ced4da');
    $('#txtItemId').focus();
    $("#btnItem").attr('disabled', true);
    $("#lblitemcode,#lblitemname,#lblitemquantity,#lblitemprice").text("");
}


function formValid() {
    var itemCode = $("#txtItemId").val();
    $("#txtItemId").css('border', '2px solid green');
    $("#lblitemcode").text("");
    if (itemCodeRegEx.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblitemname").text("");
            var itemQty = $("#txtQty").val();
            if (itemQuantityRegEx.test(itemQty)) {
                var itemPrice = $("#txtPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                $("#txtQty").css('border', '2px solid green');
                $("#lblitemquantity").text("");
                if (resp) {
                    $("#txtPrice").css('border', '2px solid green');
                    $("#lblitemprice").text("");
                    return true;
                } else {
                    $("#txtPrice").css('border', '2px solid red');
                    $("#lblitemprice").text("Item Price is a required field : Mimum 3");
                    return false;
                }
            } else {
                $("#txtQty").css('border', '2px solid red');
                $("#lblitemquantity").text("Item qty is a required field : Pattern 500g or 1kg");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblitemname").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemId").css('border', '2px solid red');
        $("#lblitemcode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfValid() {
    var itemCode = $("#txtItemId").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtQty").focus();
            var itemQty = $("#txtQty").val();
            if (itemQuantityRegEx.test(itemQty)) {
                $("#txtPrice").focus();
                var itemPrice = $("#txtPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        clearAll();
                    }
                } else {
                    $("#txtPrice").focus();
                }
            } else {
                $("#txtQty").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemId").focus();
    }
}


function setButton() {
    let b = formValid();
    if (b) {
        $("#btnItem").attr('disabled', false);
    } else {
        $("#btnItem").attr('disabled', true);
    }
}

$('#btnItem').click(function () {
    checkIfValid();
});