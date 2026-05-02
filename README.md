# AvinashMarket E-Commerce 🛒

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-blue?style=flat-square)
![Cloud](https://img.shields.io/badge/Cloud-AWS%20%7C%20Terraform-orange?style=flat-square)

AvinashMarket is a responsive e-commerce website built with HTML, CSS, and JavaScript. It includes product pages, shopping cart functionality, checkout pages, and AWS deployment using Terraform.

---

## Features

* Responsive design for desktop and mobile
* Product listing and category pages
* Shopping cart with quantity updates
* Checkout pages
* Smooth UI interactions
* Docker support
* AWS EC2 deployment with Terraform

---

## Tech Stack

* HTML5
* CSS3
* JavaScript
* Docker
* Terraform
* AWS EC2
* Nginx

---

## Project Structure

```text
Avinash-E-commerce/
├── app/
│   ├── css/
│   ├── images/
│   ├── index.html
│   ├── Products.html
│   ├── cart.html
│   └── ...
├── terraform/
│   ├── main.tf
│   ├── provider.tf
│   ├── variables.tf
│   └── output.tf
├── Dockerfile
├── script.js
└── userdata.sh
```

---

## Run Locally

```bash
git clone https://github.com/Collins-Munufie/Avinash-E-commerce.git
cd Avinash-E-commerce
```

Open `app/index.html` in your browser.

---

## Run with Docker

```bash
docker build -t avinashmarket .
docker run -p 3000:3000 avinashmarket
```

---

## Deploy to AWS

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

This provisions an EC2 instance and runs the setup script automatically.

---

## Author

Collins Munufie
