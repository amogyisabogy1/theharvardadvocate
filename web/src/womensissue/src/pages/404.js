import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Navbar from '../components/sidenav'
import Footer from '../components/footer'


const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Navbar></Navbar>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist</p>

    <div class="linebreak" />
    <Footer />
  </Layout>
)

export default NotFoundPage
