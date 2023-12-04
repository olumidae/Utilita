
# Serverless Framework Node Scheduled Taks on AWS

This project demonstrates how to develop and deploy a simple cron-like service running on AWS Lambda using the traditional Serverless Framework.
This lambda function will be invoked every 1 hour to retrieve information sent by smart meters .
When defining `schedule` events, we need to use `rate` or `cron` expression syntax.


In below example, we use `rate` syntax to define `schedule` event that will trigger our `rateHandler` function every minute

```yml
functions:
  rateHandler:
    handler: handler.run
    events:
      - schedule: rate(1 minute)
```


## Usage

### Deployment

This example is made to work with the Serverless Framework dashboard, which includes advanced features such as CI/CD, monitoring, metrics, etc.

In order to deploy with dashboard, you need to first login with:

```
serverless login
```

and then perform deployment with:

```
serverless deploy
```
```


