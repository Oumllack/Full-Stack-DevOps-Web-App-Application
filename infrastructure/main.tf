terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-west-3"  # Paris
}

# VPC
module "vpc" {
  source = "./modules/vpc"
}

# RDS
module "rds" {
  source = "./modules/rds"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  security_group_id = module.vpc.rds_security_group_id
}

# ECS
module "ecs" {
  source = "./modules/ecs"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  security_group_id = module.vpc.ecs_security_group_id
  rds_endpoint = module.rds.endpoint
}

# S3 & CloudFront
module "frontend" {
  source = "./modules/frontend"
} 