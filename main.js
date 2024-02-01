var dienthoaiAPI = 'https://dummyjson.com/auth/RESOURCE'

// let ttDienThoai = []

const getDienThoai = (callback) => {
    fetch(dienthoaiAPI, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            // console.log(response)
            return response.json();
        })
        .then(data => data.products)
        .then(callback)
}

const deleteDienThoai = (id) => {
    fetch(dienthoaiAPI + id, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            return response.json();
        })
        .then(console.log)
        .then(() => getDienThoai(renderDienThoai))
}

const editDienThoai = (id, data, callback) => {
    fetch(dienthoaiAPI + id, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer /* YOUR_TOKEN_HERE */', },
        body: JSON.stringify(data)
    })
        .then((response) => {
            // console.log(response)
            return response.json();
        })
        .then(respn => console.log(respn))
        .then(data => data)
        //   .then(console.log)
        .then(callback)
}

const createDienThoai = (data, callback) => {
        fetch(dienthoaiAPI, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Authorization': 'Bearer /* YOUR_TOKEN_HERE */', },
          body: JSON.stringify(
            data
          )
        })
        .then(res => res.json())
        // .then(data => data.products)
        .then(data => console.log(data))
        .then(callback)
        .catch(error => console.error('Error:', error));
    }

const handlecreateDienThoai = () => {
    const createBtn = document.querySelector("#create")
    createBtn.onclick = (e) => {
        e.preventDefault()
        const valTitle = document.querySelector('#title').value
        const valDes = document.querySelector('#description').value
        const valPrice = document.querySelector('#price').value
        // const valDis = document.querySelector('#discountPercentage').value
        console.log(valTitle, valDes, valPrice)
        const formInput = {
            title: valTitle,
            description: valDes,
            price: valPrice,
            // discountPercentage: valDis
        }

        createDienThoai(formInput,getDienThoai(renderDienThoai))
    }
}

const handleEditDienThoai = (id) => {
    const row = document.querySelector(`#list-${id}`)
    const title = row.querySelector(`#td1-${id}`).innerText;
    const description = row.querySelector(`#td2-${id}`).innerText;
    const price = row.querySelector(`#td3-${id}`).innerText;
    // const discountPercentage = row.querySelector(`#td4-${id}`).innerText;
    console.log(title, description, price)

    // Hiển thị thông tin xuống form
    document.querySelector('#title').value = title;
    document.querySelector('#description').value = description;
    document.querySelector('#price').value = price;
    // document.querySelector('#discountPercentage').value = discountPercentage;

    const updateDt = document.querySelector(`#update-new-${id}`)
    updateDt.onclick = () => {
        const title_new = document.querySelector('#title').value
        const description_new = document.querySelector('#description').value
        const price_new = document.querySelector('#price').value
        // const discountPercentage_new = document.querySelector('#discountPercentage').value

        const formDt = {
            title: title_new,
            description: description_new,
            price: price_new,
            // discountPercentage: discountPercentage_new
        }

        editDienThoai(id, formDt, () => getDienThoai(renderDienThoai))
    }
}
// handleEditDienThoai()

const renderDienThoai = (dienthoai) => {
    let listPhone = document.querySelector('#list-phone')
    let htmls = dienthoai.map((val) => {
        return `
      <tr id="list-${val.id}">
          <td id="td1-${val.id}">${val.title}</td>
          <td id="td2-${val.id}">${val.description}</td>
          <td id="td3-${val.id}">${val.price}</td>
          <td>
              <button id="delete" onclick = deleteDienThoai(${val.id}) >Xóa</button>
              <button id="update" onclick = handleEditDienThoai(${val.id}) >Sửa</button>
              <button id="update-new-${val.id}">Update</button>
          </td>
      </tr>`
    })

    listPhone.innerHTML = htmls.join("")

}

const start = () => {
    getDienThoai(renderDienThoai)
    handlecreateDienThoai()
}
start()