import express from 'express';
import path from 'path';

const app = express();
const port = 3000;
const publicPath = path.resolve('public');
const stormpath = require('express-stormpath');
const morgan = require('morgan');
const ora = require('ora');

// We point to our static assets
app.use(express.static(publicPath));

app.use(morgan('combined'));

var spinner = ora({
    interval: 100
});

function failAndExit(err) {
    spinner.fail();
    console.error(err.stack);
    process.exit(1);
}

app.use(stormpath.init(app, {
    // Disable logging until startup, so that we can catch errors
    // and display them nicely.
    debug: 'none',
    web: {

        // The produces option disables the default HTML views, which
        // we want for our single-page react app.

        produces: ['application/json'],
        me: {
            expand: {
                customData: true
            }
        },
        register: {
            form: {
                fields: {
                    color: {
                        enabled: true,
                        label: 'Color',
                        placeholder: 'E.g. blue',
                        type: 'text'
                    }
                }
            }
        }
    }
}));

app.post('/me', stormpath.authenticationRequired, bodyParser.json(), function (req, res) {
    function writeError(message) {
        res.status(400);
        res.json({ message: message, status: 400 });
        res.end();
    }

    function saveAccount() {
        req.user.givenName = req.body.givenName;
        req.user.surname = req.body.surname;
        req.user.email = req.body.email;

        if ('color' in req.body.customData) {
            req.user.customData.color = req.body.customData.color;
        }

        req.user.save(function (err) {
            if (err) {
                return writeError(err.userMessage || err.message);
            }
            res.end();
        });
    }

    if (req.body.password) {
        var application = req.app.get('stormpathApplication');

        application.authenticateAccount({
            username: req.user.username,
            password: req.body.existingPassword
        }, function (err) {
            if (err) {
                return writeError('The existing password that you entered was incorrect.');
            }

            req.user.password = req.body.password;

            saveAccount();
        });
    } else {
        saveAccount();
    }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

spinner.text = 'Starting Dev Sever on port ' + port,
spinner.start();

app.on('error', failAndExit);
app.on('stormpath.error', failAndExit);

// And run the server
app.listen(port, function () {
    spinner.succeed();
    spinner.text = 'Initializing Stormpath';
    spinner.start();
    app.on('stormpath.ready', function () {
        spinner.succeed();
        console.log('Server running on port ' + port);
        // Now bring back error logging.
        app.get('stormpathLogger').transports.console.level = 'error';
    });
});
