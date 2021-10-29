import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import * as path from 'path';

export class CdkNginxStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "HelloWorldVpc", {
      maxAzs: 3
    });

    const cluster = new ecs.Cluster(this, "HelloWorldCluster", {
      vpc: vpc
    });

    //Create DockerImageAsset
    const image = new DockerImageAsset(this, 'nginx-hello-world', {
      directory: path.join(__dirname, 'docker'),
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "HelloWorldFargateService", {
      cluster: cluster,
      cpu: 256,
      desiredCount: 2,
      taskImageOptions: { 
        image: ecs.ContainerImage.fromDockerImageAsset(image)
        /* ecs.ContainerImage.fromRegistry("sbianchini/nginx-hello-world")*/ 
      },
      memoryLimitMiB: 512,
      publicLoadBalancer: true
    });

  }
}
