import Login from '../components/login';

import React from 'react';
import Link from 'next/link';

export default class extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <ul>
                    <li><Link href='/register'><a>Register</a></Link></li>
                </ul>
            </div>
        );
    }
}
