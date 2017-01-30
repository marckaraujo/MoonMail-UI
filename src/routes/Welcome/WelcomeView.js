import React from 'react';
import { LoginForm } from 'react-stormpath';
import DocumentTitle from 'react-document-title';

export default class WelcomeView extends React.Component {
    render() {
        return (
            <DocumentTitle title={`Login`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Login</h3>
                            <hr />
                        </div>
                    </div>
                    <LoginForm />
                </div>
            </DocumentTitle>
        );
    }
}