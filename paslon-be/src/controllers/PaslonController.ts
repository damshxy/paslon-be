import { Request, Response } from "express";
import PaslonService from "../services/PaslonService";

export default new class TodoController {
  index(req: Request, res: Response) {
    PaslonService.index(req, res)
  }

  show(req: Request, res: Response) {
    PaslonService.show(req, res)
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