#!/bin/sh
echo 'Configure AWS credentials or confirm defaults'
aws configure
echo 'NPM install in progress...';
npm install
echo 'NPM run build in progress...';
npm run build
echo 'Bootstrap CDK in progress...';
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)
cdk bootstrap aws://$ACCOUNT/$REGION
echo 'CDK deploy in progress...';
cdk deploy