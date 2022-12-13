"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtbUrlsReactStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const aws_cdk_lib_3 = require("aws-cdk-lib");
const aws_cdk_lib_4 = require("aws-cdk-lib");
const aws_cdk_lib_5 = require("aws-cdk-lib");
const aws_cdk_lib_6 = require("aws-cdk-lib");
const aws_cdk_lib_7 = require("aws-cdk-lib");
const WEB_APP_DOMAIN = "mtburls.com";
const REGION = "us-east-1";
const ACCOUNT = "605805218903";
class MtbUrlsReactStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id) {
        super(scope, id, {
            env: {
                account: ACCOUNT,
                region: REGION
            }
        });
        //get hosted zone
        const zone = aws_cdk_lib_2.aws_route53.HostedZone.fromLookup(this, "Zone", {
            domainName: "mtburls.com",
        });
        console.log(zone.zoneName);
        //Create S3 Bucket for our website
        const siteBucket = new aws_cdk_lib_3.aws_s3.Bucket(this, "SiteBucket", {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: "index.html",
            publicReadAccess: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
        const siteCertificate = new aws_cdk_lib_4.aws_certificatemanager.DnsValidatedCertificate(this, "SiteCertificate", {
            domainName: WEB_APP_DOMAIN,
            hostedZone: zone,
            region: REGION
        });
        const siteDistribution = new aws_cdk_lib_5.aws_cloudfront.CloudFrontWebDistribution(this, "SiteDistribution", {
            originConfigs: [{
                    customOriginSource: {
                        domainName: siteBucket.bucketWebsiteDomainName,
                        originProtocolPolicy: aws_cdk_lib_5.aws_cloudfront.OriginProtocolPolicy.HTTP_ONLY
                    },
                    behaviors: [{
                            isDefaultBehavior: true
                        }]
                }],
            viewerCertificate: aws_cdk_lib_5.aws_cloudfront.ViewerCertificate.fromAcmCertificate(siteCertificate, {
                aliases: [WEB_APP_DOMAIN]
                // aliases: [WEB_APP_DOMAIN, `www.${WEB_APP_DOMAIN}`]
            })
        });
        new aws_cdk_lib_2.aws_route53.ARecord(this, "SiteRecord", {
            recordName: WEB_APP_DOMAIN,
            target: aws_cdk_lib_2.aws_route53.RecordTarget.fromAlias(new aws_cdk_lib_6.aws_route53_targets.CloudFrontTarget(siteDistribution)),
            zone
        });
        new aws_cdk_lib_7.aws_s3_deployment.BucketDeployment(this, "Deployment", {
            sources: [aws_cdk_lib_7.aws_s3_deployment.Source.asset("./build")],
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ["/*"]
        });
    }
}
exports.MtbUrlsReactStack = MtbUrlsReactStack;
// Resource handler returned message: "Invalid request provided: AWS::CloudFront::Distribution: The certificate that is attached to your distribution d
// oesn't cover the alternate domain name (CNAME) that you're trying to add. For more details, see: https://docs.aws.amazon.com/AmazonCloudFront/latest
// /DeveloperGuide/CNAMEs.html#alternate-domain-names-requirements (Service: CloudFront, Status Code: 400, Request ID: 18d75a67-12a0-4760-96be-fd1b0c6b
// 276c)" (RequestToken: 15f1a12b-834d-761c-cdd8-234845f96bb0, HandlerErrorCode: InvalidRequest)
