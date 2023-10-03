import * as express from "express"
import { AppDataSource } from "./data-source"
import router from "./routes"
import * as dotenv from 'dotenv'

const customCors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true'); 
    next();
};

dotenv.config()

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = process.env.PORT
    
    app.use(customCors)
    app.use(express.json())
    app.use('/api/v1', router)


    app.listen(port, () => console.log(`Server running on port ${port}`))

}).catch(error => console.log(error))