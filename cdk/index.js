#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const stack_1 = require("./stack");
const app = new aws_cdk_lib_1.App();
new stack_1.MtbUrlsReactStack(app, 'MtbUrlsReactStack');
