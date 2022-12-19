import type { PageServerLoad } from './$types';
import { createMollieClient } from '@mollie/api-client';
import { MOLLIE_API_KEY } from '$env/static/private';

const mollieClient = createMollieClient({ apiKey: MOLLIE_API_KEY });

export const load: PageServerLoad = async () => {
	const payment = await mollieClient.payments.create({
		amount: {
			currency: 'EUR',
			value: '10.00'
		},
		description: 'My first API payment',
		redirectUrl: 'https://example.org/redirect',
		webhookUrl: 'https://example.org/webhook',
		metadata: {
			orderId: '12345'
		}
	});

	return {
		payment: {
			...payment
		}
	};
};
