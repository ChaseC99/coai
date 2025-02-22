import './App.css'
import useCoai from './hooks/use-coai'
import { CoaiState } from './coai'

function App() {

  const { image, updateState } = useCoai()

  return (
    <>
      <div style={{display: 'flex', gap: '10px'}}>
        <button onClick={() => updateState(CoaiState.HAPPY)}>PET</button>
        <button onClick={() => updateState(CoaiState.MAD)}>SCOLD</button>
      </div>
      
      <div style={{ height: '50px' }}></div>

      <h1> {image.url } </h1>
      <p> {image.description } </p>
    </>
  )
}

export default App
