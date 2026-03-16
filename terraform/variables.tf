variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-2"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "my-key-pair"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "ecommerce-app"
}

variable "allowed_ssh_ip" {
  description = "IP allowed to SSH into EC2"
  type        = string
  default     = "0.0.0.0/0"
}