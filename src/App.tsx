import './App.css'
import useCoai from './hooks/use-coai'
import { CoaiState } from './coai'

function App() {

  const { image, updateState } = useCoai()

  return (
    <>
      <div style={{display: 'flex', gap: '10px'}}>
        <button onClick={() => updateState(CoaiState.NEUTRAL)}>NEUTRAL</button>
        <button onClick={() => updateState(CoaiState.HAPPY)}>HAPPY</button>
        <button onClick={() => updateState(CoaiState.ANGRY)}>ANGRY</button>
        <button onClick={() => updateState(CoaiState.SICK)}>SICK</button>
        <button onClick={() => updateState(CoaiState.POOPY)}>POOPY</button>
        <button onClick={() => updateState(CoaiState.EXCITED)}>EXCITED</button>
        <button onClick={() => updateState(CoaiState.SHY)}>SHY</button>
      </div>
      
      <div style={{ height: '50px' }}></div>

      <img src={image.url} alt={image.description} style={{ width: '200px', height: 'auto', filter: 'invert(1)' }} />
    </>
  )
}

export default App
