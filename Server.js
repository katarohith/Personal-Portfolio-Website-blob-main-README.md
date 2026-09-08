const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://admin:admin123@ac-pk3909n-shard-00-00.ha74cub.mongodb.net:27017,ac-pk3909n-shard-00-01.ha74cub.mongodb.net:27017,ac-pk3909n-shard-00-02.ha74cub.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-14grrw-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

const Project = mongoose.model("Project", {
  title: String,
  description: String,
  github: String,
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/api/projects", async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

app.post("/api/projects", async (req, res) => {

  try {

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
    });

    await project.save();

    res.json({
      message: "Project Added Successfully",
      project,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

app.delete("/api/projects/:id", async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
