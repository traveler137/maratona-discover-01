const modal = {
    open() {
        //Abrir modal
        //Adicionar a classe "active" ao modal
        document.querySelector(".modal-overlay").classList.add('active')

    },
    close() {
        //Fechar Modal
        //Remover a calse "active" do modal
        document.querySelector(".modal-overlay").classList.remove('active')

    }
}

const transactions =
    [
        {

            description: "Luz",
            amount: - 50020,
            date: "23/01/2021",
        },
        {

            description: "Website",
            amount: 251234,
            date: '23/01/2021',
        },
        {

            description: "Energia",
            amount: - 20000,
            date: '23/01/2021',
        }
    ]

const Transaction = {
    allTransactions: transactions,
    add(transaction) {
        Transaction.allTransactions.push(transaction)
        App.Reload()
    },

    remove(index) {
        Transaction.allTransactions.splice(index, 1)

        App.Reload()
    },

    incomes() {
        // somar entradas
        let income = 0
        Transaction.allTransactions.forEach(transactions => {
            if (transactions.amount > 0) {
                income += transactions.amount
            }

        })

        return (income)
    },

    expenses() {
        //somar as saidas


        let expense = 0
        Transaction.allTransactions.forEach(transactions => {
            if (transactions.amount < 0) {
                expense -= transactions.amount
            }

        })

        return (expense)
    },

    total() {
        //Entradas - saidas

        return (Transaction.incomes() - Transaction.expenses())
    }

}

const documentHTML = {

    transactionsContainer: document.querySelector('#data-table tbody'),


    addTransaction(transaction, index) {
        // console.log('Toaqui')
        const tr = document.createElement('tr')
        tr.innerHTML = documentHTML.innerHTMLTransaction(transaction)

        documentHTML.transactionsContainer.appendChild(tr)
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML
            = Utils.formatCurrency(Transaction.incomes()),

            document.getElementById('expenseDisplay').innerHTML
            = Utils.formatCurrency(Transaction.expenses()),
            document.getElementById('totalDisplay').innerHTML
            = Utils.formatCurrency(Transaction.total())
    },

    innerHTMLTransaction(transaction) {
        const cssClass = transaction['amount'] > 0 ? 'income' : 'expense'
        // const amount = Utils.formatCurrency(transaction['amount'])
        amount = Utils.formatCurrency(transaction['amount'])
        const html =
            `
        
            <td class='description'>${transaction["description"]}</td>
            <td class=${cssClass}>${amount}</td>
            <td class='date'>${transaction['date']}</td>
            <td><img src="./assets/minus.svg" alt="remover transação"></td>
        
        
        `
        return (html)
    },

    clearHTMLTransaction() {
        documentHTML.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const sinal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return (sinal + " " + value)

    },
    formatAmount(value){
        value = Number(value) *100
        return(value)

    },

    formatDate(date){
        const splitedDate = date.split("-")
        return(`${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`)

    }

}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),


    getValues() {
        return {
            amount: Form.amount.value,
            description: Form.description.value,
            date: Form.date.value
        }
    },
    validateFields() {
        const { amount, description, date } = Form.getValues()
        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "" ) {
            throw new Error("Preencha todos os campos!")
        }
    },


    formatData() { 
        let { amount, description, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }

    },
    saveTransaction( transaction ){
        Transaction.add(transaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""

    },
     

    submit(event) {
        event.preventDefault()
        try {
            // console.log(event)
            //Verificar se todas informações foram preenchidas
            Form.validateFields()
            //Formatar os dados
            const transaction = Form.formatData()
            //salvar os dados
            Form.saveTransaction(transaction)
            //apagar o os dados do formulário
            Form.clearFields()
            //Modal feche
            modal.close()


        } catch (error) {
            alert(error.message)

        }

    }
}

const App = {
    Init() {
        // documentHTML.addTransaction(transactions[1])
        Transaction.allTransactions.forEach(transaction => {
            documentHTML.addTransaction(transaction)
        })

        documentHTML.updateBalance()
    },
    Reload() {
        documentHTML.clearHTMLTransaction()
        App.Init()
    }
}



App.Init()

// Transaction.add()