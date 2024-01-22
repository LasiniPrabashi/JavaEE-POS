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

// function loadAllCustomer(){
//     $("#tblCustomer").empty();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer?option=GETALL",
//         method: "GET",
//         success: function (resp) {
//             for (const customer of resp.data){
//                 let row = <tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>;
//                 $("#tblCustomer").append(row);
//             }
//             bindClickEvents();
//         }
//     });
// }