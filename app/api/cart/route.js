import { NextResponse } from 'next/server';

export async function POST(request) {
    let payload = {};
    try {
        payload = await request.json();
    } catch (error) {
        // Ignore if body is empty
    }

    const token = request.headers.get('Authorization');
    
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = token;
    }

    // fetch API requires the body to be a string or null.
    const bodyToSend = Object.keys(payload).length === 0 ? null : JSON.stringify(payload);

    try {
        const API_BASE_URL = process.env.API_URL_INTERNAL || 'http://127.0.0.1:5000';
        const apiResponse = await fetch(`${API_BASE_URL}/api/cart/`, {
            method: 'POST',
            headers: headers,
            body: bodyToSend,
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            // Forward the error response from the target API
            return NextResponse.json(data, { status: apiResponse.status });
        }

        return NextResponse.json(data, { status: apiResponse.status });

    } catch (error) {
        // Handle network errors or issues with the fetch itself
        return NextResponse.json({ message: 'An unexpected error occurred while proxying the request' }, { status: 500 });
    }
}