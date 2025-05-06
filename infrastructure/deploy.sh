#!/bin/bash

# Initialiser Terraform
terraform init

# Vérifier la configuration
terraform plan

# Appliquer la configuration
terraform apply -auto-approve

# Attendre que l'infrastructure soit prête
echo "Attente de la disponibilité de l'infrastructure..."
sleep 30

# Construire et pousser l'image Docker du backend
cd ../backend
docker build -t voting-app-backend .
aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin $(terraform output -raw ecr_repository_url)
docker tag voting-app-backend:latest $(terraform output -raw ecr_repository_url):latest
docker push $(terraform output -raw ecr_repository_url):latest

# Construire et déployer le frontend
cd ../frontend
npm run build
aws s3 sync dist/ s3://$(terraform output -raw s3_bucket_name) --delete
aws cloudfront create-invalidation --distribution-id $(terraform output -raw cloudfront_distribution_id) --paths "/*"

echo "Déploiement terminé !" 