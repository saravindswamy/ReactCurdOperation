const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'youtube',
})

app.post('/create', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const salary = req.body.salary

  db.query(
    'INSERT INTO youtube.employees (name,age,country,position,salary) VALUES (?,?,?,?,?)',
    [name, age, country, position, salary],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    }
  )
})

app.get('/employees', (req, res) => {
  db.query('select * from youtube.employees', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put('/update', (req, res) => {
  console.log('console data', req.body)
  const id = req.body.id
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const salary = req.body.salary
  db.query(
    `update employees set name='${name}',age=${age},country='${country}',position='${position}',salary=${salary} where id=${id}`,
    [name, age, country, position, salary, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  db.query('delete from employees where id=?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(3001, () => {
  console.log('your server is running')
})
