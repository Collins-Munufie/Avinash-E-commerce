output "public_ip" {
  value = aws_eip.ecommerce_eip.public_ip
}

output "public_dns" {
  value = aws_instance.ecommerce_server.public_dns
}