import { Request, Response } from 'express';
import IOperation from '../interfaces/operation.interface';
import OperationService from '../services/operation.service';

export default class OperationController {
  public static getOperations = async (_req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const operations: IOperation[] = await OperationService.getOperations(id);

    res.status(200).json(operations);
  };
}
