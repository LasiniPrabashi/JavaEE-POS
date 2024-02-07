let customer = document.querySelector("#CustomerFormManage");
let item = document.querySelector("#ItemFormManage");
let order = document.querySelector("#orderManage");
let dash = document.querySelector("#Dashboard");
let OrderDetails = document.querySelector("#orderDetails");

customer.style.display ='none';
item.style.display ='none';
order.style.display ='none';
OrderDetails.style.display= 'none';
dash.style.display = 'block';

let lnkHome = document.querySelector("#home");
let lnkOrder = document.querySelector("#orders");
let lnkCustForm =document.querySelector("#custForm");
let lnkIForm =document.querySelector("#IForm");
let lnkOrderDetail = document.querySelector("#OForm");

lnkOrderDetail.addEventListener("click",function (){
    customer.style.display ='none';
    item.style.display ='none';
    order.style.display ='none';
    OrderDetails.style.display= 'block';
    dash.style.display = 'none';
})

lnkCustForm.addEventListener("click",function (){
    customer.style.display ='block';
    item.style.display ='none';
    order.style.display ='none';
    OrderDetails.style.display= 'none';
    dash.style.display = 'none';
})

lnkIForm.addEventListener("click",function (){
    customer.style.display ='none';
    item.style.display ='block';
    order.style.display ='none';
    OrderDetails.style.display= 'none';
    dash.style.display = 'none';
})

lnkHome.addEventListener("click",function (){
    customer.style.display ='none';
    item.style.display ='none';
    order.style.display ='none';
    OrderDetails.style.display= 'none';
    dash.style.display = 'block';
})

lnkOrder.addEventListener("click",function (){
    order.style.display = 'block';
    customer.style.display ='none';
    item.style.display ='none';
    OrderDetails.style.display= 'none';
    dash.style.display = 'none';

    loadItemComboBoxData();
    loadCustomerComboBoxData();

    loadAllOrders();
    bindOrderDetailsClickEvent();
    // loadAllCusID();
    // loadAllItemID();
    // setOrderId();
    // setDate();
})

function cusCount(){
    var arrayLength = customerDB.length;
    $('#cusCount').text(arrayLength);
}