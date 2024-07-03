
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}



const tempFornecedor = { 
    descricao: "Guilherme",
    email: "Guimiyamura98@gmail.com",
    telefone: "66999263699"
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (db_fornecedor) => localStorage.setItem("db_client", JSON.stringify(db_fornecedor) )

// CRUD 

const deleteFornecedor =(index) => {
    const db_fornecedor = readFornecedor()
    db_fornecedor.splice(index,1)
    setLocalStorage(db_fornecedor)
}

const updateFornecedor = (index, fornecedor) => {
    const db_fornecedor = readFornecedor()
    db_fornecedor[index] = fornecedor
    setLocalStorage(db_fornecedor)
}

const readFornecedor = () => getLocalStorage()

//CRUD - CREATE
const createFornecedor = (fornecedor) => {
    const db_fornecedor = getLocalStorage()
    db_fornecedor.push (fornecedor)
    setLocalStorage(db_fornecedor)

}

const isValidFields = () => {
   return document.getElementById('form').reportValidity()
}


const createRow = (fornecedor) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
                <td>${fornecedor.descricao}</td>
                <td>${fornecedor.email}</td>
                <td>${fornecedor.telefone}</td>
                <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                </td>
    `
    document.querySelector('#lista-fornecedores>table').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#lista-fornecedores>table tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
   const db_fornecedor = readFornecedor()
   clearTable()
   db_fornecedor.forEach(createRow)
}

updateTable()


//Interação Layout
const saveFornecedor = () => {
    if (isValidFields()) {
        const fornecedor = {
            descricao: document.getElementById('descricao').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value
        }
        createFornecedor(fornecedor)
        updateTable()
    }
}

//Eventos

document.getElementById('salvar')
    .addEventListener('click', saveFornecedor)