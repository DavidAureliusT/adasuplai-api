// const http = require('http')
const app = require("./app")

const port = 3000

// const server = http.createServer() // <- require listener to start a server 

app.listen(process.env.PORT || port, () => {
    console.log("AdaSuplai Server is running!")
})

app.get("/", (req, res) => {
    res.send("This is AdaSuplai Server - Online")
})