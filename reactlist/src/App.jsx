import { useEffect, useState } from "react";
import "./App.css";
import delet from "./assets/mdi_trash.svg";
import edit from "./assets/tabler_edit.svg";
import axios from "axios";
import Alerta from "./components/Alerta/Alerta";

function App() {
  const [task, setTask] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getTask = async () => {
    try {
      const retornoApi = await axios.get("http://localhost:3000/taskpoint");
      const data = retornoApi.data;
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskById = async (id) => {
    Alerta({
      title: "Em desenvolvimento",
      text: `Funcao em desenvolvimento ${id}`,
      icon: "info",
    });
  };

  const postTask = async (e) => {
    e.preventDefault();
    if (taskValue.trim().length == 0) {
      Alerta({
        title: "Erro",
        text: "Por gentileza, digite uma tarefa válida.",
        icon: "error",
      });
      return false;
    }

    try {
      const retornoAPI = await axios.post("http://localhost:3000/taskpoint", {
        descricao: taskValue,
      });

      setTaskValue(""); //limpa o campo do formulario (input)
      getTask();
      Alerta({
        title: "Sucesso",
        text: "Tarefa adicionada com sucesso!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const putTask = (item) => {
    setTaskValue(item.descricao);
    setEditItem(item);
    setEditMode(true);
  };

  const confirmPutTask = async (e) => {
    e.preventDefault();

    const result = await Alerta({
      title: "Confirmar alteração",
      text: `Alterar tarefa para "${taskValue}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed || taskValue.trim().length == 0) {
      Alerta({
        title: "Erro",
        text: "Por gentileza, digite uma tarefa válida.",
        icon: "error",
      });
      return false;
    }

    try {
      const retornoAPI = await axios.put(
        `http://localhost:3000/taskpoint/${editItem.id}`,
        { descricao: taskValue },
      );
      Alerta({
        title: "Sucesso",
        text: "Tarefa atualizada com sucesso!",
        icon: "success",
      });
      setEditMode(false);
      setEditItem(null);
      setTaskValue("");
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    const result = await Alerta({
      title: "Confirmação",
      text: "Tem certeza que deseja apagar a tarefa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, apagar",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) {
      return false;
    }

    try {
      const retornoAPI = await axios.delete(
        `http://localhost:3000/taskpoint/${id}`,
      );
      getTask();
      Alerta({
        title: "Sucesso",
        text: "Tarefa apagada com sucesso!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">Todo List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task" onSubmit={editMode ? confirmPutTask : postTask}>
          <input
            className="card-task__entry"
            type="text"
            placeholder="Adicione uma tarefa"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />
          <button className="card-task__btn-confirm">
            {editMode ? "Salvar" : "Adicionar"}
          </button>
          {editMode && (
            <button
              className="card-task__btn-confirm"
              type="button"
              onClick={() => {
                setEditMode(false);
                setEditItem(null);
                setTaskValue("");
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        <section className="cardlist">
          {task.map((t) => (
            <article className="cardtask" key={t.id}>
              <p>{t.descricao}</p>
              <div className="cardtask__actions">
                <button
                  className="cardtask__btn cardtask__btn--edit"
                  onClick={() => putTask(t)}
                >
                  <img src={edit} alt="Editar" />
                </button>
                <button // o edu fala dm
                  className="cardtask__btn cardtask__btn--delete"
                  onClick={() => deleteTask(t.id)}
                >
                  <img src={delet} alt="Excluir" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer-list">
        <p className="footer-list__right-text">
          2026 React List - todos os direitos reservados
        </p>
      </footer>
    </>
  );
}

export default App;