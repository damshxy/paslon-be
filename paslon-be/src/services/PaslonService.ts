import { Repository } from "typeorm";
import { Paslons } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createTodoSchema } from "../utils/Paslon";
import { Request, Response } from "express"

export default new class PaslonService {
  private readonly PaslonRepository: Repository<Paslons> = AppDataSource.getRepository(Paslons)

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await this.PaslonRepository.find();
      if (paslons.length === 0) return res.status(404).json({ Error: "Paslon not found" });
      

      return res.status(200).json({ paslons }); 
    } catch (err) {
      return res.status(500).json({ Error: "Error while fetching data" });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      
      const paslon = await this.PaslonRepository.find({ where: { id } });
      if (paslon.length === 0) return res.status(404).json({ Error: "Paslon not found" });
  
      return res.status(200).json({ paslon }); 
    } catch (err) {
      return res.status(500).json({ Error: "Error while fetching data" });
    }
  }
  

  async create(req: Request, res: Response) : Promise<Response> {
    try {
      const data = req.body

      const { error } = createTodoSchema.validate(data)
      if(error) return res.status(400).json({ error: error })

      const obj = this.PaslonRepository.create({
        name: data.name,
        visi: data.visi,
        image: data.image
      })

      const todos = this.PaslonRepository.save(obj)
      return res.status(200).json({ message: 'created successfully', todos})
    } catch (err) {
      return res.status(500).json({ Error: "error while insert data"})
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { name, visi, image } = req.body

      const check = await this.PaslonRepository.find({ where: { id } });
      if (!check) return res.status(404).json({ Error: "Paslon not found" });
      
      const data = {
        name,
        visi,
        image
      }
      
      const paslon = await this.PaslonRepository.update({ id }, data);
      return res.status(200).json({ message: 'updated successfully', paslon }); 
    } catch (err) {
      return res.status(500).json({ Error: "Error while fetching data" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { name, visi, image } = req.body

      const check = await this.PaslonRepository.find({ where: { id } });
      if (!check) return res.status(404).json({ Error: "Paslon not found" });
      
      const data = {
        name,
        visi,
        image
      }
      
      const paslon = await this.PaslonRepository.delete({ id });
      return res.status(200).json({ message: 'deleted successfully', paslon }); 
    } catch (err) {
      return res.status(500).json({ Error: "Error while fetching data" });
    }
  }

}