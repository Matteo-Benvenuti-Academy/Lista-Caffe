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
                
                <button type="button" class="btn btn-prymary" onclick="addCaffe('${item.unicode}',false)">
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-minus" ></i> 
                </button>
                
                <span class="mx-3" >
                    ${item.numeroCaffe}
                </span>
                
                <button type="button" class="btn btn-prymary" onclick="addCaffe('${item.unicode}',true)"> 
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-plus"></i> 
                </button>

            </td>

            <td class = "text-center">
                <button type="button" class="btn btn-prymary" onclick="addMultiplicator('${item.unicode}'false)">
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-minus" ></i>
                </button>
                
                <span class="mx-3" >
                    ${item.moltiplicatore}
                </span>
                
                <button type="button" class="btn btn-prymary" onclick="addMultiplicator('${item.unicode}'true)"> 
                    <i class=" d-flex justify-content-center align-items-center fa-solid fa-plus"></i> 
                </button>
            </td>

            <td class = "text-center">

            <button type="button" class="btn btn-prymary" onclick="remove('${item.unicode}'false)">
                <i class= "fa-solid fa-trash" ></i>
            </button>
            <button type="button" class="btn btn-prymary" onclick="update('${item.unicode}'true)"> 
                <i class="fa-solid fa-pencil"></i> 
            </button>

            </td>

        </tr>
        `;
    }

    document.getElementById("table").innerHTML = table;
}



// function modifica(varId){

//     $.ajax(
//         {
//             url: `http://localhost:8085/studente/${varId}`,
//             type: "GET",
//             success: function(risultato){

//                 $("#updateNominativo").val(risultato.nominativo)
//                 $("#updateMatricola").val(risultato.matricola)
//                 $("#exampleModalLabel").text(risultato.matricola)
//                 $("#pulsanteModifica").data('id', risultato.id)

//                 $("#exampleModal").modal('show');
//             },
//             error: function(errore){
                
//             }
//         }
//     );

// }

// function elimina(varId){
//     $.ajax({
//         url: `http://localhost:8085/studente/${varId}`,
//         type: "DELETE",
//         success: function(risultato){
//             if(risultato){
//                 stampa();
//             }
//             else
//                 alert("Errore")
//         },
//         error: function(errore){
//             alert("Errore")
//         }
//     });
// }

// function effettuaModifica(varThis){
//     let id = $(varThis).data('id')
//     let nomi = $("#updateNominativo").val()
//     let matr = $("#updateMatricola").val()

//     $.ajax(
//         {
//             url: `http://localhost:8085/studente/${id}`,
//             type: "PUT",
//             data: JSON.stringify({
//                 nominativo: nomi,
//                 matricola: matr
//             }),
//             contentType: "application/json",
//             dataType: 'json',
//             success: function(risultato){

//                 alert("Stappooooooooo")

//                 $("#exampleModal").modal('hide');
//                 stampa()
//             },
//             error: function(errore){
                
//                 alert("errore")
//             }
//         }
//     );

// }

function insert(){
    let nome = $("#inputNome").val();
    let cognome = $("#inputCognome").val();
    
    $.ajax({
        url: "http://localhost:8080/ListaCaffe",
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
                $("#errorBanner").css('display', 'none');
                $("#inputNome").val("");
                $("#inputCognome").val("");
                $("#exampleModal").modal('hide');
                refresh();
            }
            else{
                $("#errorBanner").text("Inserimento non riuscito!");
                $("#errorBanner").css('display', 'block');
            }
                
        },
        error: function(errore){
            console.log(errore)
            $("#errorBanner").val("Errore! Riprova");
            $("#errorBanner").css('display', 'block');
        }
    })
}

function showInsertModal(){
    $("#exampleModal").modal('show');
}

function refresh(){
    $.ajax(
        {
            url: "http://localhost:8080/ListaCaffe",
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

        // setInterval(() => {
        //     refresh();
        // },1000)
    }
)
