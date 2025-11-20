
import { NextFunction, Request, Response } from "express";
import { BrayanService } from "../services/brayan.service";

export class BrayanController {
    constructor(private readonly brayanService: BrayanService) {}

    async findAllByUserId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id: userId } = req.body.user;
            const bookingRequests = await this.brayanService.findAllByUserId(userId);
            return res.status(200).json(bookingRequests);
        } catch (error) {
            next(error);
        }
    }
}
