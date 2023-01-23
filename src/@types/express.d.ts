/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
	export interface Request {
		customer: {
			id: stirng;
			cpf: string;
			name: string;
			statement: {
				description: string;
				amount: number;
				type: 'credit' | 'debit';
				created_at: Date;
			}[];
		};
	}
}
