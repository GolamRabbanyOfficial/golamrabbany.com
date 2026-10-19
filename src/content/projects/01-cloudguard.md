---
title: "CloudGuard"
href: "/projects/cloudguard.webp"
dates: "In Progress"
image: "/projects/cloudguard.webp"
active: true
technologies:
  - "AWS Organizations"
  - "Security Hub"
  - "GuardDuty"
  - "AWS Config"
  - "EventBridge"
  - "Step Functions"
  - "Lambda"
  - "Terraform"
  - "GitHub Actions"
  - "Python"
links: []
---

Automated security remediation across multiple AWS accounts. Security Hub collects findings from Config and GuardDuty, and a Step Functions workflow fixes safe issues on its own, like public S3 buckets, open SSH/RDP and stale access keys. Risky fixes wait for one-click approval in Slack.
