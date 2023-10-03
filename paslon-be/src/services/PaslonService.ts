import { Repository } from "typeorm";
import { Paslons } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createTodoSchema } from "../utils/Paslon";
import { Request, Response } from "express"
import { UploadToCloudinary } from "../utils/Cloudinary";
import { deleteFile } from "../utils/FileHelper";

export default new class PaslonService {
  private readonly PaslonRepository: Repository<Paslons> = AppDataSource.getRepository(Paslons)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await this.PaslonRepository.find();
      if (paslons.length === 0) return res.status(404).json({ Error: "Paslon not found" });
      

      return res.status(200).json({ paslons }); 
    } catch (err) {
      return res.status(500).json({ Error: "Error while fetching data" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      
      const paslon = await this.PaslonRepository.find({ where: { id } });
      if (paslon.length === 0) return res.status(404).json({ Error: "Paslon not found" });
  
      return res.status(200).json({ paslon }); 
    } catch (err) {
      return res.status(500).json({ Error: "Error while fetching data" });
    }
  }
  

  async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;
			const { error } = createTodoSchema.validate(data);

			if (error) return res.status(400).json({ error: error });

			let image = "";
			if (req.file?.filename) {
				image = await UploadToCloudinary(req.file)
        deleteFile(req.file.path)
			}

			const obj = this.PaslonRepository.create({
				name: data.name,
				visi: data.visi,
				image: image,
			});
			const todos = this.PaslonRepository.save(obj);
			return res.status(200).json(todos);
		} catch (error) {
			return res.status(500).json({ error: "error while insterting data!" });
		}
	}

  async update(req: Request, res: Response): Promise<Response> {
    try {
        const id = parseInt(req.params.id); // Mengonversi id ke dalam tipe number
        const data = req.body;

        try {
            const existingPaslon = await this.PaslonRepository.findOneOrFail({ where: { id } });

            // Update data Paslon
            existingPaslon.name = data.name;
            existingPaslon.visi = data.visi;

            if (req.file?.filename) {
                // Jika ada file yang di-upload, update juga gambar
                const image = await UploadToCloudinary(req.file);
                // delete file from local server after save to cloudinary
                deleteFile(req.file.path);
                existingPaslon.image = image;
            }

            const updatedPaslon = await this.PaslonRepository.save(existingPaslon);

            return res.status(200).json(updatedPaslon);
        } catch (error) {
            return res.status(404).json({ Error: "Paslon not found" });
        }
    } catch (err) {
        return res.status(500).json({ Error: "Error while updating data" });
    }
}  

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { name, visi, image } = req.body

      const check = await this.PaslonRepository.findOne({ where: { id } });
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