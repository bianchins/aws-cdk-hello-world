# Hello World AWS CDK

This is a simple Hello World project to test the capabilities of AWS CDK.

## Requirements

- AWS CLI
- node.js and npm
- AWS CDK Toolkit (https://docs.aws.amazon.com/cdk/latest/guide/cli.html)

## How to run it

Simple execute 
```
./run.sh
```
The script will build a custom Docker image based on nginx, push it to ECR and deploy on ECS (Fargate) with a Load Balancer.

## How to configure AWS credentials
`run.sh` executes first of all `aws configure`, then uses the credentials to bootstrap the environment of CDK stack.

## Destroy the CDK stack
After the deploy, it's possible to destroy all the AWS CDK stack, to avoid unexpected AWS charges, with the command:
```
cdk destroy
```
