import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <header>
                <h1>Not found</h1>
            </header>
            <section>
                <Link to='/'>Back to Home page</Link>
            </section>
        </>
    );
}
