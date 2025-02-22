import './App.css'
import useCoai from './hooks/use-coai'
import { Action } from './coai'

function App() {
  const { image, triggerAction } = useCoai()

  return (
    <>
      <div style={{display: 'flex', gap: '10px'}}>
        <button onClick={() => triggerAction(Action.PET)}>PET</button>
        <button onClick={() => triggerAction(Action.SCOLD)}>SCOLD</button>
      </div>
      
      <div style={{ height: '50px' }}></div>

      <h1> {image.url } </h1>
      <p> {image.description } </p>
    </>
  )
}

export default App
