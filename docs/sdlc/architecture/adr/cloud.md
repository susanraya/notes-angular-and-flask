<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-05

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Approved stack; ap-south-1 (Mumbai) keeps the app and notes in India (US-011) and comfortably handles the modest concurrent audience with S3/CloudFront, Fargate and RDS.

## Consequences

Managed services add a little ops overhead versus a single VM, but provide encryption, log retention and residency guarantees with minimal effort.
<!-- sdlc:auto:end adr -->