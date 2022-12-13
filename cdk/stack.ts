//stack.ts
import { Construct } from 'constructs';
import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { aws_route53 } from 'aws-cdk-lib';
import { aws_s3 } from 'aws-cdk-lib';
import { aws_certificatemanager } from 'aws-cdk-lib';
import { aws_cloudfront } from 'aws-cdk-lib';
import { aws_route53_targets } from 'aws-cdk-lib';
import { aws_s3_deployment } from 'aws-cdk-lib';

const WEB_APP_DOMAIN = "mtburls.com"
const REGION = "us-east-1"
const ACCOUNT = "605805218903"

export class MtbUrlsReactStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      env: {
        account: ACCOUNT,
        region: REGION
      }
    });

    //get hosted zone
    const zone = aws_route53.HostedZone.fromLookup(this, "Zone", {
      domainName: "mtburls.com",
    });
    console.log(zone.zoneName);

    //Create S3 Bucket for our website
    const siteBucket = new aws_s3.Bucket(this, "SiteBucket", {
      bucketName: WEB_APP_DOMAIN,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const siteCertificate = new aws_certificatemanager.DnsValidatedCertificate(this, "SiteCertificate", {
      domainName: WEB_APP_DOMAIN, 
      hostedZone: zone, 
      region: REGION
    });

    const siteDistribution = new aws_cloudfront.CloudFrontWebDistribution(this, "SiteDistribution", {
      originConfigs: [{
        customOriginSource: {
          domainName: siteBucket.bucketWebsiteDomainName,
          originProtocolPolicy: aws_cloudfront.OriginProtocolPolicy.HTTP_ONLY
        },
        behaviors: [{
          isDefaultBehavior: true
        }]
      }], 
      viewerCertificate: aws_cloudfront.ViewerCertificate.fromAcmCertificate(
        siteCertificate,
        {
          aliases: [WEB_APP_DOMAIN]
        }
      )
    });

    new aws_route53.ARecord(this, "SiteRecord", {
      recordName: WEB_APP_DOMAIN, 
      target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.CloudFrontTarget(siteDistribution)), 
      zone
    });

    new aws_s3_deployment.BucketDeployment(this, "Deployment", {
      sources: [aws_s3_deployment.Source.asset("./build")],
      destinationBucket: siteBucket, 
      distribution: siteDistribution,
      distributionPaths: ["/*"]
    });

  }

}

// Resource handler returned message: "Invalid request provided: AWS::CloudFront::Distribution: The certificate that is attached to your distribution d
// oesn't cover the alternate domain name (CNAME) that you're trying to add. For more details, see: https://docs.aws.amazon.com/AmazonCloudFront/latest
// /DeveloperGuide/CNAMEs.html#alternate-domain-names-requirements (Service: CloudFront, Status Code: 400, Request ID: 18d75a67-12a0-4760-96be-fd1b0c6b
// 276c)" (RequestToken: 15f1a12b-834d-761c-cdd8-234845f96bb0, HandlerErrorCode: InvalidRequest)