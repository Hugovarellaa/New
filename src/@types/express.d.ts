/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
	export interface Request {
		customer: {
			id: stirng;
			cpf: string;
			name: string;
			statement: [];
		};
	}
}
