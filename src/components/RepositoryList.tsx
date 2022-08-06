import { useEffect, useState } from "react";
import { RepositoryItem } from "./RepositoryItem";

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/JuanLuky/repos")
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  const filterRepos =
    search.length > 0
      ? repositories.filter((repo) => repo.name.includes(search))
      : [];

  return (
    <section className="RepositoryList">
      <h1>Lista de Repositórios</h1>

      <input
        type="text"
        name="search"
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <ul>
          {filterRepos.map((repository) => {
            return (
              <RepositoryItem key={repository.name} repository={repository} />
            );
          })}
        </ul>
      ) : (
        <ul>
          {repositories.map((repository) => {
            return (
              <RepositoryItem key={repository.name} repository={repository} />
            );
          })}
        </ul>
      )}
    </section>
  );
}
