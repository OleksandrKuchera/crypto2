const fs = require('fs')
const crypto = require('crypto')
const path = require('path'); // для завданя з *

const cipherData = fs.readFileSync('./key.json')
const { key, algorithm } = JSON.parse(cipherData) // достаємо ключ

//1
function encryption(){

const iv = crypto.randomBytes(8).toString('hex') // вектор ініц
const cipher = crypto.createCipheriv(algorithm, key , iv) //обновляє шифр

const data = fs.readFileSync('./text.txt','utf8')// прочитаний файл

let crypted = cipher.update(data, 'utf-8', 'hex') 
crypted += cipher.final('hex')

const temp = `${crypted}:${iv}`
fs.writeFileSync('./text.txt',temp,(err) => {
    if (err) throw err;
})
    console.log('Зашифровано'); 
}


//2
function decrypted(){
const data = fs.readFileSync('./text.txt', 'utf8')// читаємо шифр
const [crypted,iv] = data.split(':') // деструктурз..

const decipher = crypto.createDecipheriv(algorithm, key , iv) //обновляє шифр

let decrypted = decipher.update(crypted, 'hex', 'utf8') 
decrypted += decipher.final('utf8')


fs.writeFileSync('./text.txt',decrypted,(err) => {
    if (err) throw err;
})
    console.log('Розшифровано'); 
}

//3*
function task3(){

    const iv = crypto.randomBytes(8).toString('hex') // вектор ініц
    const cipher = crypto.createCipheriv(algorithm, key , iv) //обновляє шифр
    
    const data = fs.readFileSync('./text1.txt','utf8')// прочитаний файл
    
    let crypted = cipher.update(data, 'utf-8', 'hex') 
    crypted += cipher.final('hex')
    
    const temp = `${crypted}:${iv}`
    const newFile = 'text1.enc';
    fs.writeFileSync(newFile,temp,(err) => {
        if (err) throw err;
    })
    fs.unlink("./text1.txt", () =>{})
        console.log('Зашифровано'); 

    }


//4*
function task4(){
    const data = fs.readFileSync('./text1.enc', 'utf8')// читаємо шифр
    const [crypted,iv] = data.split(':') // деструктурз..
    
    const decipher = crypto.createDecipheriv(algorithm, key , iv) //обновляє шифр
    
    let decrypted = decipher.update(crypted, 'hex', 'utf8') 
    decrypted += decipher.final('utf8')
    
    const newFile = 'text1.txt';
    fs.writeFileSync(newFile,decrypted,(err) => {
        if (err) throw err;
    })
    fs.unlink("./text1.enc", () =>{})
        console.log('Розшифровано'); 
    }
    


//Шифрувати (1)
//encryption()

//Розшифрувати (2) 
//decrypted()

//Шифрувати з txt в enc(3)
//task3()

//Розшифрувати з enc в txt(4) 
//task4()