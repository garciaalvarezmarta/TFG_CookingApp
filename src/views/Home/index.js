import React from 'react'
import Header from '../../components/Header'
import "./style.css"

function Home() {
  return (
    <div>
        <Header></Header>
        <main className='container'>
          <div className='col-12 mainContainer'>
            {/* nombre de la receta*/}
            <h1>Receta del mes</h1>
            <img src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/01/12/16420042054594.jpg" className='mainImg'  />
          </div>
        </main>
    </div>

  )
}

export default Home