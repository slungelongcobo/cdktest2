import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('slungelongcobo/cdktest2', 'main', {connectionArn: 'arn:aws:codestar-connections:eu-west-1:065381300161:connection/615f1d1c-1af1-49ce-9bd7-81c62b51cec3'}),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}