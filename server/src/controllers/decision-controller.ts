import { Request, Response } from "express";
import DecisionService from "../service/decision-service";
import HttpException from "../exceptions/http-exception";


class DecisionController {
    private decisionService: DecisionService;

    constructor() {
        this.decisionService = new DecisionService();
    }

    async createDecision(req: Request, res: Response) {
        try {
            const decision = await this.decisionService.createDecision(req.user.id, req.body.title, req.body.description);
            res.status(201).json(decision);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

    async updateDecision(req: Request, res: Response) {
        try {
            const decision = await this.decisionService.updateDecision(parseInt(req.params.id), req.body.title, req.body.description);
            res.status(200).json(decision);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

    async deleteDecision(req: Request, res: Response) {
        try {
            await this.decisionService.deleteDecision(parseInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

    async showDecision(req: Request, res: Response) {
        try {
            const decision = await this.decisionService.showDecision(parseInt(req.params.id));
            res.status(200).json(decision);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

    async showAllDecisions(req: Request, res: Response) {
        try {
            const decisions = await this.decisionService.showAllDecisions(req.user.id);
            res.status(200).json(decisions);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

}


export default DecisionController;