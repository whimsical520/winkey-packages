import React from 'react'
import ReactDOM, { Root } from 'react-dom/client'
import { HashRouter, useRoutes } from 'react-router-dom'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import Home from '~@/pages/home'

import './index.scss'

const routes = [
  {
    path: '/',
    name: '主页',
    element: <Home />
  }
]

const Router = () => {
  const elm = useRoutes(routes)

  return elm
}

let root: Root

function render(props: any) {
  const { container } = props

  root = ReactDOM.createRoot(
    container ? container.querySelector('#app') : document.getElementById('app')
  )

  root.render(
    <HashRouter>
      <Router />
    </HashRouter>
    // <div>Hello World</div>
  )
}

renderWithQiankun({
  mount(props) {
    console.log('react18 mount')
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props: any) {
    console.log('react18 unmount')
    root.unmount()
  },
  update(props: any) {
    console.log('react18 update')
    console.log(props)
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
