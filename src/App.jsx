import "./config/connection"
import Layout from './components/Layout'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Initiate from "./components/Initiate."
import Tsx from "./components/Txs"

const App = () => {
  return (
    <div>
      <Layout>
      <Navbar/>
      <Home/>
      <Initiate/>
      <Tsx/>
      </Layout>
    </div>
  )
}

export default App