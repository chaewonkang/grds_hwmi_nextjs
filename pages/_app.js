import React from 'react'
import App from 'next/app'

class Layout extends React.Component {
  render () {
    const { children } = this.props
    return <div className='layout'>{children}</div>
  }
}

export default class MyApp extends App {

  componentDidCatch (error, errorInfo) {
    // console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
  
  render () {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}