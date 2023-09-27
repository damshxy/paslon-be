import * as express from "express"
import { AppDataSource } from "./data-source"
import router from "./routes"

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000


    app.use(express.json())
    app.use('/api/v1', router)


    app.listen(port, () => console.log(`Server running on port ${port}`))

}).catch(error => console.log(error))