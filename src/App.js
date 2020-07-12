import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: 'https://github.com/oliveira-amanda/armazenar-repositorios',
      tech: 'ReactJS, ReactNative, NodeJS'
    })

    const repository = response.data

    setRepositories([ ...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repository = repositories.filter(repository => repository.id !== id)
    
    setRepositories(repository)
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
              <p>
                {repository.title}
              </p>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      <button type="button" onClick={handleAddRepository}>
          Adicionar
        </button>
    </div>
  );
}

export default App;
