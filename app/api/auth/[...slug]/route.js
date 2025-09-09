import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'http://69.62.106.46';

async function handler(request, { params }) {
    const slug = params.slug.join('/');
    const url = `${API_BASE_URL}/auth/${slug}`;

    let payload;
    try {
        payload = await request.json();
    } catch (error) {
        payload = null;
    }

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'An unexpected error occurred' };
        return NextResponse.json(data, { status });
    }
}

export { handler as POST };
