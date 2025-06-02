import HttpException from "../exceptions/http-exception";
import DecisionRepository from "../repository/decision-repository";


export default class DecisionService {

    private decisionRepository: DecisionRepository;

    constructor() {
        this.decisionRepository = new DecisionRepository();
    }


    async createDecision(userId: number, title: string, description?: string) {
        const client = await this.decisionRepository.beginTransaction();

        try {
            const decision = await this.decisionRepository.create(userId, title, description ?? null, client);
            await this.decisionRepository.commitTransaction(client);
            return decision;

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await this.decisionRepository.rollbackTransaction(client);
            throw new HttpException(500, (error as Error).message);
        }
    }

    async updateDecision(id: number, title?: string, description?: string) {
        const client = await this.decisionRepository.beginTransaction();
        try {
            const decision = await this.decisionRepository.update(client, id, title, description);
            await this.decisionRepository.commitTransaction(client);
            return decision;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await this.decisionRepository.rollbackTransaction(client);
            throw new HttpException(500, (error as Error).message);
        }
    }

    async deleteDecision(id: number) {
        const client = await this.decisionRepository.beginTransaction();
        try {
            await this.decisionRepository.delete(id);
            await this.decisionRepository.commitTransaction(client);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await this.decisionRepository.rollbackTransaction(client);
            throw new HttpException(500, (error as Error).message);
        }
    }

    async showDecision(id: number) {
        const client = await this.decisionRepository.beginTransaction();
        try {
            const decision = await this.decisionRepository.findById(id);
            await this.decisionRepository.commitTransaction(client);
            return decision;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await this.decisionRepository.rollbackTransaction(client);
            throw new HttpException(500, (error as Error).message);
        }
    }

    async showAllDecisions(userId: number) {
        const client = await this.decisionRepository.beginTransaction();
        try {
            const decisions = await this.decisionRepository.findByUserId(userId);
            await this.decisionRepository.commitTransaction(client);
            return decisions;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await this.decisionRepository.rollbackTransaction(client);
            throw new HttpException(500, (error as Error).message);
        }
    }
}