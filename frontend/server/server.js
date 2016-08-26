import express from 'express'

let app = express()
app.get('*',(req, res) => {
    res.status(200).send('Hi')
})

app.listen(3000, () => console.log('running'))
