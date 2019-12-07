function showData(user) {
    let table = document.getElementById('tab');
    table.insertAdjacentHTML('beforeend',
        `<tr>
            <td><img src="${user.avatar}" alt="" /></td>
            <td>${user.first_name}</td>
             <td>${user.last_name}</td>
              <td>${user.email}</td>
        </tr>`)
}
let getUser= (id)=>{
    const  URL='https://reqres.in/api/users/'+id
    console.log(URL)
    window.location.href = "showUser.html"+URL;
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == 200) {
            // total_pages=JSON.parse(xhr.response)['total_pages']
            result=JSON.parse(xhr.response)['data']
            showData(result)
            console.log(result);
        }
    };
    xhr.onerror=(err)=>{
        alert(err)
    }
    xhr.open('GET',URL );
    xhr.send();
}
let queryString = decodeURIComponent(window.location.search);
let id =queryString.substring(4)
getUser(id)
