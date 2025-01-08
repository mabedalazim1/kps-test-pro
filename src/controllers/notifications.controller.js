const config = require("../../config/auth.config.js");
const webPush = require('web-push');
const dataModels = require('../models');
const push_subscription = dataModels.PushSubscription;

// Initialize web-push with your VAPID keys
const publicKey = 'BMWrj8mTDi3nHMybr30it-659v-TpT4Oz-0ctyR3dI3nmvhm9Irw81uBxu4q-BIIL6Opg5YDUaLn-HccMVdgtUc';
const privateKey = 'PYHQJLLp2_eyEbVoc6dTToAhWAhTqDjlYVJQhoEG5j0';
webPush.setVapidDetails('mailto:your@email.com', publicKey, privateKey);

// Store subscriptions
const subscribe = async (req, res, next) => {
    const { subscription } = req.body;
    if (!subscription || !subscription.endpoint) {
        // Not a valid subscription
        res.status(400).json({ message: 'Subscription must have an endpoint.' });
    } else {
        const data = await push_subscription.findAll({
            where: { endpoint: subscription.endpoint }
        })
        try {

            if (data.length != 0) {
                console.log("Endpoint Is On DataBase ..!")
                return res.status(401).send({ message: 'Endpoint Is On DataBase!', })
            }
        } catch (error) {
            res.status(500).json({ message: err })
            console.log("Error", err)
        }

        try {
            if (data.length === 0) {
                push_subscription.create({
                    endpoint: subscription.endpoint,
                    keys: subscription.keys,
                }).then(savedSubscription => {
                    console.log('Subscription saved successfully:', savedSubscription)
                })
                res.status(201).json({ message: 'Subscribed successfully!' });
            }

        } catch (error) {
            if (error.code === 'INVALID_SUBSCRIPTION') {
                res.status(400).json({ message: 'Invalid subscription object' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}

// Update subscribe
const update_subscribe = async (req, res, next) => {
    const { subscription } = req.body;
    if (!subscription || !subscription.old_endpoint) {
        res.status(400).json({ message: 'Subscription must have an Old Endpoint.' });
    } else {
        const data = await push_subscription.findAll({
            where: { endpoint: subscription.old_endpoint }
        });

        if (data.length != 0) {
            // Update EndPoint
            await data.update({
                endpoint: subscription.new_endpoint,
                keys: subscription.new_keys,
            }).catch(error => {
                console.log(error)
            });
            await data.save();
        }
    }
}

// Send push notifications
const sendNotification = async (req, res, next) => {
    const { notification } = req.body;
    try {
        const subscriptions = await push_subscription.findAll()
        //console.log('subscriptions', subscriptions)
        if (subscriptions.length === 0) {
            // Ther Is No subscription
            console.log("Ther Is No subscription")
            res.status(400).json({ message: 'There Is No Subscription, Register Your sw Or check Token.' });
        } else {
            subscriptions.map(subscription => {
                const subscripData = { endpoint: subscription.endpoint, keys: JSON.parse(subscription.keys) }
                try {
                    webPush.sendNotification(subscripData, JSON.stringify(notification)).catch(err => {
                        if (err.endpoint) {
                            push_subscription.destroy({
                                where: { endpoint: err.endpoint }
                            })
                        }
                    })

                } catch (error) {
                    console.log('error', error)
                    return

                }
            })
            res.status(201).json({ message: 'Notification sent successfully!' });
        }

    } catch (error) {
        // Handle specific errors (optional)
        if (error.code === 'INVALID_DEVICE_TOKEN') {
            console.log("Invalid device token")
            res.status(400).json({ message: 'Invalid device token' });
        } else {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


module.exports = {
    subscribe,
    update_subscribe,
    sendNotification,
}