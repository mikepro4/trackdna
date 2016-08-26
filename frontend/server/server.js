import express from 'express'
import path from 'path'
import fs from 'fs'
import thunk from 'redux-thunk'
import { match } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'react-router/lib/createMemoryHistory'
import routes from '../app/routes'
import reducers from '../app/reducers'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react'
import serialize from 'serialize-javascript'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import 'isomorphic-fetch'
import Helmet from 'react-helmet';
import _ from 'lodash'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname, '..', 'static')));
console.log('SSR', process.env.SSR)
console.log('SERVER_LOAD_DATA', process.env.SERVER_LOAD_DATA)
const templatePath = path.join(__dirname, 'index.html');
const templateSource = fs.readFileSync(templatePath, { encoding: 'utf-8' });
const template = _.template(templateSource);


app.get('*',(req, res) => {
        res.status(200).send('Hi')
})

app.listen(3000, () => console.log('running'))
