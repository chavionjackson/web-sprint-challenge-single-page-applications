import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Link to='/Form'>
                <button onClick={(event) => event.preventDefault}>
                    Hungry?
                </button>
            </Link>
        </div>
    )
}

export default Home;