//

let btn = document.getElementById('btn')

let id = document.getElementById('id')
let name = document.getElementById('name')
let date_repo = document.getElementById('date')

let row = document.getElementById('rows')


document.getElementById('btn').addEventListener('click', getData);



async function getData(){
    let user = document.getElementById('user').value
    //check if the user is empty
    if(user === ''){
        alert('please enter a user name')
        return
    }
    let url=`https://api.github.com/users/${user}/repos`
    clearTableExceptFirstRow();

    try{

        const response = await fetch(url)
        const data = await response.json()
    
        if(response.ok){
            console.log('response ok')
            // console.log(response)
            // console.log(data)
            //order the data by date
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            //print all repositories
            data.forEach(element => {
                //add all data to the table
                let newrow = document.createElement('tr')

                let newid = document.createElement('td')
                let newname = document.createElement('td')
                let newdate = document.createElement('td')

                newid.innerHTML = element.id
                newname.innerHTML = element.name
                newdate.innerHTML = element.created_at.slice(0,10)

                newrow.appendChild(newid)
                newrow.appendChild(newname)
                newrow.appendChild(newdate)
                
                row.appendChild(newrow)
            });
            //print the number of repositories
            document.getElementById('number').innerHTML = `you have  ${data.length} repositories`
        }else{
            console.log('response not ok', data.error.message)
        }
    }catch(error){
        alert('something went wrong or the user not found')
        console.log('error:',error)
        console.log(response)

    }
    
}

function clearTableExceptFirstRow() {
    

    if (!row) {
        console.error("Table body not found");
        return;
    }

    while (row.rows.length > 0) {
        row.deleteRow(0); 
    }
}



