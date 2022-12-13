#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { MtbUrlsReactStack } from './stack';
const app = new App();
new MtbUrlsReactStack(app, 'MtbUrlsReactStack');