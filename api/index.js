import Express from "express";
import axios from 'axios'
const app = Express();

app.get("/repos", (req, res) => {
    axios
      .get("https://api.github.com/users/takenet/repos", {
          params: {
              'sort':'created',
              'direction':'asc'
          }
      })
      .then((response) => {
        const reposCsharp = [];
  
        response.data.filter((repo) => {
          if (repo["language"] == "C#") {
            reposCsharp.push({
              nome: repo["full_name"],
              descricao: repo.description,
              data: repo["created_at"],
              linguagem: repo.language,
              avatar:repo.owner['avatar_url']
            });
          }
        });
        return res.json(reposCsharp);
      })
      .catch((err) => console.error(err));
  });


app.listen(process.env.PORT || 8000, () => console.log("Running!🚀"));