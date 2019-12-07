let globalResult=null;
function insertTable(users) {
    users.forEach((user)=>{
        let table = document.getElementById('tab');
        table.insertAdjacentHTML('beforeend',
            `<tr class="addedRow">
            <td><img src="${user.avatar}" alt="" /></td>
            <td>${user.first_name+' '+user.last_name}</td>
            <td>
                <button class="btn" onclick="getUser(${user.id})">View</button>
                <button class="btn" onclick="confirmMsg(${user.id})">Delete</button>
            </td>
        </tr>`)
    });


}

function setpages(number,results) {
    let SPAN=document.getElementById('pages')
    for(let i=1;i<=number;i++){
        SPAN.insertAdjacentHTML("beforeend",`<button class="pn btn" onclick="getUsers(${i})">${i}</button>`)
    }
    }


function setHtml() {
    let container = document.getElementById("tab");
    let elements = container.getElementsByClassName("addedRow");
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

let getUsers= (page=1)=>{
    setHtml()
    let SPAN = document.getElementById("pages");
    let pageNum = SPAN.getElementsByClassName("pn btn");
    while (pageNum[0]) {
        pageNum[0].parentNode.removeChild(pageNum[0]);
    }
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == 200) {
            total_pages=JSON.parse(xhr.response)['total_pages']
            results=JSON.parse(xhr.response)['data']
            insertTable(results)
            globalResult=results
            console.log(results)
           setpages(total_pages,results)
            return results;
        }
    };
    xhr.onerror=(err)=>{
        alert(err)
    }
    xhr.open('GET', 'https://reqres.in/api/users?page='+page);
    xhr.send();
}
let getUser= (id)=>{
    const  URL='https://reqres.in/api/users/'+id
    console.log(URL)
    let queryString = "?id="+id;
    window.location.href = "showUser.html" + queryString;
}
function confirmMsg(id){
    let result = confirm("Do you Want to delete user?");
    if (result) {
        deleteUser(id)
    }
    return
}
let deleteUser= (id)=>{
    console.log(id)
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        try {
            if (xhr.status == 204) {
                // total_pages=JSON.parse(xhr.response)['total_pages']
                //results=JSON.parse(xhr.response)['data']
                let result = globalResult.filter(user => {
                    return user.id !== id
                })
                console.log(result)
                setHtml()
                alert("User Deleted Successfully")
                insertTable(result)

                console.log(results);
            }
        }
        catch (e) {
            alert(e.message)

        }

    };
    xhr.onerror=(err)=>{
        alert(err)
    }
    xhr.open('DELETE', 'https://reqres.in/api/users/'+id);
    xhr.send();
}

//getUsers(1)
getUsers(1)
//deleteUser(1)
