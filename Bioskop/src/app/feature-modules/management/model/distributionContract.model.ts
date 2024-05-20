import { DistributionCompany } from "./distributionCompany.model";

export interface DistributionContract {
    id: number;
    company: DistributionCompany;
    movieId: number;
    managerId: number;
    startDate: Date;
    endDate: Date;
    model: 'Bidding' | 'Percentage';
    agreedSum?: number;
    weeklyCosts?: number;
    percentage?: number;
  }
  