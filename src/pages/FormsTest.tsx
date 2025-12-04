import { Form } from "react-router-dom";

export async function action({ request }: { request: Request }) {
    switch (request.method) {
        case 'GET': {
            console.log('GET');
            return null;
        }
        case 'POST': {
            console.log('POST');
            return null;
        }
        case 'PUT': {
            console.log('PUT');
            return null;
        }
        case 'PATCH': {
            console.log('PATCH');
            return null;
        }
        case 'DELETE': {
            console.log('DELETE');
            return null;
        }
        default: {
            throw new Error('method not found');
        }
    }
}

export default function FormsTest() {
    return (
        <>
            <Form method="post">
                <button type="submit">post</button>
            </Form>
            <Form method="put">
                <button type="submit">put</button>
            </Form>
            <Form method="patch">
                <button type="submit">patch</button>
            </Form>
            <Form method="delete">
                <button type="submit">delete</button>
            </Form>
            <Form method="get" action="/products">
                <input placeholder="search products..." type="text" name="q" />
                <button type="submit">search</button>
            </Form>
        </>
    )
}
