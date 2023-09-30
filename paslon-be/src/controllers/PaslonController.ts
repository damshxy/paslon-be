import { Request, Response } from "express";
import PaslonService from "../services/PaslonService";

export default new class TodoController {
  find(req: Request, res: Response) {
    PaslonService.find(req, res)
  }

  findOne(req: Request, res: Response) {
    PaslonService.findOne(req, res)
  }

  create(req: Request, res: Response) {
    PaslonService.create(req, res)
  }

  update(req: Request, res: Response) {
    PaslonService.update(req, res)
  }

  delete(req: Request, res: Response) {
    PaslonService.delete(req, res)
  }
}