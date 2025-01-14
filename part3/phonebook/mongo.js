const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    phonenumber: String,
})

const Person = mongoose.model('Person', personSchema)

getAll = (password) => {
    mongoose.set('strictQuery', false)
    const url =
        `mongodb+srv://firewill:${password}@clusterbase.dq9i0.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=ClusterBase`
    mongoose.connect(url)

    console.log('phonebook')
    Person.find({}).then(result => {
            result.forEach(note => {
            console.log(`${note.name} ${note.phonenumber}`)
        })
        mongoose.connection.close()
    })
}

addNumber = (password, name, phonenumber) => {
    mongoose.set('strictQuery', false)
    const url =
        `mongodb+srv://firewill:${password}@clusterbase.dq9i0.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=ClusterBase`
    mongoose.connect(url)

    const person = new Person({
        name,
        phonenumber,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    getAll(process.argv[2])
} else if (process.argv.length === 5) {
    addNumber(process.argv[2], process.argv[3], process.argv[4])
} else {
    console.log('give password and/or name and phone number as arguments')
    process.exit(1)
}