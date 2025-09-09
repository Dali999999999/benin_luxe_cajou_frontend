import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'http://69.62.106.46';

async function handler(request, { params }) {
    // The slug can be a single value (e.g., 'orders') or undefined for the base '/api/profile/' route.
    const slug = params.slug ? params.slug.join('/') : '';
    const url = `${API_BASE_URL}/api/profile/${slug}`;

    const token = request.headers.get('Authorization');

    if (!token) {
        return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
    }

    try {
        let response;
        if (request.method === 'GET') {
            response = await axios.get(url, {
                headers: { 'Authorization': token }
            });
        } else if (request.method === 'PUT') {
            const payload = await request.json();
            response = await axios.put(url, payload, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token 
                }
            });
        }

        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'An unexpected error occurred' };
        return NextResponse.json(data, { status });
    }
}

export { handler as GET, handler as PUT };
