function loadTable(response){

    objList= response.data
    console.log(objList)
    let table = "";
    for(let [idx, item] of objList.entries()){
        table += `
        <tr>
            <td>${item.nome}</td>
            <td>${item.cognome}</td>
            
            <td>
                <button type="button" class="btn btn-danger" onclick="addCaffe('${item.unicode}',false)">-</button>
                ${item.numeroCaffe}
                <button type="button" class="btn btn-danger" onclick="addCaffe('${item.unicode}',true)">+</button>
            </td>

            <td>
                <button type="button" class="btn btn-danger" onclick="addMultiplicator('${item.unicode}'false)">-</button>
                ${item.moltiplicatore}
                <button type="button" class="btn btn-danger" onclick="addMultiplicator('${item.unicode}'true)">+</button>
            </td>

        </tr>
        `;
    }

    document.getElementById("table").innerHTML = table;
}

function modifica(varId){

    $.ajax(
        {
            url: `http://localhost:8085/studente/${varId}`,
            type: "GET",
            success: function(risultato){

                $("#updateNominativo").val(risultato.nominativo)
                $("#updateMatricola").val(risultato.matricola)
                $("#exampleModalLabel").text(risultato.matricola)
                $("#pulsanteModifica").data('id', risultato.id)

                $("#exampleModal").modal('show');
            },
            error: function(errore){
                
            }
        }
    );

}

function effettuaModifica(varThis){
    let id = $(varThis).data('id')
    let nomi = $("#updateNominativo").val()
    let matr = $("#updateMatricola").val()

    $.ajax(
        {
            url: `http://localhost:8085/studente/${id}`,
            type: "PUT",
            data: JSON.stringify({
                nominativo: nomi,
                matricola: matr
            }),
            contentType: "application/json",
            dataType: 'json',
            success: function(risultato){

                alert("Stappooooooooo")

                $("#exampleModal").modal('hide');
                stampa()
            },
            error: function(errore){
                
                alert("errore")
            }
        }
    );

}

function elimina(varId){
    $.ajax({
        url: `http://localhost:8085/studente/${varId}`,
        type: "DELETE",
        success: function(risultato){
            if(risultato){
                alert("Stappoooooooooooo");
                stampa();
            }
            else
                alert("Errore")
        },
        error: function(errore){
            alert("Errore")
        }
    });
}



function inserisci(){
    let nomi = $("#inputNominativo").val();
    let matr = $("#inputMatricola").val();

    $.ajax({
        url: "http://localhost:8085/studente",
        type: "POST",
        data: JSON.stringify({
            nominativo: nomi,
            matricola: matr
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function(risultato){
            if(risultato){
                alert("Stappoooooooooooo");
                stampa();
            }
            else
                alert("Errore")
        },
        error: function(errore){
            alert("Errore")
        }
    })
}

function stampa(){

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
    
        $("#updateButton").click(() => {
            inserisci();
        })

        stampa();

    }
)