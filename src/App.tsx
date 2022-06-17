import './App.css'
import { Form } from './components/Form'
import { List } from './components/List'

function App() {
  return <div className="main">
    <div className="sub-main">
      <Form />
    </div>
    <div className="sub-main">
      <List />
    </div>
  </div>
}

export default App
