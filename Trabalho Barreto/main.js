const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_fornecedor')) ?? []
const setLocalStorage = (db_fornecedor) => localStorage.setItem("db_fornecedor", JSON.stringify(db_fornecedor))

// CRUD
const deletefornecedor = (index) => {
    const db_fornecedor = readfornecedor()
    db_fornecedor.splice(index, 1)
    setLocalStorage(db_fornecedor)
}

const updatefornecedor = (index, fornecedor) => {
    const db_fornecedor = readfornecedor()
    db_fornecedor[index] = fornecedor
    setLocalStorage(db_fornecedor)
}

const readfornecedor = () => getLocalStorage()

const createfornecedor = (fornecedor) => {
    const db_fornecedor = getLocalStorage()
    db_fornecedor.push (fornecedor)
    setLocalStorage(db_fornecedor)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('descricao').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo fornecedor'
}

const savefornecedor = () => {
    if (isValidFields()) {
        const fornecedor = {
            descricao: document.getElementById('descricao').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
        }
        const index = document.getElementById('descricao').dataset.index
        if (index == 'new') {
            createfornecedor(fornecedor)
            updateTable()
            closeModal()
        } else {
            updatefornecedor(index, fornecedor)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (fornecedor, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${fornecedor.descricao}</td>
        <td>${fornecedor.telefone}</td>
        <td>${fornecedor.email}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tablefornecedor>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablefornecedor>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const db_fornecedor = readfornecedor()
    clearTable()
    db_fornecedor.forEach(createRow)
}

const fillFields = (fornecedor) => {
    document.getElementById('descricao').value = fornecedor.descricao
    document.getElementById('telefone').value = fornecedor.telefone
    document.getElementById('email').value = fornecedor.email
}

const editfornecedor = (index) => {
    const fornecedor = readfornecedor()[index]
    fornecedor.index = index
    fillFields(fornecedor)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${fornecedor.descricao}`
    openModal()
}

const editaDeleta = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editfornecedor(index)
        } else {
            const fornecedor = readfornecedor()[index]
            const response = confirm(`Deseja realmente excluir o fornecedor ${fornecedor.descricao}`)
            if (response) {
                deletefornecedor(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarfornecedor')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', savefornecedor)

document.querySelector('#tablefornecedor>tbody')
    .addEventListener('click', editaDeleta)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)