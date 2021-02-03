import { Model } from 'mongoose';
export declare class SequenceService {
    private readonly sequenceModel;
    constructor(sequenceModel: Model<any>);
    getSequence(): Promise<any>;
}
