function loadTable(response){

    objList= response.data
    console.log(objList)
    let table = "";
    for(let [idx, item] of objList.entries()){
        table += `
        <tr>
            <td class = "text-center">${item.nome}</td>
            <td class = "text-center" >${item.cognome}</td>
            
            <td class = "text-center">
                
                <button type="button" class="btn btn-prymary" onclick="removeCaffe('${item.uniquecode}',false)">
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-minus" ></i> 
                </button>
                
                <span class="mx-3 myNumber" >
                    ${item.numeroCaffe}
                </span>
                
                <button type="button" class="btn btn-prymary" onclick="addCaffe('${item.uniquecode}',true)"> 
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-plus"></i> 
                </button>

            </td>

            <td class = "text-center">
                <button type="button" class="btn btn-prymary" onclick="removeMultiplicator('${item.uniquecode}',false)">
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-minus" ></i>
                </button>
                
                <span class="mx-3 myNumber" >
                    ${item.moltiplicatore}
                </span>
                
                <button type="button" class="btn btn-prymary" onclick="addMultiplicator('${item.uniquecode}',true)"> 
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-plus"></i> 
                </button>
            </td>

            <td class = "text-center">

            <button type="button" class="btn btn-prymary" onclick="remove('${item.uniquecode}')">
                <i class= "fa-solid fa-trash" ></i>
            </button>
            <button type="button" class="btn btn-prymary" onclick="showUpdateModal('${item.uniquecode}')"> 
                <i class="fa-solid fa-pencil"></i> 
            </button>

            </td>

        </tr>
        `;
    }

    document.getElementById("table").innerHTML = table;
}



function showUpdateModal(uniquecode){

    $.ajax(
        {
            url: `http://172.16.237.206:8080/listacaffe/${uniquecode}`,
            type: "GET",
            success: function(result){
                if( result.status === "ok"){
                    let data = result.data
                    $("#updateNome").val(data.nome)
                    $("#updateCognome").val(data.cognome)
                    $("#updateCodice").val(data.uniquecode)
                    $("#modalUpdateButton").data('uniqueCode', data.uniquecode)
                    $("#updateModal").modal('show');
                }else{
                    errorAllert("Ops...","Impossibile effettuare la modifica!")
                }
            },
            error: function(errore){
                errorAllert("Ops...","Impossibile effettuare la modifica!")
            }
        }
    );

}


function update(varThis){
    let uniquecode = $(varThis).data('uniqueCode')
    let nome = $("#updateNome").val()
    let cognome = $("#updateCognome").val()
    $.ajax(
            {
                url: `http://172.16.237.206:8080/listacaffe/${uniquecode}`,
                type: "PUT",
                data: JSON.stringify({
                nome: nome,
                cognome: cognome,
                uniquecode: uniquecode
            }),
            contentType: "application/json",
            dataType: 'json',
            success: function(result){
                if(result.status === "ok"){
                    refresh();
                    $("#updateModal").modal('hide');
                }else{
                    $("#updateErrorBanner").text("Inserimento non riuscito!");
                    $("#updateErrorBanner").css('display', 'block');
                    succesAllert("Successo","Modifica riuscita")
                }
            },
            error: function(errore){
                console.log(errore)
                $("#updateErrorBanner").text("Inserimento non riuscito!");
                $("#updateErrorBanner").css('display', 'block');
            },
            }
    );
}
        
function remove(uniquecode){
    $.ajax({
        url: `http://172.16.237.206:8080/listacaffe/${uniquecode}`,
        type: "DELETE",
        success: function(response){
            let status = response.status
            if(status === "ok"){
                succesAllert("Successo","Eliminazione riuscita")
            }else{
                errorAllert("Ops...","Eleminazione non effettuata!")
            }
        },
        error: function(errore){
            console.log(errore)
            errorAllert("Ops...","Eleminazione non effettuata!")
        },
    });
}

function insert(){
    let nome = $("#inputNome").val();
    let cognome = $("#inputCognome").val();
    
    $.ajax({
        url: "http://172.16.237.206:8080/listacaffe",
        type: "POST",
        data: JSON.stringify({
            nome: nome,
            cognome: cognome
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function(response){
            let status = response.status
            if(status === "ok"){
                refresh();
                $("#insertErrorBanner").css('display', 'none');
                $("#inputNome").val("");
                $("#inputCognome").val("");
                $("#insertModal").modal('hide');
                succesAllert("Successo","Iserimento riuscito")
            }
            else{
                $("#insertErrorBanner").text("Inserimento non riuscito!");
                $("#insertErrorBanner").css('display', 'block');
            }
                
        },
        error: function(errore){
            console.log(errore)
            $("#insertErrorBanner").val("Errore! Riprova");
            $("#insertErrorBanner").css('display', 'block');
        },
    })
}

function removeCaffe(uniquecode){
    $.ajax({
        url: `http://172.16.237.206:8080/listacaffe/coffee/remove/${uniquecode}`,
        type: "GET",
        success: function(response){
            let status = response.status
            if(status === "ko"){
                errorAllert("Ops...","Impossibile rimuovere Caffe!")
            }
            refresh()
        },
        error: function(errore){
            console.log(errore)
            errorAllert("Ops...","Impossibile rimuovere Caffe!")
        },
    });
}

function addCaffe(uniquecode){
    $.ajax({
        url: `http://172.16.237.206:8080/listacaffe/coffee/add/${uniquecode}`,
        type: "GET",
        success: function(response){
            let status = response.status
            if(status === "ko"){
                console.log(response)
                errorAllert("Ops...","Impossibile aggiungere Caffe!")
            }
            refresh()
        },
        error: function(errore){
            console.log(errore)
            errorAllert("Ops...","Impossibile aggiungere Caffe!")
        },
    });
}


function removeMultiplicator(uniquecode){
    $.ajax({
        url: `http://172.16.237.206:8080/listacaffe/multiplier/remove/${uniquecode}`,
        type: "GET",
        success: function(response){
            let status = response.status
            if(status === "ko"){
                errorAllert("Ops...","Impossibile aggiungere Caffe!")
            }
            refresh()
        },
        error: function(errore){
            console.log(errore)
            errorAllert("Ops...","Impossibile aggiungere Caffe!")
        },
    });
}

function addMultiplicator(uniquecode){
    $.ajax({
        url: `http://172.16.237.206:8080/listacaffe/multiplier/add/${uniquecode}`,
        type: "GET",
        success: function(response){
            let status = response.status
            if(status === "ko"){
                errorAllert("Ops...","Impossibile aggiungere Caffe!")
            }
            refresh()
        },
        error: function(errore){
            console.log(errore)
            errorAllert("Ops...","Impossibile aggiungere Caffe!")
        },
    });
}

function showInsertModal(){
    $("#insertModal").modal('show');
}

function refresh(){
    $.ajax(
        {
            url: "http://172.16.237.206:8080/listacaffe",
            type: "GET",
            dataType: 'json',
            success: function(risultato){
                loadTable(risultato)
            },
            error: function(errore){
                console.log(errore)
            }
        }
    )
}

$(document).ready(
    function(){
    
        $("#insertButton").click(() => {
            startInsert();
        })
        
        refresh();

        setInterval(() => {
            refresh();
        },1000)
    }
)


function succesAllert(title,text){
    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
    })
}

function errorAllert(title,text){
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
      })
}