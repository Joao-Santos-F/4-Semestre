import { useState } from 'react'
import './App.css'
import VectorIcon2 from './assets/tabler_edit.svg'
import VectorIcon from './assets/mdi_trash.svg'

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Estudar componentes em React' },
    { id: 2, texto: 'Estudar propriedades em React' },
    { id: 3, texto: 'Estudar estados em React' },
    { id: 4, texto: 'Criar meu app de ToDo List com React!' },
    { id: 5, texto: 'Fazer revisão para React Native' },
  ])
  const [novaTarefa, setNovaTarefa] = useState('')

  function adicionarTarefa() {
    if (novaTarefa.trim() === '') return
    setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa }])
    setNovaTarefa('')
  }

  function excluirTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
  }

  function editarTarefa(id) {
    const novoTexto = prompt('Editar tarefa:')
    if (!novoTexto) return
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, texto: novoTexto } : tarefa
      )
    )
  }

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">Todo List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task" onSubmit={(e) => e.preventDefault()}>
          <input
            className="card-task__entry"
            type="text"
            placeholder="Adicione uma tarefa"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
          <button className="card-task__btn-confirm" onClick={adicionarTarefa}>
            Adicionar
          </button>
        </form>

        <section className="cardlist">
          {tarefas.map((tarefa) => (
            <article className="cardtask" key={tarefa.id}>
              <p>{tarefa.texto}</p>
              <div className="cardtask__actions">
                <button
                  className="cardtask__btn cardtask__btn--edit"
                  onClick={() => editarTarefa(tarefa.id)}>
                  <img src={VectorIcon2} alt="Editar" />
                </button>
                <button
                  className="cardtask__btn cardtask__btn--delete"
                  onClick={() => excluirTarefa(tarefa.id)}>
                  <img src={VectorIcon} alt="Excluir" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer-list">
        <p className="footer-list__right-text">2026 React List - todos os direitos reservados</p>
      </footer>
    </>
  )
}

export default App