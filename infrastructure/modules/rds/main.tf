resource "aws_db_subnet_group" "main" {
  name       = "voting-app-db-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "voting-app-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier           = "voting-app-db"
  engine              = "postgres"
  engine_version      = "14"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  storage_type        = "gp2"
  
  db_name             = "voting_app"
  username            = "postgres"
  password            = var.db_password
  
  vpc_security_group_ids = [var.security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"
  
  multi_az               = false
  skip_final_snapshot    = true
  
  tags = {
    Name = "voting-app-db"
  }
}

# Variables
variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "security_group_id" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

# Outputs
output "endpoint" {
  value = aws_db_instance.main.endpoint
} 