import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as CodeBuild from "aws-cdk-lib/aws-codebuild";
//import * as CodePipeline from "aws-cdk-lib/aws-codepipeline";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('slungelongcobo/cdktest2', 'main', {connectionArn: 'arn:aws:codestar-connections:eu-west-1:065381300161:connection/615f1d1c-1af1-49ce-9bd7-81c62b51cec3'}),
        commands: ['npm install -g aws-cdk', 'npm install && npm run build && npm test', 'npm run synth'],
        primaryOutputDirectory: 'cdk.out/cdk.out'
      })
    });
    
      pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "065381300161", region: "eu-west-1" }
    }));
  }
}